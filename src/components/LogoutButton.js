import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0Client } from '@auth0/auth0-spa-js';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const authenticateUser = async () => {
    const a0 = new Auth0Client({
        domain: domain,
        client_id: clientId
    });
    await a0.loginWithPopup({
        max_age: 0,
        scope: "openid",
    });
    return await a0.getIdTokenClaims();
};

const LogoutButton = () => {
    const { logout, user, isAuthenticated, getAccessTokenSilently, loginWithPopup } = useAuth0();

    const linkAccount = async () => {
        const accessToken = await getAccessTokenSilently({ 
            audience: `https://${domain}/api/v2/`,
            scope: 'read:current_user update:current_user_identities update:users' 
        });
        
        const {
            __raw: targetUserIdToken,
            email_verified,
            email,
        } = await authenticateUser();

        if (!email_verified) {
            throw new Error(
                `Account linking is only allowed to a verified account. Please verify your email ${email}.`
            );
        }

        await fetch(`https://${domain}/api/v2/users/${user.sub}/identities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                link_with: targetUserIdToken,
            }),
        });
    };
    console.log(user)


    return (
        isAuthenticated && (
            <div className="container">
                <h1>Hello {user.given_name} from {user["https://example.com/country"]}</h1>
                <img src={user.picture} />

                <br/>
                <button className="button" onClick={() => logout()}>
                    Sign Out
                </button>
                <div>
                    <br /><br /><br />
                   <button onClick={() => linkAccount()}>
                    Link Account
                  </button>
                </div>
                <div className="linking-message"></div>
          </div>
        )
    )
}

export default LogoutButton

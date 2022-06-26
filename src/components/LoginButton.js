import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';

const LoginButton = () => {
    const { loginWithRedirect, error, isAuthenticated,logout } = useAuth0();

    if (!isAuthenticated && !error) {
        return (<button onClick={() => loginWithRedirect()}>
            Sign In
        </button>)
    }
    else if (error)
        return (<div>
            <h1>{error.name}:{error.error}</h1>
            <h1>{error.message}</h1>
            <button onClick={() => logout()}>
                Sign Out
            </button>
        </div>
    );
 }

export default LoginButton

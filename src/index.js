import React from 'react';
import ReactDOM from 'react-dom/client';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  redirectUri={window.location.origin}
      audience={`https://${domain}/api/v2/`}
      scope="read:current_user update:current_user_identities update:users"
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
);

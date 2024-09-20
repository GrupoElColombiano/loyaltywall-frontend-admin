// ReactJS & ReduxJS
import { AuthProvider as KeyCloackProvider } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { WebStorageStateStore } from "oidc-client-ts";

// App
import App from "./App.tsx";

// Context
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/language-context/language.context.tsx";


// Redux
import { store } from "./main/adapters/secondary/local/store/store.ts";

// i18n
import "./i18n/i18n.ts";

// Fonts
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Styles
import "./index.css";

const oidcConfig = {
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    code_challenge_method: "S256",
    post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI,
    redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
    response_type: "code",
    scope: "openid profile",
    stateStore: new WebStorageStateStore({ store: window.localStorage }),
    userStore: new WebStorageStateStore({ store: window.localStorage }),
};

const root = createRoot(document.getElementById("root") as HTMLElement);

console.log(" main.tsx VITE_OIDC_AUTHORITY::: ", import.meta.env.VITE_OIDC_AUTHORITY);
console.log(" main.tsx VITE_OIDC_CLIENT_ID::: ", import.meta.env.VITE_OIDC_CLIENT_ID);
console.log(" main.tsx VITE_OIDC_POST_LOGOUT_REDIRECT_URI::: ", import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI);
console.log(" main.tsx VITE_OIDC_REDIRECT_URI::: ", import.meta.env.VITE_OIDC_REDIRECT_URI);
console.log(" main.tsx VITE_BASE_URL::: ", import.meta.env.VITE_BASE_URL);

root.render(
    <BrowserRouter>
        <KeyCloackProvider {...oidcConfig}>
            <AuthProvider>
                <LanguageProvider>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </LanguageProvider>
            </AuthProvider>
        </KeyCloackProvider>
    </BrowserRouter>
);
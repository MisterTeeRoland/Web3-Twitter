import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";

ReactDOM.render(
    <React.StrictMode>
        <MoralisProvider
            appId="MfUsOcYptEmhPtxpu7UMT4hRn2ykiWHRJColuJaJ"
            serverUrl="https://g9an6vlg01rm.usemoralis.com:2053/server"
        >
            <NotificationProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </NotificationProvider>
        </MoralisProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

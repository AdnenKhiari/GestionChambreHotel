import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Test from './Pages/Test';
import reportWebVitals from './reportWebVitals';
import "./Styles/main.scss"
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools'

import {QueryClientProvider,QueryClient} from "react-query"
import { AnimatePresence } from 'framer-motion';
const client = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <React.StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter >
      <AnimatePresence exitBeforeEnter initial={true}>
        <App />
      </AnimatePresence>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

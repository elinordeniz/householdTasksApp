import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {store} from './app/store';
import { Provider } from 'react-redux';
import {ThemeProvider} from '@mui/material/styles'
import { theme} from "./config/theme/theme";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV==="production") disableReactDevTools()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <ThemeProvider 
    theme={theme}
    >
    <Provider store={store}>
<BrowserRouter>
  <Routes>
    
    <Route path='/*' element={<App />} />
  </Routes>
</BrowserRouter>  
</Provider>
</ThemeProvider>
</I18nextProvider>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

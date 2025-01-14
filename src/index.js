function suppressPrimeReactDropdownError(eventOrReason) {
  const msg =
    (eventOrReason && eventOrReason.message) ||
    (typeof eventOrReason === 'string' ? eventOrReason : '') ||
    (eventOrReason && eventOrReason.reason && eventOrReason.reason.message) ||
    '';
  if (
    msg.includes("Cannot read properties of undefined (reading 'hideOverlaysOnDocumentScrolling')")
  ) {
    if (eventOrReason.preventDefault) eventOrReason.preventDefault();
    return false;
  }
}
window.addEventListener('error', suppressPrimeReactDropdownError);
window.addEventListener('unhandledrejection', suppressPrimeReactDropdownError);
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
const root = createRoot(document.getElementById('root'));
root.render(<App />);

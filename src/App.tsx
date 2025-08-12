import React from "react";
import "./App.css";
import AppRouter from "./app/routes/AppRouter";
import { Provider } from "react-redux";
import store from "./app/store";
import "./app/utils/debug-helper"; // Import debug helper
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;

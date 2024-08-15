import React from "react";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux"
import store from "../store/store.js"
import Navbar from "./components/Navbar";
import GsapTransition from "./components/GsapTransition";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <main>
        <GsapTransition />
      </main>
    </BrowserRouter>
    </Provider>
  );
}

export default App;

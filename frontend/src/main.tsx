import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './Routing';
import './Styles/main.css'
import 'semantic-ui-css/semantic.min.css'

// Store
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
// import { getFeed } from './Reducers/Slices/Posts';

import rootReducer from './Reducers'


const store = configureStore({
  reducer: rootReducer
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  </React.StrictMode>,
)





import React from 'react';
import { Provider } from 'react-redux'

import store from './store'

// navigation
import MainNavigator from './navigation'

import { init } from './db';


init()
  .then(()=>console.log("Database initialized"))
  .catch((err)=>{
    console.log("Database fail connect")
    console.log(err.message)
  })

export default function App() {
  return (<Provider store={store}><MainNavigator /></Provider>);
}

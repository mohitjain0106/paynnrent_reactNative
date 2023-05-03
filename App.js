
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootNavigation from './component/navigation/RootNavigation';
import RootReducer from './component/storage/RootReducer';

var store=createStore(RootReducer)
function App() {
  return (
    <Provider store={store}>
    <RootNavigation/>
    </Provider>
  );
}
export default App;

import React from 'react';
import { Provider } from 'react-redux';

import Header from './components/Header';
import ImageGrid from './components/ImageGrid';

import configureStore from './store';
const store = configureStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <Header />
          <ImageGrid />
        </div>
      </Provider>
    </>
  );
}

export default App;

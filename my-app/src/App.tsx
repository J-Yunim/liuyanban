import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import store from './reducers';

function App() {
  return (
    <div className="app">
      <CommentInput />
      <Provider store={store}>
        <CommentList />
      </Provider>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const defaultData = [
  { id: "item1", value: "my item 1"},
  { id: "item2", value: "my item 2"},
  { id: "item3", value: "my item 3"},
  { id: "item4", value: "my item 4"},
  { id: "item5", value: "my item 5"}
];

ReactDOM.render(
  <React.StrictMode>
    <App items={defaultData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.js';

jest.mock('./app/App');
jest.mock('react-dom', ()=> ({render: jest.fn()}));

describe('Application', () => {
  it('bootstraps without crashing', () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("./index.js");
    expect(ReactDOM.render).toHaveBeenCalledWith((
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ), div);
  });
});

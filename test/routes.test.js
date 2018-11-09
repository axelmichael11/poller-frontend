// require("babel-register")({
//   // This will override `node_modules` ignoring - you can alternatively pass
//   // an array of strings to be explicitly matched or a regex / glob
//   ignore: false
// });
import test from 'mocha-loader'

import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render, configure } from 'enzyme';
import App from '../src/component/app';

import { Provider } from 'react-redux'

import LandingContainer from '../src/component/landing-container'
import LoginPage from '../src/component/login'


import storeCreate from '../src/lib/store-create'
import { persistStore } from 'redux-persist'

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });



import { Route, BrowserRouter, Switch, Router } from 'react-router-dom'
import { login } from '../src/action/auth-actions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MaterialStyles from '../src/style/material-ui-style'


const store = storeCreate()
persistStore(store)
const theme = createMuiTheme(MaterialStyles.pollerTheme)


const wrapper = mount(
  <Provider store={store}>
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
    <App initialEntries={[ '/random' ]}/>        
    </BrowserRouter>
  </MuiThemeProvider>
</Provider>
);


describe('Testing <App /> routes', () => {
  it('invalid path should redirect login page', () => {
    expect(wrapper.find(LandingContainer)).to.have.length(0);
    expect(wrapper.find(LoginPage)).to.have.length(1);
    expect(wrapper.find('p')).to.have.length(1);
    console.log(wrapper.find(LoginPage).prop('login'))
    expect(typeof wrapper.find(LoginPage).prop('login')).to.equal('function');
  });

  it.only('testing for methods of the app component', () => {
    console.log('AUTHORIZATION',wrapper.instance())
    expect(wrapper.instance().handleAuthentication()).toExist();
  });

});




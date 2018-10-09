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


//Buttons...
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'


import NavigateGettingStartedButton  from '../src/component/getting-started-button/index'

import GettingStartedPage from '../src/component/getting-started/horizontal'
import { ImageTimer } from 'material-ui';
//SETUP
chai.use(chaiEnzyme());



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


describe('Testing <LoginPage />', () => {
  it('should be two buttons....', () => {
    let buttons = wrapper.find('Button');
    console.log(buttons)
    expect(wrapper.find('Button')).to.have.length(2);

  });

  it('should have a title', () => {
    expect(wrapper.find('p')).to.have.length(1);
    expect(wrapper.find('p')).to.contain.text('Poller')


  });

  it('should click on "what is this?" button', () => {
    let navigateToGettingStarted =  wrapper.find(NavigateGettingStartedButton).find('Button');
    expect(navigateToGettingStarted).to.have.length(1)
    navigateToGettingStarted.simulate('click');
    expect(wrapper.find(GettingStartedPage)).to.have.length(1);
    console.log('STATE', wrapper.instance())
    // let gettingStartedPage = wrapper.find(GettingStartedPage);
    // console.log('GETTING STARTED PAGE',wrapper.dive().instance());
  });
  it('testing the individual getting started page... checking for methods, no props', () => {
    console.log('GETTING STARTED METHODS', wrapper.find(GettingStartedPage));
    //expect(wrapper.find(GettingStartedPage)).to.have.length(1);
    // let gettingStartedPage = wrapper.find(GettingStartedPage);
    // console.log('GETTING STARTED PAGE',wrapper.dive().instance());
  });

});




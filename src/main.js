import React from 'react'
import ReactDom from 'react-dom'
import App from './component/app'
import { Provider } from 'react-redux'
import storeCreate from './lib/store-create'
import { persistStore } from 'redux-persist'
import {profileFetch} from './action/profile-actions.js'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MaterialStyles from './style/material-ui-style'
import { Route, BrowserRouter, Switch, Router } from 'react-router-dom'

const theme = createMuiTheme(MaterialStyles.pollerTheme)

const store = storeCreate()
persistStore(store)

class Main extends React.Component {
  componentWillUpdate() {
    persistStore(store)
  }

  render() {
    return (
      <div>
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </Provider>
      </MuiThemeProvider>
      </div>
    )
  }
}


ReactDom.render(<Main/>, document.getElementById('root'))
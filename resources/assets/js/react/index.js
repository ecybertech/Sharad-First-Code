import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk'; 
import './index.css';
import App from './App';

import {lightBlack,deepPurple500,deepPurple50 } from 'material-ui/styles/colors';
//import darkbaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import auth from './store/reducers/auth';
import sites from './store/reducers/sites';
import wrappers from './store/reducers/wrappers';
import clientwrappers from './store/reducers/clientwrappers';
import productimport from './store/reducers/productimport';
import categories from './store/reducers/categories';
injectTapEventPlugin()

// Styles

const muitheme=getMuiTheme({
  palette: {
    textColor: lightBlack ,
    primary1Color: deepPurple500,
    primary2Color: deepPurple50,
  },
  appBar: {
    height: 55,
   borderRadius: 'none',
  },
});
const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
      auth : auth,
      sites:sites,
      wrapper:wrappers,
      clientwrappers:clientwrappers,
      productimport:productimport,
      categories:categories

    }); 
const store = createStore(
  rootReducer,
      composeEnhancers(
            applyMiddleware(thunk)
      ));

     
const app =  (
  <Provider store={store}>
  <MuiThemeProvider muiTheme={muitheme}>
    
      <BrowserRouter basename="/"> 
        <App />
      </BrowserRouter>
  
  </MuiThemeProvider>
  </Provider>
);
if (document.getElementById('root')) {
  ReactDOM.render(app, document.getElementById('root'));
}



registerServiceWorker();

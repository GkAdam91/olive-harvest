import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//routing
import { BrowserRouter } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

//Reducers
import authReducer from './store/reducers/auth';
import fieldsReducer from './store/reducers/fields';
import harvestsReducer from './store/reducers/harvests';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    fields: fieldsReducer,
    harvests: harvestsReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store= {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

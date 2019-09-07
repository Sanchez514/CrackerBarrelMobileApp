//jshint esversion:6
/* jshint ignore: start */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'
import reducers from './src/reducers/Index';
import Router from './src/Router';



export default class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyBDxlxfEcbNC18gS2vpGOPeABBvQs6RN08',
            authDomain: 'manager-be782.firebaseapp.com',
            databaseURL: 'https://manager-be782.firebaseio.com',
            projectId: 'manager-be782',
            storageBucket: 'manager-be782.appspot.com',
            messagingSenderId: '825393005963'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                    <Router />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('App', () => App);

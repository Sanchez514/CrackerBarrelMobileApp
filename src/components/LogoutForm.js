//jshint esversion : 6

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import {  CardSection, Button } from './common';

class LogoutForm extends Component {
    onButtonPress() {
        this.props.logoutUser();
    }

    render() {
        return (
            <View>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Logout
                    </Button>
                </CardSection>
            </View>
        )
    }
}

export default connect(null, { logoutUser} )(LogoutForm);
//jshint esversion:6
/* jshint ignore: start */

import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Spinner, CardSection } from '../components/common';



class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const {email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    onButtonPress2() {
        const {email, password } = this.props;
        this.props.loginUser({ email, password });
    }
    renderError() {
        if(this.props.error) {
            return(
                <View style={{ backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    // when logged in successfully loading spinner will appear, if not LoginForm will reappear
    renderButton() {
        if(this.props.loading) {
            return <Spinner size="large" />
        }
        return(
            <Button color='#f9a812' onPress={this.onButtonPress.bind(this)} title="Manager Login">
                    Login
                </Button>
        );
    }

    renderButton2() {
        if(this.props.loading) {
            return <Spinner size="large" />
        }
        return(
            <Button color='#f9a812' onPress={this.onButtonPress2.bind(this)} title="Employee Login">
                    Employee Login
                </Button>
        );
    }


    render() {
        let pic = {
            uri: 'https://crackerbarrel.com/-/media/CrackerBarrel/About/Media-Kit/Logos/CBLogoRGB_248x248_low.jpg?h=248&w=248&la=en&hash=7DF75B380EC033D1A0283333AADCBE71B5414A97'
        };

        return (
            <KeyboardAvoidingView style={styles.viewContainer} behavior="padding" enabled>
                <View style={styles.viewContainer}>
                        <Image source={pic} style={{width: 250, height: 250 }} />
                    <View>
                        <Text style={{ color: '#551505', marginBottom: 5}}>Please enter Email and Password in the fields below.</Text>
                    </View>

                    <View style={styles.textInputStyle}>
                        <TextInput
                        label="Email:"
                        placeholder="user@gmail.com"
                        placeholderTextColor='#f9a812'
                        color='#f9a812'
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                        />
                    </View>

                    <View style={styles.textInputStyle}>
                        <TextInput
                        secureTextEntry
                        label="Password:"
                        placeholder="password"
                        placeholderTextColor='#f9a812'
                        color= '#f9a812'
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                        />
                    </View>

                    <View>
                        {this.renderError()}
                    </View>

                    <View style={styles.buttonStyle}>
                        {this.renderButton()}
                    </View>
                    <View style={styles.buttonStyle}>
                        {this.renderButton2()}
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    viewContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        paddingTop: 10,
        paddingBottom: 10
    },
    textInputStyle: {
        height: "5%",
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#551505',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f9a812',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#551505',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f9a812',
        color: '#f9a812',
        marginLeft: 5,
        marginRight: 5,
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    };
};


export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);

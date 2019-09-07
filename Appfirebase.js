import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, Text, View, TextInput, Button ,AppRegistry, Image, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';
import {Input} from './components/common'

class LogInScreen extends React.Component {
  state = {email: '', password: '', error: ''};

  onButtonPress(){
    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(() => {
              this.setState({error: 'Authentication Failed.'});
            });
      });
}
  componentWillMount(){
    const config = {
      apiKey: 'AIzaSyD55Mvdg8nLE-LbOietTytFoLYu0QYP_NY',
      authDomain: 'employees-6aa65.firebaseapp.com',
      databaseURL: 'https://employees-6aa65.firebaseio.com',
      projectId: 'employees-6aa65',
      storageBucket: 'employees-6aa65.appspot.com',
      messagingSenderId: '888408626149'
    };
    firebase.initializeApp(config);
  }
  constructor()
 {
   super();

   this.state = { hidePassword: true }
 }

 managePasswordVisibility = () =>
 {
   this.setState({ hidePassword: !this.state.hidePassword });
 }
  render() {
    let pic = {
      uri: 'https://crackerbarrel.com/-/media/CrackerBarrel/About/Media-Kit/Logos/CBLogoRGB_248x248_low.jpg?h=248&w=248&la=en&hash=7DF75B380EC033D1A0283333AADCBE71B5414A97'
    };
    return (

      <View style={styles.container}>

        <Image source={pic} style={{width: 193, height: 150}}/>

        <Text> Login here using your Employee number and password</Text>

        <View style={styles.userPassBox}>
          <TextInput
            placeholder="Email"
            placeholderTextColor='#f9a812'
            fontSize= "18"
            color = '#f9a812'
            onChangeText={email => this.state({email})}
          />
        </View>

        <View style={styles.userPassBox}>
          <TextInput
            placeholder="Password"
            underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword }
            placeholderTextColor='#f9a812'
            fontSize= "18"
            color = '#f9a812'
            onChangeText={(text) => this.setState({password:text})}
          />
          <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('./assets/hide.png') : require('./assets/view.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

        <View style={[{ width: "20%", margin: 7, backgroundColor: '#551505' }]}>
          <Button
              title="Login"
              color='#f9a812'
              accessibilityLabel="Log in to app"
              onPress={this.onButtonPress.bind(this)}
          />
          <Text>
            {this.state.error}
          </Text>
        </View>
      </View>

    );
  }
  logInAsync = async () => {
  await AsyncStorage.setItem('userToken', 'abc');
  this.props.navigation.navigate('App');
 };

}

class HomeScreen extends React.Component {
  static navigationOptions = {
  };

  render() {
    let pic1 = {
      uri: 'https://i.pinimg.com/originals/54/a4/84/54a484c38f5b9433e4e01925f044fc0f.jpg'};
    return (
      <View style={styles.container}>
        <Image source={pic1} style={{width: 193, height: 150}}/>
        <Button title="Next Page" onPress={this.nextPage} />
        <Button title="Logout" onPress={this.logOutAsync} />
      </View>
    );
  }

  nextPage = () => {
    this.props.navigation.navigate('Other');
  };

  logOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Logout" onPress={this.logOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  logOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textBoxBtnHolder:
  {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  textBox:
  {
    flex: 1,
    fontSize: 18,
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: 5
  },

  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },

  btnImage:
  {
    left: 40,
    bottom: 8,
    resizeMode: 'contain',
    height: '110%',
    width: '110%'
  },

  userPassBox:{
    height: "4%",
    width: "40%",
    margin: 5,
    backgroundColor: '#551505',
    fontSize: 15
  }

});

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ LogIn: LogInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

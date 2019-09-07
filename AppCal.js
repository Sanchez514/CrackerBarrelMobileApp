import React, {Component} from 'react';
import { ActivityIndicator, ScrollView, AsyncStorage, StatusBar, StyleSheet, Text, View, TextInput, Button ,AppRegistry, Image, KeyboardAvoidingView, TouchableOpacity, Platform,Header} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import {Calendar} from 'react-native-calendars';

export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

class LogInScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: 'White',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: '500',
    },
  };
  constructor()
 {
   super();


   this.state = { hidePassword: true }
   this.state.userInput = {
      username: '',
      password: '',
    }
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

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>

        <Image source={pic} style={{width: 193, height: 150}}/>

        <View style={[{ alignSelf: 'center',
          color: '#551505',
          fontWeight: '600',
          paddingTop: 7,
          paddingBottom: 7,
          flex: 0,
          alignSelf: 'stretch',
          backgroundColor: '#551505',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'grey',
          margin: 5,
          marginLeft: 5,
          marginLeft: 5 }]}>

          <TextInput
            placeholder="Employee Number"
            placeholderTextColor='#f9a812'
            fontSize= "18"
            color = '#f9a812'
            onChangeText={(text) => this.setState({employeeNumber:text})}
          />
        </View>

        <View style={[{ alignSelf: 'center',
          color: '#551505',
          fontWeight: '600',
          paddingTop: 7,
          paddingBottom: 7,
          flex: 0,
          alignSelf: 'stretch',
          backgroundColor: '#551505',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'grey',
          margin: 5,
          marginLeft: 5,
          marginLeft: 5 }]}>

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

        <View style={[{ alignSelf: 'center',
          color: '#551505',
          fontWeight: '600',
          paddingTop: 7,
          paddingBottom: 7,
          flex: 0,
          alignSelf: 'stretch',
          backgroundColor: '#551505',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'grey',
          margin: 5,
          marginLeft: 5,
          marginLeft: 5 }]}>
          <Button
              title="Login"
              color='#f9a812'
              accessibilityLabel="Log in to app"
              onPress={this.logInAsync}
          />
        </View>
      </KeyboardAvoidingView>


    );

  }
  logInAsync = async () => {
  await AsyncStorage.setItem('userToken', 'abc');
  this.props.navigation.navigate('App');
 };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Employee Portal',
    headerStyle: {
      backgroundColor: 'White',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: '500',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Calendar with selectable date and arrows</Text>
         <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
         />
         <Text style={styles.text}>Calendar with marked dates and hidden arrows</Text>
         <Calendar
          style={styles.calendar}
          current={'2012-05-16'}
          minDate={'2012-05-10'}
          maxDate={'2012-05-29'}
          firstDay={1}
          markedDates={{
            '2012-05-23': {selected: true, marked: true},
            '2012-05-24': {selected: true, marked: true, dotColor: 'green'},
            '2012-05-25': {marked: true, dotColor: 'red'},
            '2012-05-26': {marked: true},
            '2012-05-27': {disabled: true, activeOpacity: 0}
          }}
          // disabledByDefault={true}
          hideArrows={true}
          />
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

const AppStack = createStackNavigator({ Home: HomeScreen});
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

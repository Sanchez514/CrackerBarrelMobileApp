import React, {Component} from 'react';
import { ActivityIndicator, ScrollView, AsyncStorage, StatusBar, StyleSheet, Text, View, TextInput, Button ,AppRegistry, Image, KeyboardAvoidingView, TouchableOpacity, Platform,Header} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import {Calendar} from 'react-native-calendars';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


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
   this.state = {
     email : '',
     password: ''
   };
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
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

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
      <ScrollView style={styles.containercal}>
        <Button
          title="Logout"
          onPress={this.logOutAsync}
          color='black'
          />
        <Text style={styles.textcal}>Weekly Schedule</Text>
        <Text style={styles.textcal}>
          {this.state.email}{'\n'}{'\n'}
        </Text>
        <Text style={styles.textcal}>Request Time Off</Text>
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
        />
      </ScrollView>
    );
  }


  nextPage = () => {
    this.props.navigation.navigate('Other');
  };

  logOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  onDayPress(day) {
  this.setState({
    selected: day.dateString
  });
 }
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
  },

  calendar: {
  borderTopWidth: 1,
  paddingTop: 5,
  borderBottomWidth: 1,
  borderColor: '#eee',
  height: 350
},

textcal: {
  textAlign: 'center',
  borderColor: '#bbb',
  padding: 10,
  backgroundColor: '#eee'
},

containercal: {
  flex: 1,
  backgroundColor: 'gray'
},
containerTable: {
   flex: 1,
   padding: 16,
   paddingTop: 30,
   backgroundColor: '#fff'
},

headTable: {
height: 40,
backgroundColor: '#f1f8ff'
},

textTable: {
   margin: 6
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

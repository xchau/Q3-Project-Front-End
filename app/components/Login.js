import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';
import axios from 'axios';
import Button from 'react-native-button';
import { Kohana } from 'react-native-textinput-effects';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    width: null,
    height: null,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameText: {
    color: '#403d3d',
    fontFamily: 'raleway_regular',
    fontSize: 80,
    textAlign: 'center'
  },
  taglineText: {
    color: '#403d3d',
    fontFamily: 'raleway_regular',
    fontSize: 26,
    textAlign: 'center'
  },
  inputField: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  linkBox: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    marginTop: 30,
    width: 300
  },
  formContainer: {
    marginTop: 50
  },
  registerLink: {
    color: 'lightcoral',
    fontFamily: 'raleway_regular',
    fontSize: 18,
  },
  labelStyle: {
    color: '#55575c',
    fontFamily: 'raleway_regular',
    fontWeight: 'normal',
    fontSize: 16,
    textAlign: 'center',
    width: 260
  },
  inputStyle: {
    color: '#333742',
    fontFamily: 'raleway_regular'
  },
  submitContainer: {
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#6197e9',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center'
  },
  submitButton: {
    color: 'white',
    fontFamily: 'raleway_regular',
    fontWeight: 'normal',
    fontSize: 18
  },

});

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      userInfo: {
        id: '',
        token: ''
      }
    };

    this.navigate = this.navigate.bind(this);
    this.callToken = this.callToken.bind(this);
  }

  navigate(routeName) {
    this.props.navigator.push({ name: routeName })
  }

  callToken() {
    axios
      .post('https://this-city-server.herokuapp.com/api/token', {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res) {
          const nextState = {
            userInfo: {
              id: res.data.id,
              token: res.data.token
            }
          };

          this.props.getUserInfo(nextState);

          this.setState(nextState);
          this.navigate('map');
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  render() {
    return <Image
      source={require('../images/bg.jpg')}
      style={styles.pageContainer}
      title="Created by Kjpargeter - Freepik.com"
    >
      <Text style={styles.appNameText}>
        this.<Text style={{ color: 'lightcoral' }}>city</Text>
      </Text>
      <Text style={styles.taglineText}>
        Report. Review. Revamp.
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.inputRow}>
          <Kohana
            style={styles.inputField}
            label={"Email"}
            iconClass={MaterialCommunityIcon}
            iconName={'email-outline'}
            iconColor={'lightcoral'}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
            name="email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
        </View>

        <View style={styles.inputRow}>
          <Kohana
            style={styles.inputField}
            label={"Password"}
            iconClass={SimpleLineIcon}
            iconName={'key'}
            iconColor={'lightcoral'}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
            secureTextEntry={true}
            name="password"
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
        </View>

        <View style={{ height: 10 }}></View>

        <Button
          containerStyle={styles.submitContainer}
          onPress={this.callToken}
          style={styles.submitButton}
        >
          Log in
        </Button>

        <View style={styles.linkBox}>
          <Text style={{ color: '#393836', fontFamily: 'raleway_regular', fontSize: 18 }}>Not a member?</Text>
          <TouchableHighlight onPress={() => this.navigate('registration')}>
            <Text style={styles.registerLink}> Register for free.</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Image>
  }
}

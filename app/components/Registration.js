import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import axios from 'axios';
import { Kohana } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameText: {
    color: '#403d3d',
    fontFamily: 'raleway_regular',
    fontSize: 70,
    textAlign: 'center'
  },
  welcomeText: {
    color: '#403d3d',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    width: 300
  },
  formContainer: {
    marginTop: 45
  },
  inputField: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 46
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15
  },
  labelStyle: {
    color: '#55575c',
    fontFamily: 'raleway_regular',
    fontWeight: 'normal',
    fontSize: 16,
    textAlign: 'center',
    width: 270
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
  }
});

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      address: '',
      loggedIn: false
    };

    this.navigate = this.navigate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  navigate(routeName) {
    this.props.navigator.push({ name: routeName })
  }

  handleSubmit() {
    axios
      .post('https://this-city-server.herokuapp.com/api/users', this.state)
      .then((res) => {
        if (res.data.id) {
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
      <View>
        <Text style={styles.appNameText}>
          this.<Text style={{ color: 'lightcoral' }}>city</Text>
        </Text>
        <Text style={styles.welcomeText}>
          Join our citizen community dedicated to making a better, cleaner, safer Seattle.
        </Text>

        <View style={styles.formContainer}>

          <View style={styles.inputRow}>
            <Kohana
              style={styles.inputField}
              label={"Username"}
              iconClass={SimpleLineIcon}
              iconName={'user'}
              iconColor={'lightcoral'}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              name="username"
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
          </View>

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

          <View style={styles.inputRow}>
            <Kohana
              style={styles.inputField}
              label={"Address"}
              iconClass={SimpleLineIcon}
              iconName={'location-pin'}
              iconColor={'lightcoral'}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              name="address"
              onChangeText={(address) => this.setState({address})}
              value={this.state.address}
            />
          </View>

          <View style={{ height: 10 }}></View>

          <Button
            containerStyle={styles.submitContainer}
            onPress={this.handleSubmit}
            style={styles.submitButton}
          >
            Register
          </Button>
        </View>
      </View>
    </Image>
  }
}

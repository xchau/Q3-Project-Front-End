import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Map from './app/components/Map';
import Control from './app/components/Control';
import Login from './app/components/Login';
import Report from './app/components/Report';
import Problem from './app/components/Problem';
import Registration from './app/components/Registration';
import CameraView from './app/components/Camera';


const routes = [];

export default class Q3ProjectFE extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        id: null,
        token: null
      },
      currentProblem: {}
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.saveCurrentProblem = this.saveCurrentProblem.bind(this);
  }

  getUserInfo(nextState) {
    this.setState(nextState);
  }

  saveCurrentProblem(currentProblem) {
    this.setState({
      currentProblem
    });
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'login':
        return <Login
          navigator={navigator}
          getUserInfo={this.getUserInfo}
        />
      case 'registration':
        return <Registration navigator={navigator} />
      case 'map':
        return <Map
          userInfo={this.state.userInfo}
          saveCurrentProblem={this.saveCurrentProblem}
          currentProblem={this.state.currentProblem}
          navigator={navigator}
        />
      case 'problem':
        return <Problem navigator={navigator} />
      case 'camera':
        return <CameraView />
      default:
        return <View>
          <Text>EMPTY</Text>
        </View>
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'map'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

AppRegistry.registerComponent('Q3ProjectFE', () => Q3ProjectFE);

import React, { Component } from 'react';
import { ListView, Text, TextInput, TouchableHighlight, StyleSheet, View } from 'react-native';
import axios from 'axios';
import Button from 'react-native-button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6197e9'
  },
  appName: {
    flexDirection: 'row'
  },
  appNameText: {
    fontSize: 70,
    fontFamily: 'raleway_regular'
  },
  title: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  titleHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleHeaderText: {
    fontSize: 35,
    color: 'black',
    fontFamily: 'alegreya_sans_sc_regular'
  },
  titleText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'raleway_regular'
  },
  description: {
    flexDirection: 'column',
    flex: 2,
    marginLeft: 10,
    marginRight: 10
  },
  descriptionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  descriptionHeaderText: {
    fontSize: 35,
    color: 'black',
    fontFamily: 'alegreya_sans_sc_regular'
  },
  descriptionText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'raleway_regular'
  },
  problem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    flex: -1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  userText: {
    fontSize: 25,
    fontFamily: 'raleway_regular',
  },
  problemContainer: {
    backgroundColor: '#D6352D',
    borderRadius: 12,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  problemText: {
    fontSize: 30,
    marginBottom: 10,
    color: 'white',
    fontFamily: 'alegreya_sans_sc_regular'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1
  },
  choices: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },
  goBack: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 10
  },
  goBackBtn: {
    elevation: 500,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 13
  },
  infoContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 12,
    flex: 3
  },
  icon: {
    fontSize: 40,
    color: '#D6352D',
    marginRight: 5
  },
  userIcon: {
    fontSize: 30,
    color: '#89c6f2',
    marginRight: 5
  }
});

class Problem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProblem: this.props.currentProblem,
      upVoteColor: null,
      downVoteColor: null,
      votedBefore: false
    };

    this.handleVerification = this.handleVerification.bind(this);
  }

  handleVerification(bool) {
    const verificationInfo = {
      userId: this.props.userInfo.id,
      probId: this.state.currentProblem.id,
      verification: bool
    }

    if (this.state.votedBefore) {
      axios
        .patch('https://this-city-server.herokuapp.com/api/verification', verificationInfo)
        .then((res) => {
          this.props.updateMap();
          if (res.data.verified) {
            this.setState({
              upVoteColor: 'green',
              downVoteColor: 'black'
            });
          }
          else {
            this.setState({
              downVoteColor: 'red',
              upVoteColor: 'black'
            });
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
    else {
      axios
        .post('https://this-city-server.herokuapp.com/api/verification', verificationInfo)
        .then((res) => {
          this.props.updateMap();
          if (res.data.verified) {
            this.setState({
              upVoteColor: 'green',
              downVoteColor: 'black'
            });
          }
          else {
            this.setState({
              downVoteColor: 'red',
              upVoteColor: 'black'
            });
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appName}>
          <Text style={styles.appNameText}>
            this.<Text style={{ color: 'lightcoral' }}>city</Text>
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.title}>
            <View style={styles.titleHeaderContainer}>
              <MaterialIcons name="report-problem" style={styles.icon}/>
              <Text style={styles.titleHeaderText}>
                Problem
              </Text>
            </View>
            <Text style={styles.titleText}>
              {this.state.currentProblem.title}
            </Text>
          </View>

          <View style={styles.description}>
            <View style={styles.descriptionHeaderContainer}>
              <MaterialIcons name="description" style={styles.icon}/>
              <Text style={styles.titleHeaderText}>
                Description
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {this.state.currentProblem.description}
            </Text>
          </View>

          <View style={styles.user}>
            <MaterialCommunityIcons name="account" style={styles.userIcon} />
            <Text style={styles.userText}>
              Report by: {this.state.currentProblem.username}
            </Text>
          </View>
        </View>

        <View style={styles.problemContainer}>
          <Text style={styles.problemText}>Do you think this a problem?</Text>
          <View style={styles.iconContainer}>
            <TouchableHighlight
              onPress={() => this.handleVerification(true)}
              style={styles.choices}
              underlayColor="#EDE9EA"
            >
              <FontAwesomeIcon name="check" size={70} color={this.state.upVoteColor} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.handleVerification(false)}
              style={styles.choices}
              underlayColor="#EDE9EA"
            >
              <FontAwesomeIcon name="remove" size={70} color={this.state.downVoteColor} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.goBack}>
          <Button
            onPress={() => this.props.toggleProblem()}
            style={styles.goBackBtn}
          >
            Go Back
          </Button>
        </View>
      </View>
    );
  }

  componentWillMount() {
    const userId = this.props.userInfo.id;
    const probId = this.state.currentProblem.id;
    axios
      .get(`https://this-city-server.herokuapp.com/api/verification/${userId}/${probId}`)
      .then((res) => {
        if (res.data) {
          if (res.data.verified) {
            this.setState({
              votedBefore: true,
              upVoteColor: 'green',
              downVoteColor: 'black'
            });
          }
          else {
            this.setState({
              votedBefore: true,
              upVoteColor: 'black',
              downVoteColor: 'red'
            });
          }
        }
        else {
          this.setState({
            votedBefore: false,
            upVoteColor: 'black',
            downVoteColor: 'black'
          });
        }
      })
      .catch((err) => {
        console.error(err.message, userId, probId);
      });
  }
}

export default Problem;

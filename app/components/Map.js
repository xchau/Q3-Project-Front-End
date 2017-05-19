import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  Button,
  Modal
} from 'react-native';
import MapView from 'react-native-maps';
import Control from './Control';
import Problem from './Problem';
import axios from 'axios';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  marker: {
    backgroundColor: '#FF2413',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 50
  },
  person: {
    color: '#262629',
    backgroundColor: '#7aa4f0',
    borderRadius: 50,
  },
  calloutContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  callout: {
    width: 250,
    height: 125,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  calloutTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  calloutTitle: {
    fontSize: 25,
    fontFamily: 'alegreya_sans_sc_regular',
    color: 'black',
    textAlign: 'center'
  },
  votesContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  votes: {
    fontSize: 20,
    fontFamily: 'raleway_regular',
    color: 'black',
    marginRight: 5
  },
  categoryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 10,
    marginRight: 10
  },
  category: {
    fontFamily: 'raleway_regular',
    fontSize: 15
  },
  fakeLink: {
    color: '#D6352D',
    fontFamily: 'raleway_regular',
    fontWeight: 'bold',
    fontSize: 18
  },
  detailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 4
  },
  trafficIconContainer: {
    backgroundColor: '#FFD037',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: 'black'
  },
  constructionIconContainer: {
    backgroundColor: '#FF3D31',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: 'black'
  },
  bikingIconContainer: {
    backgroundColor: 'rgba(126, 227, 119, 0.6)',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: 'black'
  },
  trashIconContainer: {
    backgroundColor: 'rgba(131, 161, 230, 0.6)',
    borderRadius: 50,
    padding: 6,
    borderWidth: 2,
    borderColor: 'black'
  },
  noiseIconContainer: {
    backgroundColor: 'rgba(219, 198, 246, 0.6)',
    borderRadius: 50,
    padding: 6,
    borderWidth: 2,
    borderColor: 'black'
  },
  dangerIconContainer: {
    backgroundColor: 'rgba(237, 85, 113, 0.6)',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  brokenIconContainer: {
    backgroundColor: 'rgba(236, 226, 101, 0.6)',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  theftIconContainer: {
    backgroundColor: 'rgba(236, 173, 116, 0.6)',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  otherIconContainer: {
    backgroundColor: 'rgba(124, 123, 123, 0.6)',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
});

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      currentLocation: {
        lat: 0,
        lng: 0
      },
      delta: {
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      },
      problems: [],
      problemModalOpen: false
    }

    this.watchId = null;
    this.handleViewProblem = this.handleViewProblem.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.toggleProblem = this.toggleProblem.bind(this);
  }

  toggleProblem() {
    if (this.state.problemModalOpen) {
      this.setState({ problemModalOpen: false });
    }
    else {
      this.setState({ problemModalOpen: true });
    }
  }

  handleViewProblem(currentProblem) {
    this.props.saveCurrentProblem(currentProblem);

    this.setState({ problemModalOpen: true });
  }

  updateMap() {
    axios({
      method: 'post',
      url: 'https://q3-project-server.herokuapp.com/api/markers',
      data: {
        lat: this.state.center.lat,
        lng: this.state.center.lng
      }
    })
    .then((res) => {
      const markers = res.data;

      this.setState({
        problems: markers
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
  }

  iconStyle(delta) {
    if (delta >= 0.1) {
      return {
        fontSize: 22,
        color: 'black'
      }
    }
    if (delta >= 0.05) {
      return {
        fontSize: 22,
        color: 'black'
      }
    }
    if (delta >= 0.01) {
      return {
        fontSize: 22,
        color: 'black'
      }
    }
    if (delta >= 0.005) {
      return {
        fontSize: 22,
        color: 'black'
      }
    }
    if (delta >= 0.0001) {
      return {
        fontSize: 22,
        color: 'black'
      }
    }
  }

  render() {
    const NoiseIcon = (
      <View style={styles.noiseIconContainer}>
        <FontAwesomeIcon name="volume-up" style={this.iconStyle(this.state.delta.latitudeDelta)} />
      </View>
    );

    const TrafficIcon = (
      <View style={styles.trafficIconContainer}>
        <MaterialIcon name="traffic" style={this.iconStyle(this.state.delta.latitudeDelta)} />
      </View>
    );

    const ConstructionIcon = (
      <View style={styles.constructionIconContainer}>
        <IonIcon name="ios-hammer" style={this.iconStyle(this.state.delta.latitudeDelta)} />
      </View>
    );
    const BikingIcon = (
      <View style={styles.bikingIconContainer}>
        <MaterialIcon name="directions-bike" style={this.iconStyle(this.state.delta.latitudeDelta)} />
      </View>
    );

    const TrashIcon = (
      <View style={styles.trashIconContainer}>
        <FontAwesomeIcon name="trash-o" style={this.iconStyle(this.state.delta.latitudeDelta)} />
      </View>
    );
    const DangerIcon = (
      <View style={styles.dangerIconContainer}>
        <FontAwesomeIcon name="exclamation" style={this.iconStyle(this.state.delta.latitudeDelta)} />
      </View>
    );

    const BrokenIcon = (
      <View style={styles.brokenIconContainer}>
        <FontAwesomeIcon name="chain-broken" style={this.iconStyle(this.state.delta.latitudeDelta)} />
      </View>
    );

    const TheftIcon = (
      <View style={styles.theftIconContainer}>
        <EntypoIcon name="lock-open" style={this.iconStyle(this.state.delta.latitudeDelta)} />
      </View>
    );

    const OtherIcon = (
      <View style={styles.otherIconContainer}>
        <EntypoIcon name="infinity" style={this.iconStyle(this.state.delta.latitudeDelta)} />
      </View>
    )

    const categories = {
      traffic: [TrafficIcon, 'Traffic Alert'],
      construction: [ConstructionIcon, 'Construction Alert'],
      biking: [BikingIcon, 'Biking Hazard'],
      garbage: [TrashIcon, 'Pollution Alert'],
      noise: [NoiseIcon, 'Noise Alert'],
      danger: [DangerIcon, 'Safety Concern'],
      broken: [BrokenIcon, 'Broken Infrastructure'],
      theft: [TheftIcon, 'Recent Crime'],
      other: [OtherIcon, 'Other']
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          onRequestClose={this.toggleProblem}
          visible={this.state.problemModalOpen}
        >
          <Problem
            currentProblem={this.props.currentProblem}
            userInfo={this.props.userInfo}
            toggleProblem={this.toggleProblem}
            updateMap={this.updateMap}
          />
        </Modal>
        <MapView
          style={styles.map}

          region={{
            latitude: this.state.center.lat,
            longitude: this.state.center.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
       >
         {
           this.state.problems
             .map(marker => {
               for (const category in categories) {
                 if (category === marker.category) {
                   marker.label = categories[category][1]
                   marker.icon = categories[category][0];
                 }
               }
               return marker;
             })
             .map(marker => (
             <MapView.Marker
               key={marker.id}
               coordinate={
                 {
                   latitude: marker.lat,
                   longitude: marker.lng
                 }
               }
             >
                 {marker.icon}
               <MapView.Callout
                 style={styles.callout}
                 onPress={() => this.handleViewProblem(marker)}
               >
                 <View style={styles.calloutContainer}>
                   <View style={styles.calloutTitleContainer}>
                     <Text style={styles.calloutTitle}>
                       {marker.title}
                     </Text>
                   </View>

                   <View style={styles.categoryContainer}>
                     <Text style={styles.category}>
                       {marker.label}
                     </Text>
                   </View>
                   <View style={styles.detailsContainer}>
                     <View style={styles.votesContainer}>
                       <Text style={styles.votes}>
                         {marker.total}
                       </Text>
                       <IonIcon name="ios-people" size={35} color="#89c6f2" />
                     </View>
                     <Text style={styles.fakeLink}>MORE DETAILS</Text>
                   </View>
                 </View>
               </MapView.Callout>
             </MapView.Marker>
           ))
         }

        <MapView.Marker
          coordinate={
            {
              latitude: this.state.currentLocation.lat,
              longitude: this.state.currentLocation.lng
            }
          }
          style={{ zIndex: 1 }}
        >
          <MaterialIcon name="my-location" size={20} style={styles.person}></MaterialIcon>
        </MapView.Marker>
       </MapView>

       <Control
         currentLocation={this.state.center}
         nav={this.props.navigator}
         updateMap={this.updateMap}
         userInfo={this.props.userInfo}
       />

      </View>
    );
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });

        this.updateMap();
      },
      (err) => console.error(err.message)
    );
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        currentLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });

      this.updateMap();
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
}

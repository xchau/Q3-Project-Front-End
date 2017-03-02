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
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

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
    backgroundColor: '#397AFF',
    padding: 8,
    borderRadius: 50
  },
  callout: {
    width: 250,
    height: 125,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  calloutTitle: {
    fontSize: 25,
    color: 'black'
  },
  people: {
    fontSize: 20,
    color: 'black'
  },
  peopleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  category: {
    fontSize: 20
  },
  eye: {
    fontSize: 20
  },
  calloutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  calloutBtn: {
    width: 150,
    backgroundColor: '#B113FF',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  calloutBtnText: {
    color: 'white',
    fontSize: 25
  },
  trafficIconContainer: {
    backgroundColor: '#FFD037',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: 'black'
  },
  trafficIcon: {
    fontSize: 30,
    color: 'black'
  },
  constructionIconContainer: {
    backgroundColor: '#FF3D31',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: 'black'
  },
  constructionIcon: {
    fontSize: 30,
    color: 'white'
  },
  bikingIconContainer: {
    backgroundColor: '#25FF59',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: 'black'
  },
  bikingIcon: {
    fontSize: 30,
    color: 'black'
  },
  trashIconContainer: {
    backgroundColor: '#854700',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: 'black'
  },
  trashIcon: {
    fontSize: 25,
    color: 'white'
  },
  noiseIconContainer: {
    backgroundColor: '#38B1FF',
    borderRadius: 50,
    padding: 6,
    borderWidth: 2,
    borderColor: 'black'
  },
  noiseIcon: {
    fontSize: 25,
    color: 'black'
  },
  dangerIconContainer: {
    backgroundColor: '#FF3E00',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  dangerIcon: {
    fontSize: 25,
    color: 'black'
  },
  brokenIconContainer: {
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'white'
  },
  brokenIcon: {
    fontSize: 25,
    color: 'white'
  },
  theftIconContainer: {
    backgroundColor: '#FFC351',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'white'
  },
  theftIcon: {
    fontSize: 25,
    color: 'black'
  },
  otherIconContainer: {
    backgroundColor: '#FFE3A7',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'white'
  },
  otherIcon: {
    fontSize: 25,
    color: 'black'
  }
});

const TrafficIcon = (
  <View style={styles.trafficIconContainer}>
    <MaterialIcons name="traffic" style={styles.trafficIcon} />
  </View>
);

const ConstructionIcon = (
  <View style={styles.constructionIconContainer}>
    <IonIcons name="ios-hammer" style={styles.constructionIcon} />
  </View>
);

const BikingIcon = (
  <View style={styles.bikingIconContainer}>
    <MaterialIcons name="directions-bike" style={styles.bikingIcon} />
  </View>
);

const TrashIcon = (
  <View style={styles.trashIconContainer}>
    <FontAwesomeIcons name="trash-o" style={styles.trashIcon} />
  </View>
);

const NoiseIcon = (
  <View style={styles.noiseIconContainer}>
    <FontAwesomeIcons name="volume-up" style={styles.noiseIcon} />
  </View>
);

const DangerIcon = (
  <View style={styles.dangerIconContainer}>
    <FontAwesomeIcons name="exclamation" style={styles.dangerIcon} />
  </View>
);

const BrokenIcon = (
  <View style={styles.brokenIconContainer}>
    <FontAwesomeIcons name="chain-broken" style={styles.brokenIcon} />
  </View>
);

const TheftIcon = (
  <View style={styles.theftIconContainer}>
    <EntypoIcons name="lock-open" style={styles.theftIcon} />
  </View>
);

const OtherIcon = (
  <View style={styles.otherIconContainer}>
    <EntypoIcons name="infinity" style={styles.otherIcon} />
  </View>
)

const categories = {
  traffic: TrafficIcon,
  construction: ConstructionIcon,
  biking: BikingIcon,
  garbage: TrashIcon,
  noise: NoiseIcon,
  danger: DangerIcon,
  broken: BrokenIcon,
  theft: TheftIcon,
  other: OtherIcon
}

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        // lat: 47.5993,
        // lng: -122.334
        lat: 0,
        lng: 0
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

  viewProblem() {
    this.props.navigator('')
  }

  updateMap() {
    axios({
      method: 'post',
      url: 'https://q3project-server.herokuapp.com/api/markers',
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

  render() {
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
                   marker.icon = categories[category];
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
                 <Text style={styles.calloutTitle}>{marker.title}</Text>
                 <View style={styles.calloutContainer}>
                   <View style={styles.peopleContainer}>
                     <EntypoIcons name="eye" style={styles.eye}/>
                     <Text style={styles.people}>Total: {marker.total}</Text>
                   </View>
                   <Text style={styles.category}>{marker.category}</Text>
                 </View>
               </MapView.Callout>
             </MapView.Marker>
           ))
         }

        <MapView.Marker
          coordinate={
            {
              latitude: this.state.center.lat,
              longitude: this.state.center.lng
            }
          }
        >
          <View style={styles.person}></View>
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
          }
        });

        this.updateMap();
      },
      (err) => console.error(err.message, 'it\'s me')
      // ,
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        center: {
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

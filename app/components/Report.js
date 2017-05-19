import React, { Component } from 'react';
import { Picker, StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView } from 'react-native';
import axios from 'axios';
import Button from 'react-native-button';
import MiniMap from './MiniMap';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

const styles = StyleSheet.create({
  container: {
    width: null,
    height: null,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6197e9'
  },
  header: {
    fontSize: 50,
    fontFamily: 'alegreya_sans_sc_regular',
    color: 'white'
  },
  buttonContainer: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#6197e9',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#D6352D',
    flex: 2,
    borderRadius: 12,
    color: 'white',
    fontStyle: 'normal',
    fontFamily: 'alegreya_sans_sc_regular',
    fontWeight: 'bold',
    fontSize: 25
  },
  infoContainer: {
    flexDirection: 'column',
    flex: 3,
    backgroundColor: '#D6352D',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 6,
  },
  inputRowTextInput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  inputRowOtherInput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  inputField: {
    borderRadius: 12,
  },
  labelStyle: {
    color: '#55575c',
    fontWeight: 'normal',
    fontFamily: 'raleway_regular',
    fontSize: 18,
    textAlign: 'center',
    width: 340
  },
  inputStyle: {
    color: 'black',
    fontFamily: 'raleway_regular'
  },
  picker: {
    flex: 2,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'white'
  },
  helperText: {
    fontStyle: 'normal',
    fontFamily: 'alegreya_sans_sc_regular',
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  directionsText: {
    fontStyle: 'normal',
    fontFamily: 'raleway_regular',
    fontSize: 20,
    color: 'white'
  },
  mapDirectionsText: {
    fontStyle: 'normal',
    fontFamily: 'raleway_regular',
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  mapContainer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 6,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  }
});

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      category_id: 1,
      user_id: this.props.userInfo.id,
      lat: this.props.currentLocation.lat,
      lng: this.props.currentLocation.lng,
      categories: [
        {id: 1, name: 'Other'},
        {id: 2, name: 'Construction Alert'},
        {id: 3, name: 'Biking Hazard'},
        {id: 4, name: 'Pollution Alert'},
        {id: 5, name: 'Noise Alert'},
        {id: 6, name: 'Safety Concern'},
        {id: 7, name: 'Broken Infrastructure'},
        {id: 8, name: 'Recent Crime'},
        {id: 9, name: 'Traffic Alert'}
      ]
    };

    this.navigate = this.navigate.bind(this);
    this.dragMarker = this.dragMarker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  dragMarker(event) {
    this.setState({ lat: event.nativeEvent.coordinate.latitude, lng: event.nativeEvent.coordinate.longitude });
  }

  navigate(routeName) {
    this.props.navigator.push({ name: routeName })
  }

  handleSubmit() {
    const problem = this.state;
    delete problem.categories;

    axios
      .post('https://q3-project-server.herokuapp.com/api/problem', problem)
      .then((res) => {
        if (res.data) {
          this.props.updateMap();
          this.props.toggleReport();
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Report a Problem</Text>

        <View style={styles.infoContainer}>
          <View style={styles.inputRowTextInput}>
            <Kohana
              style={styles.inputField}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              label={'Add a Title'}
              iconClass={MaterialIcons}
              iconName={'report-problem'}
              iconColor={'#89c6f2'}
              name={'title'}
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View style={styles.inputRowTextInput}>
            <Kohana
              style={styles.inputField}
              label={'Write a Description'}
              labelStyle={styles.labelStyle}
              iconClass={MaterialIcons}
              iconName={'description'}
              iconColor={'#89c6f2'}
              name={'description'}
              onChangeText={(description) => this.setState({description})}
              multiline={true}
              value={this.state.description}
            />
          </View>

          <Text style={styles.directionsText}>Pick a category</Text>
          <View style={styles.inputRowOtherInput}>
            <Picker
              prompt={'Pick a category'}
              style={styles.picker}
              selectedValue={this.state.category_id}
              onValueChange={(cat) => this.setState({category_id: cat})}
              >
                {
                  this.state.categories.map(option =>
                    <Picker.Item
                      key={option.id}
                      label={option.name}
                      value={option.id}
                    />)
                }
            </Picker>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.mapDirectionsText}>Select Location (touch/hold red marker)</Text>
          <MiniMap
            currentLocation={this.props.currentLocation}
            dragMarker={this.dragMarker}
            markerLat={this.state.lat}
            markerLng={this.state.lng}
          />
        </View>

        <Button
          color="#517cc6"
          onPress={() => this.handleSubmit()}
          containerStyle={styles.buttonContainer}
          style={styles.submitButton}
        >
            Submit Report
        </Button>
      </View>
    );
  }
}

export default Report;

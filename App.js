import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { fetchWeatherData } from './utils/weatherAPI';
import { weatherIconNames } from './utils/weatherIconNames';
import { weatherPhrases } from './utils/weatherPhrases';

export default class App extends React.Component {
  state = {
    temp: 0,
    humidity: 0,
    weather: 'Default'
  };

  componentDidMount() {
    this.getDeviceLocation();
  }

  getDeviceLocation() {
    navigator.geolocation.getCurrentPosition(
      postData =>
        fetchWeatherData(
          postData.coords.latitude,
          postData.coords.longitude
        ).then(res =>
          this.setState({
            temp: Math.round(res.temp),
            humidity: res.humidity,
            weather: res.weather
            // weather: 'Default'
          })
        ),
      error => alert(error),
      { timeout: 10000 }
    );
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: weatherPhrases[this.state.weather].background }
        ]}
      >
        <View style={styles.headerContainer}>
          <Icon
            name={weatherIconNames[this.state.weather]}
            size={75}
            color={'white'}
          />
          <Text style={styles.tempText}>{this.state.temp}°</Text>
        </View>
        <View style={styles.statsContainer}>
          <Icon name="ios-thermometer-outline" size={48} color={'white'} />
          <Text style={styles.humidText}>{this.state.humidity}%</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>
            {weatherPhrases[this.state.weather].title}
          </Text>
          <Text style={styles.subtitle}>
            {weatherPhrases[this.state.weather].subtitle}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017'
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  humidText: {
    color: '#fff',
    fontSize: 48
  },
  tempText: {
    color: '#fff',
    fontSize: 65
  },
  bodyContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    margin: 15
  },
  title: {
    // fontFamily: 'HelveticaNeue-Bold',
    color: '#fff',
    fontSize: 68,
    marginBottom: 5
  },
  subtitle: {
    // fontFamily: 'HelveticaNeue-Medium',
    fontSize: 28,
    color: '#fff'
  }
});

import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import {colors} from './assets/colors'
import WeatherInfo from './components/weatherInfo';
import UnitsPicker from './components/unitsPicker';
import RefreshIcon from './components/refreshIcon';
import WeatherDetails from './components/weatherDetail';
import {WEATHER_API_KEY} from 'react-native-dotenv';

const WEATHER_URL = 'api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('imperial')

  useEffect(() => {
    load()
  }, [unitSystem])

  async function load() {
    try {
      let {} = await Location.requestForegroundPermissionsAsync()
      if(status !== 'granted') {
        setErrorMessage('Location is needed to run app.')
        return 
      };
      const location = await Location.getCurrentPositionAsync()
      const {lat, lon} = location.coords
      const weatherURL = `${WEATHER_URL}lat=${lat}&lon=${lon}&units=${unitSystem}&appid=${WEATHER_API_KEY}`
      
      const response = await fetch(weatherURL)
      const result = await response.json()

      if(response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
    }catch (e) {
      setErrorMessage(result.message)
    }
  };

  if (currentWeather) {

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main} >
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <RefreshIcon />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center'}}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.SECONDARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    flex: 1
  }
});

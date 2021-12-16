import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import {Picker} from '@react-native-picker/picker';

export default function unitsPicker({unitSystem, setUnitSytem}) {
  return (
    <View>
      <Picker 
        selectedValue={unitSystem} 
        onValueChange={(item) => setUnitSytem(item)} 
        mode="dropdown" 
        itemStyle={{ fontSize: 12}}
      >
      <Picker.Item label="F°" value="imperial" />
        <Picker.Item label="C°" value="metric" />
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  unitsSystem: {
      position: 'absolute',
      ...Platform.select({
          ios: {
              top: -30,
          },
          android: {
              top: 30,
          },
      }),

      left: 25,
      height: 50,
      width: 100,
  },
})

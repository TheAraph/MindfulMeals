import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import globalStyles from '../global-styles.js'
import * as Font from 'expo-font';
import { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Signin from './Signin'

const Onboarding4 = () => {
  const navigation = useNavigation()

  return (
    <ScrollView style = {{backgroundColor: "#FFF"}}>
    <View style = {[globalStyles.container]}>
    <View style={{ marginTop: 50 }}></View>
    <Text style={globalStyles.MindfulMeals}>MINDFUL MEALS</Text>
    <View style={{ marginTop: 10 }}></View>
    <Text style={[globalStyles.Headline5, {textAlign: 'center'}]}>Keep yourself <Text style = {{fontFamily: "Gotham-Bold", color:"#33A133"}}>educated</Text> with resources!</Text>
    <View style={{ marginTop: 10 }}></View>
    <Image
          style={{ height: 400, width: 210 }}
          source={require('../assets/Onboarding4.png')}
        />
            
            <View style={{ marginTop: 20 }}></View>
            <TouchableOpacity
              style={globalStyles.Button}
              onPress={() => navigation.navigate('Onboarding5')}>
              <Text style={globalStyles.ButtonText}>Continue</Text>
            </TouchableOpacity>
            <Text style={globalStyles.Headline6}>3/3</Text>
    </View>
    </ScrollView>
  )
}

export default Onboarding4


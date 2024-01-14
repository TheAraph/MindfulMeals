import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import globalStyles from '../global-styles.js'
import * as Font from 'expo-font';
import { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Signin from './Signin'

const Onboarding5 = () => {
  const navigation = useNavigation()

  return (
    <ScrollView style = {{backgroundColor: "#FFF"}}>
    <View style = {[globalStyles.container]}>
    <View style={{ marginTop: 50 }}></View>
    <Text style={globalStyles.MindfulMeals}>MINDFUL MEALS</Text>
    <View style={{ marginTop: 10 }}></View>
    <Text style={[globalStyles.Headline5, {textAlign: 'center'}]}><Text style = {{fontFamily: "Gotham-Bold", color:"#33A133"}}>PLEASE NOTE:</Text></Text>
    <Text style={[globalStyles.Headline5, {textAlign: 'center'}]}>At times you will be asked to diary your thoughts about certain features of the application.</Text>
    <Text style={[globalStyles.Headline5, {textAlign: 'center'}]}><Text style = {{fontFamily: "Gotham-Bold"}}>Please keep an eye out for the below button and give your feedback every 3/4 days,</Text> as this data will be of most help towards my findings. I encourage you to write in length. Thank you in advance!</Text>
    <View style={{ marginTop: 10 }}></View>
    <View style = {globalStyles.newcontainer}>
    <Image
          style={{ height: 100, width: 340, borderRadius:20 }}
          source={require('../assets/DiaryExample.png')}
        />
    </View>
            <View style={{ marginTop: 20 }}></View>
            <TouchableOpacity
              style={globalStyles.Button}
              onPress={() => navigation.navigate('Register')}>
              <Text style={globalStyles.ButtonText}>Continue</Text>
            </TouchableOpacity>
    </View>
    </ScrollView>
  )
}

export default Onboarding5


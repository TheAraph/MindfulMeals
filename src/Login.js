import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import globalStyles from '../global-styles.js'
import * as Font from 'expo-font';
import { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Signin from './Signin'

const Login = () => {
  const navigation = useNavigation()
  const [isImageLoaded, setIsImageLoaded] = useState(false)


  return (
    <ScrollView style = {{backgroundColor: "#FFF"}}>
    <View style = {[globalStyles.container, {bottom: 100}]}>
    <Image
          style={{ height: 500, width: 500 }}
          source={require('../assets/finalpls.png')}
          onLoad={() => setIsImageLoaded(true)} // Set isImageLoaded to true when the image has finished loading
        />
        {isImageLoaded && ( // Only render the following if the image has finished loading
          <>
            <Text style={globalStyles.MindfulMeals}>MINDFUL MEALS</Text>
            <Text style={[globalStyles.Headline5Bold, { color: '#33A133' }]}>
              A mindful health platform
            </Text>
            <View style={{ marginTop: 40 }}></View>
            <TouchableOpacity
              style={globalStyles.Button}
              onPress={() => navigation.navigate('Signin')}>
              <Text style={globalStyles.ButtonText}>Get Started</Text>
            </TouchableOpacity>
          </>
        )}
    </View>
    </ScrollView>
  )
}

export default Login


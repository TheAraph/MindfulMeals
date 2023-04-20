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
    //login variables
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  /*const [isFontLoaded, setIsFontLoaded] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Gotham-Black': require('../assets/fonts/Gotham-Black.otf'),
        'Gotham-Bold': require('../assets/fonts/Gotham-Bold.otf'),
        'Gotham-Light': require('../assets/fonts/Gotham-Light.otf'),
      });
      setIsFontLoaded(true)
    }

    loadFonts();
  }, [])

  if (!isFontLoaded) {
    return null // Return a blank screen or a loading spinner while the font is loading
  }

  */

  //login function
  loginUser = async (email, password) => {
    try{//try authenticate using username and password
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error){
        //show error message
        alert("Incorrect email or email doesn't exist")
    }
  }

  //forgot password
  const forgotPassword = () => {
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent")
      }).catch((error) => {
        alert("Incorrect email or email doesn't exist!")
      })
  }

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


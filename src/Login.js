import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import globalStyles from '../global-styles.js'


const Login = () => {
    //login variables
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    <View style = {globalStyles.container}>
        <Text style={globalStyles.MindfulMeals}>MINDFUL MEALS</Text>
        <Text style={globalStyles.Headline5Bold}>Healthy habits, happy life</Text>
        <View style = {{marginTop: 20}}></View>
        <View style={{ alignSelf: 'flex-start', marginLeft: 30 }}>
        <Text style={globalStyles.Headline6Bold}>Your email address:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="example@email.com"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
        />
        <View style = {{marginTop: 20}}></View>
        <View style={{ alignSelf: 'flex-start', marginLeft: 30 }}>
        <Text style={globalStyles.Headline6Bold}>Your password:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="min. 4 characters"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
        />
        <View style = {{marginTop: 20}}></View>
        <TouchableOpacity 
            style = {globalStyles.Button}
            onPress = {() => loginUser(email, password)}>
            <Text style = 
                {globalStyles.ButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style = {globalStyles.Button2}
            onPress = {() => {forgotPassword()}}>
            <Text style = {globalStyles.Button2TextGreen}>Forgot Password</Text>
            
        </TouchableOpacity>
        <View style = {{marginTop: 20}}></View>
        <TouchableOpacity
            style = {globalStyles.Button2}
            onPress = {() => navigation.navigate('Register')}>
            <Text style = {globalStyles.Button2Text}>Create A New Account</Text>
            
        </TouchableOpacity>
    </View>
  )
}

export default Login


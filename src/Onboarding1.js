import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import globalStyles from '../global-styles.js'
import * as Font from 'expo-font';
import { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Signin from './Signin'

const Onboarding1 = () => {
    //login variables
  const navigation = useNavigation()

  return (
    <ScrollView style = {{backgroundColor: "#FFF"}}>
    <View style = {[globalStyles.container]}>
    <View style = {{marginTop: 70}}></View>
        <Text style={globalStyles.Headline3Bold}>Consent Form</Text>
        <View style = {{marginTop: 10}}></View>
        <Image 
    style={{height: 100, width: 300}} 
    source={require('../assets/University-of-Malta.png')}>
    </Image>
        <View style = {{marginTop: 20}}></View>
        <Text style={[globalStyles.Headline5Bold, {textAlign: 'center', padding: 10}]}>This app is part of a university thesis project for the B.Sc (Hons.) in Software Development, and is conducted by Adam Ryan.</Text>
        <View style = {{marginTop: 10}}></View>
        <Text style={[globalStyles.Headline5, {textAlign: 'center', padding: 10}]}>
        Your participation in this study is voluntary. By registering for the mobile application, you consent to the use of your data for this study. The data collected will be used to evaluate the effectiveness of the mobile application and to gain insights into user behavior.
        </Text>
        <Text style={[globalStyles.Headline5Bold, {textAlign: 'center', padding: 10}]}>
        No identifiable information about you will be used or disclosed without your permission. The data will be stored securely and will only be accessed by the researcher.
        </Text>
        <Text style={[globalStyles.Headline5Bold, {textAlign: 'center', padding: 10, color: "#FF4D4D"}]}>
        For the sake of this study, please register using a dummy name and email and NOT your personal information, so as to not give away any personal details.
        </Text>
        <Text style={[globalStyles.Headline5Bold, {textAlign: 'center', padding: 10}]}>
        By registering for the mobile application, you indicate that you have read this consent form, have had an opportunity to ask questions, have not used your personal information, and have decided to participate voluntarily in this study.
        </Text>
        <Text style={[globalStyles.Headline5, {textAlign: 'center', padding: 10}]}>
        Thank you in advance 😊
        </Text>
        <TouchableOpacity
            style = {globalStyles.Button}
            onPress = {() => navigation.navigate('Onboarding2')}>
            <Text style = {globalStyles.ButtonText}>I Agree</Text>
            
        </TouchableOpacity>
        <View style = {{marginTop: 40}}></View>
    </View>
    </ScrollView>
  )
}

export default Onboarding1


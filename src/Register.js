import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler'
import globalStyles from '../global-styles.js'
import Emoji from 'react-native-emoji';
import { Picker } from '@react-native-picker/picker'
import LogHealth from './LogHealth'
import { KeyboardAvoidingView } from 'react-native'

const Register = () => {

  // set variables needed
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState([])
  const [waterGoal, setWaterGoal] = useState('')
  const [exerciseLevel, setExerciseLevel] = useState('Sedentary');
  const [lossOrGain, setLossOrGain] = useState('Lose');
  const [gender, setGender] = useState('Male') 

    


  // registeruser function (not used anymore - see LogHealth.js)
  registerUser = async (email, password, firstName, lastName, weight, height, waterGoal, age, exerciseLevel = 'Sedentary', lossOrGain = 'Loss', gender = 'Male') => {

    let exerciseValue = 0;
    let bmr = 0;
    let dailyCalories = 0;
  
    switch(exerciseLevel) {
      case 'Sedentary':
        exerciseValue = 1.2;
        break;
      case 'Lightly Active':
        exerciseValue = 1.375;
        break;
      case 'Moderately Active':
        exerciseValue = 1.55;
        break;
      case 'Very Active':
        exerciseValue = 1.725;
        break;
      case 'Extra Active':
        exerciseValue = 1.9;
        break;
    }
  
    if (gender === 'Male' && lossOrGain === 'lose') {
      bmr = (10 * weight + 6.25 * height - 5 * age + 5) * exerciseValue;
      dailyCalories = Math.round((74 / 100) * bmr);
    } else if (gender === 'Male' && lossOrGain === 'gain') {
      bmr = (10 * weight + 6.25 * height - 5 * age + 5) * exerciseValue;
      dailyCalories = Math.round((126 / 100) * bmr);
    } else if (gender === 'Female' && lossOrGain === 'lose') {
      bmr = (10 * weight + 6.25 * height - 5 * age - 161) * exerciseValue;
      dailyCalories = Math.round((74 / 100) * bmr);
    } else if (gender === 'Female' && lossOrGain === 'gain') {
      bmr = (10 * weight + 6.25 * height - 5 * age - 161) * exerciseValue;
      dailyCalories = Math.round((126 / 100) * bmr);
    } 
  
    try {
      //before moving wait for firebase auth
      await firebase.auth().createUserWithEmailAndPassword(email, password);
  
      //when firebase auth is present, send email verification
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: "true",
        url: 'https://mindfulmeals-26e41.firebaseapp.com',
      });
  
      //add user to database
      await firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
          weight: [weight],
          height,
          waterGoal,
          age,
          exerciseLevel,
          exerciseValue,
          lossOrGain,
          gender,
          caloriesConsumed: 0,
          waterDrank: 0,
          caloriePoints: 0,
          dailyCalories,
          remainingCalories: dailyCalories
        });
  
      //if it works, send email to inbox to verify
      alert('Congrats! You are now logged in. Please verify your email');
  
    } catch (error) {
      alert(error.message);
    }
  };

  const registerUserNoTrack = async (email, password, firstName, lastName) => {
    //before moving wait for firebase auth
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => { //when firebase auth is present, send email verification
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: "true",
        url: 'https://mindfulmeals-26e41.firebaseapp.com',
      })
      .then(() => {//if it works, send email to inbox to verify
        alert('Congrats! You are now logged in. Please verify your email')
      }).catch((error) => {
          alert(error.message)
      })
      .then(() => {//add user to database
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          // set all variables to 0 to be updated later by LogHealth
          firstName,
          lastName,
          email,
          weight: [0],
          height: 0,
          waterGoal: 0,
          age: 0,
          exerciseLevel: 0,
          lossOrGain: 0,
          caloriesConsumed : 0,
          waterDrank: 0,
          caloriePoints: 0,
          gender: 0,
          lastUpdated: new Date().toISOString()
        })
      })
      .catch((error) => {
        alert(error.message)
      })
    })
    .catch((error => {
      alert(error.message)
    }))
  }

  const updateWeight = (newWeight) => {
    if (!isNaN(newWeight)) {
      setWeight([...weight, newWeight])
    } else {
      alert('Please enter a valid weight value')
    }
  }

return(
  <ScrollView style = {{backgroundColor: "#FFF"}}>
  <KeyboardAvoidingView behavior="padding" >
  <View style = {globalStyles.container}>
  <View style = {{marginTop: 70}}></View>
  <Image 
    style={{height: 100, width: 100}} 
    source={require('../assets/Logo.png')}>
    </Image>
  <Text style={globalStyles.MindfulMeals}>MINDFUL MEALS</Text>
        <Text style={[globalStyles.Headline5Bold, {color: "#33A133"}]}>Healthy habits, happy life.</Text>
        <Text style={[globalStyles.Headline5, {textAlign: 'center'}]}>It's great to meet you!{"\n"}Please enter your details <Emoji name="smiley" /></Text>
        <Text style={[globalStyles.Headline6Bold, {textAlign: 'center', color: "#FF4D4D"}]}>
        Reminder: Please register using fake data so that the app doesn't record any of your personal information
        </Text>
        <View style = {{marginTop: 10}}>
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Fake Name:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="John"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
        />
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Fake Surname:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="Borg"
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}
        />
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Fake Email Address:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="example@email.com"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
        />
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Choose a password:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="min. 4 characters"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
        />
        </View>
        <View style = {{marginTop: 20}}></View>
          <TouchableOpacity
            style = {globalStyles.Button}
            onPress = {() => registerUserNoTrack(email, password, firstName, lastName)}>
            <Text style = 
                {globalStyles.ButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style = {{marginTop:20, alignItems:"center"}}
            onPress = {() => navigation.navigate('Login')}>
            <Text style = {globalStyles.Button3Text}>Back to Login</Text>
            
        </TouchableOpacity>
        <View style = {{marginBottom: 40}}></View>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
)
              }

export default Register

import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler'
import globalStyles from '../global-styles.js'
import Emoji from 'react-native-emoji';
import { Picker } from '@react-native-picker/picker'

const Register = () => {

  //set variables needed
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

    


  //registeruser function
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
          gender: 0
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
  <ScrollView>
  <View style = {globalStyles.container}>
  <View style = {{marginTop: 70}}></View>
  <Text style={globalStyles.MindfulMeals}>MINDFUL MEALS</Text>
        <Text style={globalStyles.Headline5Bold}>Healthy habits, happy life</Text>
        <View style = {{marginTop: 20}}></View>
        <Text style={globalStyles.Headline5}>It's great to meet you!</Text>
        <Text style={globalStyles.Headline5}>Please enter your details <Emoji name="smiley" /></Text>
        <View style = {{marginTop: 10}}>
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Your first name:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="John"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
        />
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Your last name:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="Borg"
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}
        />
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
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
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
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
        </View>
        <Text style={globalStyles.Headline5}>Tell us about your goals!</Text>
        <View style = {{marginTop: 10}}>
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Your age:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="Age"
            onChangeText={(age) => setAge(age)}
            autoCorrect={false}
            keyboardType="number-pad"
        />
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Your current weight in kg:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="50kg for example"
            onChangeText={(weight) => setWeight(weight)}
            autoCorrect={false}
            keyboardType="number-pad"
        />
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Your current height in cm:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="170cm for example"
            onChangeText={(height) => setHeight(height)}
            autoCorrect={false}
            keyboardType="number-pad"
        />
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Your water goal in Litres:</Text>
        </View>
        <TextInput
            style={globalStyles.textInput}
            placeholder="2L for example"
            onChangeText={(waterGoal) => setWaterGoal(waterGoal)}
            autoCorrect={false}
            keyboardType="number-pad"
        />
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>What is your gender?</Text>
        </View>
          <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        style={{ justifyContent: 'center', borderWidth: 1, borderColor: 'black', borderRadius: 30, alignSelf: 'center', width: 320 }}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
        </Picker>
        <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>How much do you exercise?</Text>
        </View>
        <Picker
        selectedValue={exerciseLevel}
        onValueChange={(itemValue, itemIndex) => setExerciseLevel(itemValue)}
        style={{ justifyContent: 'center', borderWidth: 1, borderColor: 'black', borderRadius: 30, alignSelf: 'center', width: 320 }}
        >
          <Picker.Item label="Sedentary" value="Sedentary" />
          <Picker.Item label="Lightly Active" value="Lightly Active" />
          <Picker.Item label="Moderately Active" value="Moderately Active" />
          <Picker.Item label="Very Active" value="Very Active" />
          <Picker.Item label="Extra Active" value="Extra Active" />
          </Picker>
          <View style={{ alignSelf: 'flex-start', marginLeft: 0 }}>
        <Text style={globalStyles.Headline6Bold}>Would you like to lose or gain weight?</Text>
        </View>
        <Picker
        selectedValue={lossOrGain}
        onValueChange={(itemValue, itemIndex) => setLossOrGain(itemValue)}
        style={{ justifyContent: 'center', borderWidth: 1, borderColor: 'black', borderRadius: 30, alignSelf: 'center', width: 320 }}
        >
          <Picker.Item label="Lose" value="lose" />
          <Picker.Item label="Gain" value="gain" />
          </Picker>
          <TouchableOpacity
            style = {{marginTop:20, alignItems:"center"}}
            onPress = {() => registerUserNoTrack(email, password, firstName, lastName)}>
            <Text style = {globalStyles.Button3Text}>Don't Track My Goals & Calories</Text>
            
        </TouchableOpacity>
        <View style = {{marginBottom: 40}}></View>
        <TouchableOpacity 
            style = {globalStyles.Button}
            onPress = {() => registerUser(email, password, firstName, lastName, weight, height, waterGoal, age, exerciseLevel, lossOrGain, gender)}>
            <Text style = 
                {globalStyles.ButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style = {{marginTop:20, alignItems:"center"}}
            onPress = {() => navigation.navigate('Login')}>
            <Text style = {globalStyles.Button3Text}>Back to Login</Text>
            
        </TouchableOpacity>
        <View style = {{marginBottom: 100}}></View>
    </View>
    </View>
    </ScrollView>
)
              }

export default Register

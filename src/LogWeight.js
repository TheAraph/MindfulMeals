import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../global-styles'

const LogWeight = () => {
  // Use navigation
    const navigation = useNavigation()
    
    // Variables
    const [weight, setWeight] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [exerciseValue, setExerciseValue] = useState('')
    const [lossOrGain, setLossOrGain] = useState('')

    // Get variables from firebase and set them to set variable
    useEffect(() => {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
          .then((snapshot) => {
              if (snapshot.exists) {
                  setWeight(snapshot.data().weight)
                  setGender(snapshot.data().gender)
                  setAge(snapshot.data().age)
                  setHeight(snapshot.data().height)
                  setExerciseValue(snapshot.data().exerciseValue)
                  setLossOrGain(snapshot.data().lossOrGain)
              } else {
                  console.log('User does not exist')
              }
          })
  }, [])

  // Update weight function
      const updateWeight = () => {
        const db = firebase.firestore();
        const userDocRef = db.collection("users").doc(firebase.auth().currentUser.uid);
        db.collection("users").doc(firebase.auth().currentUser.uid).update({
          weight: firebase.firestore.FieldValue.arrayUnion(parseFloat(weight))
        })
          .then(function () {
            // Calculate daily calories and remaining calories
            let bmr = 0;
            let dailyCalories = 0;

            // Update bmr according to the new weight (since the weight makes a difference to the recommended calories)
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
            else{
              return 0;
            }

            console.log("dailycalories =" + dailyCalories);

            // Update daily calories
            userDocRef.update({
              dailyCalories: dailyCalories,
              remainingCalories: dailyCalories
            })

            navigation.navigate('Health');
          })
          .catch(function (error) {
            console.error("Error updating weight: ", error);
          });
      }

  return (
      <View style={globalStyles.container}>
      <Text style = {[globalStyles.Headline6Bold, {padding:10, textAlign: 'center'}]}>Please note that by updating your weight, your daily calorie goal will be updated too</Text>
      <Text style={globalStyles.Headline5Bold}>Enter New Weight:</Text>
      <TextInput
            style={globalStyles.textInput}
            placeholder="New Weight"
            onChangeText={(weight) => setWeight(weight)}
            keyboardType="number-pad"
            autoCorrect={false}
        />
      <TouchableOpacity style = {globalStyles.Button} onPress = {() => updateWeight()}>
        <Text style = {globalStyles.ButtonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {globalStyles.Button} onPress = {() => navigation.navigate('Health')}>
        <Text style = {globalStyles.ButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogWeight

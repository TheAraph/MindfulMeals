import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../global-styles'

const LogWeight = () => {
    const navigation = useNavigation()
    
    const [weight, setWeight] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [exerciseValue, setExerciseValue] = useState('')
    const [lossOrGain, setLossOrGain] = useState('')

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

      const updateWeight = () => {
        const db = firebase.firestore();
        const userDocRef = db.collection("users").doc(firebase.auth().currentUser.uid);
        db.collection("users").doc(firebase.auth().currentUser.uid).update({
          weight: firebase.firestore.FieldValue.arrayUnion(parseFloat(weight))
        })
          .then(function () {
            console.log("Weight successfully added!");
            console.log("gender =" + gender);
            console.log("lossOrGain =" + lossOrGain);
            console.log("weight =" + weight);
            console.log("height =" + height);
            console.log("age =" + age);
            console.log("value =" + exerciseValue);
            // Calculate daily calories and remaining calories
            let bmr = 0;
            let dailyCalories = 0;

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
      <Text style={globalStyles.Headline5Bold}>Enter New Weight:</Text>
      <TextInput
            style={globalStyles.textInput}
            placeholder="Current Weight"
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

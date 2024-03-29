import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../global-styles'
import { KeyboardAvoidingView } from 'react-native';

const LogFood = () => {
    const navigation = useNavigation()
    
    // Set variables
    const [caloriesConsumed, setCaloriesConsumed] = useState('')
    const [remainingCalories, setRemainingCalories] = useState('')

    // Get remainingCalories data and set it
    useEffect(() => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
          if(snapshot.exists){
            setRemainingCalories(snapshot.data().remainingCalories)
          }
          else{
            console.log('User does not exist')
          }
        })
      }, [])

      // If calories update to 0 remaining, give 100 points
      useEffect(() => {
        const userId = firebase.auth().currentUser.uid;
        if (parseInt(remainingCalories) > 0 && parseInt(remainingCalories) - parseInt(caloriesConsumed) <= 0) {
            firebase.firestore().collection('users').doc(userId).update({
                caloriePoints: firebase.firestore.FieldValue.increment(100),
            })
            .catch((error) => {
                console.log('Error updating caloriePoints: ', error);
            });
        }
    }, [caloriesConsumed, remainingCalories])

    //  Function to update calories that updates remainingCalories and sets the update time to be used for evaluation
    const updateFood = () => {
      const newRemainingCalories = parseInt(remainingCalories) - parseInt(caloriesConsumed)
      const updatedRemainingCalories = newRemainingCalories < 0 ? 0 : newRemainingCalories
      const updateTimes = firebase.firestore.FieldValue.arrayUnion(new Date().toISOString()) // Add current date and time to the updateTimes array
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
          remainingCalories: updatedRemainingCalories,
          updateTimes: updateTimes // Add updateTimes array to Firestore document
      })
      .then(() => {
          setRemainingCalories(updatedRemainingCalories.toString())
          setCaloriesConsumed('')
          navigation.navigate('Health');
      })
      .catch((error) => {
          console.log('Error updating remaining calories:', error)
      })
  }


  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.Headline5Bold}>Enter Calories Consumed:</Text>
      <TextInput
            style={globalStyles.textInput}
            placeholder="Calories Consumed"
            onChangeText={(caloriesConsumed) => setCaloriesConsumed(caloriesConsumed)}
            keyboardType="number-pad"
            autoCorrect={false}
            value={caloriesConsumed}
        />
      <TouchableOpacity style = {globalStyles.Button} onPress = {() => updateFood()}>
        <Text style = {globalStyles.ButtonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {globalStyles.Button} onPress = {() => navigation.navigate('Health')}>
        <Text style = {globalStyles.ButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogFood

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    marginTop:30,
    justifyContent:"flex-end"
},
textInput:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 344,
    height: 73,
    borderRadius:15,
    elevation: 3,
    backgroundColor: '#FFF',
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    fontFamily: 'Avenir'
  },
  Button:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 344,
    height: 73,
    borderRadius: 73,
    elevation: 3,
    backgroundColor: '#D5342B',
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .5,
    shadowRadius: 3,
    elevation: 25,
  },
  ButtonText:{
    fontFamily: "AvenirNext-Heavy",
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },
  Headline4:{
    fontFamily: "Avenir",
  fontSize: 34,
  color: "#000",
  margin: 10,
  textAlign: 'center'
  }
})



  
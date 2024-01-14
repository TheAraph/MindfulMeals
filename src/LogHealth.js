import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../global-styles.js'
import { Picker } from '@react-native-picker/picker';
import { KeyboardAvoidingView } from 'react-native';


const LogHealth = () => {
    // Use navigation
    const navigation = useNavigation()

    // Variables
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState([])
    const [waterGoal, setWaterGoal] = useState('')
    const [exerciseLevel, setExerciseLevel] = useState('Sedentary');
    const [lossOrGain, setLossOrGain] = useState('lose');
    const [gender, setGender] = useState('Male') 

    // updateHealth function
    const updateHealth = async () => {
      let exerciseValue = 0;
      let bmr = 0;
      let dailyCalories = 0;
  
      // Set exercise value to be used for bmr calculation
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
  
      // Calculate recommended daily calories based on factors of gender, loss or gain, weight, height, age, and exercise level
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
    
      // Update the user's age, height, weight, waterGoal, gender, exerciseLevel, and lossOrGain, along with dailyCalories + remainingCalories and the last time they updated their data
      const uid = firebase.auth().currentUser.uid;
      await firebase.firestore().collection("users").doc(uid).update({
        age: age,
        height: height,
        weight: [weight],
        waterGoal: waterGoal,
        gender: gender,
        exerciseLevel: exerciseLevel,
        lossOrGain: lossOrGain,
        dailyCalories: dailyCalories,
        exerciseValue: exerciseValue,
        remainingCalories: dailyCalories,
        lastUpdated: new Date().toISOString()
      });

      navigation.navigate("Health");
};
    

  return (
    <ScrollView style = {{backgroundColor:"#FFF"}}>
    <View style = {globalStyles.container}>
    <View style = {{marginTop: 20}}></View>
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
        <Text style={globalStyles.Headline6Bold}>Please indicate your sex/gender for BMI calculation purposes:</Text>
        </View>
          <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        style={{ justifyContent: 'center', borderWidth: 1, borderColor: 'black', borderRadius: 30, alignSelf: 'center', width: 320 }}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
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
        <View style = {{marginBottom: 40}}></View>
        <TouchableOpacity 
            style = {globalStyles.Button}
            onPress = {() => updateHealth()}>
            <Text 
            style = {globalStyles.ButtonText}>Update</Text>
        </TouchableOpacity>
        <View style = {{marginBottom: 100}}></View>
    </View>
    </View>
    </ScrollView>
  )
  }

export default LogHealth

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
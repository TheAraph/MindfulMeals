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
    useEffect(() => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
          if(snapshot.exists){
            setWeight(snapshot.data().weight)
          }
          else{
            console.log('User does not exist')
          }
        })
      }, [])

      const updateWeight = () => {
        const db = firebase.firestore();
        db.collection("users").doc(firebase.auth().currentUser.uid).update({
          weight: firebase.firestore.FieldValue.arrayUnion(parseFloat(weight))
        })
          .then(function () {
            console.log("Weight successfully added!");
            alert('Weight successfully added!')
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

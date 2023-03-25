import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler';
import Emoji from 'react-native-emoji';

// const CurrentDate = () => {
//   const today = new Date();
//   const options = { weekday: 'long', month: 'long', day: 'numeric' };
//   const dateString = new Intl.DateTimeFormat('en-US', options).format(today);

//   return <Text style={styles.Date}>{dateString}</Text>;
// };

const FoodDrink = () => {

  const navigation = useNavigation()

  const [caloriesConsumed, setCaloriesConsumed] = useState('')
  useEffect(() => {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setCaloriesConsumed(snapshot.data().caloriesConsumed)
        }
        else{
          console.log('User does not exist')
        }
      })
    }, [])

    const [waterDrank, setWaterDrank] = useState('')
  useEffect(() => {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setWaterDrank(snapshot.data().waterDrank)
        }
        else{
          console.log('User does not exist')
        }
      })
    }, [])

    const [waterGoal, setWaterGoal] = useState('')
  useEffect(() => {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setWaterGoal(snapshot.data().waterGoal)
        }
        else{
          console.log('User does not exist')
        }
      })
    }, [])

    const resetValues = () => {
      try {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
          caloriesConsumed: 0,
          waterDrank: 0
        }).then(() => {
          alert('Values Reset');
          navigation.navigate('Home');
        });
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }

  return (
    <ScrollView>
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <View style={styles.newcontainer}>
      <Text style={styles.Headline4}>Calories Consumed</Text>
      <Text style={styles.Headline2Black}>{caloriesConsumed} <Emoji name="cherries" /></Text>
      <Text style={styles.Headline4}>Water Drank in Litres</Text>
      <Text style={styles.Headline2Black}>{waterDrank}/{waterGoal} <Emoji name="droplet" /></Text>
      </View>
      <TouchableOpacity style = {styles.Button} onPress = {() => navigation.navigate('LogFood')}>
        <Text style = {styles.ButtonText}>Log Food</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.Button} onPress = {() => navigation.navigate('LogDrink')}>
        <Text style = {styles.ButtonText}>Log Drink</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.Button2} onPress =  {resetValues}>
        <Text style = {styles.Button2Text}>Reset Values For New Day</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  )
}

export default FoodDrink

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    marginTop:100,
},
newcontainer:{
  marginTop: 20,
  alignItems: 'center',
  justifyContent: 'center',
  width: 341,
  borderRadius: 30,
  elevation: 3,
  backgroundColor: '#FFF',
  marginBottom: 25,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 25,
  borderWidth: 2,
borderColor: 'black',
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
  Healthify:{
    fontFamily: "Helvetica",
    fontSize: 61,
    color: "#D5342B",
    margin: 10,
    fontWeight: 'bold',
  },
  HealthifyUserName:{
    fontFamily: "Helvetica",
    fontSize: 48,
    color: "#E2716B",
    margin: 10,
    fontWeight: 'bold',
  },
  Headline4:{
    fontFamily: "Avenir",
      fontSize: 34,
      color: "#000",
      margin: 10,
      alignItems: "center"
  },
  Button2:{
    marginTop:20, alignItems:"center"
  },
  Headline2Black:{
    fontFamily: "AvenirNext-Heavy",
      fontSize: 61,
      color: "#000",
      margin: 10,
      fontWeight: 'bold'
  },
  Button2Text:{
    fontWeight:"bold",
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "Avenir",
    marginBottom: 20
  },
  Date:{
    fontFamily: "AvenirNext-UltraLightItalic",
      fontSize: 24,
      color: "#000",
      fontStyle: 'italic',
      fontWeight: 'bold',
      marginTop: 20
  }
})
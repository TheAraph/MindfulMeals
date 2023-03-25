import Header from "../components/Header";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput, Image } from 'react-native';
import { AboutScreen } from "./About"
import { ContactScreen } from "./Contact"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProfileScreen } from "./Profile";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import firebase from "firebase/compat";
import globalStyles from "../global-styles"

const Info = createStackNavigator();



const PersonalInfo = () => {
    const nav = useNavigation()

    const [name, setName] = useState('')

    const changePassword = () => {
      firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
         alert("Password Reset Email Sent")
      }).catch((error) => {
         alert(error)
      })
   }

   const deleteAccount = async () => {
      Alert.alert(
         'Delete Account',
         'Are you sure you want to delete your account?',
         [
            {
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel',
            },
            {
               text: 'Yes', onPress: async () => {
                  try {
                     const user = firebase.auth().currentUser;
                     await user.delete();
                     // Delete the user's data in Firestore
                     await firebase.firestore().collection('users').doc(user.uid).delete();
                  } catch(error) {
                     console.log(error);
                     }
                     }
                     },
                     ],
                     {cancelable: false},
                     );
                     }

    useEffect(() => {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setName(snapshot.data())
        }
        else{
          console.log('User does not exist')
        }
      })
    }, [])

  return (
    <View style={globalStyles.container}>
    <View style={globalStyles.infoBox}>
       <Text style={globalStyles.Headline4Bold}>{name.firstName} {name.lastName}</Text>
       <Text style={globalStyles.Headline6}>{name.email}</Text>
    </View>
    <View style = {{marginTop:40}}></View>
    <TouchableOpacity onPress={() => changePassword()} style={globalStyles.Button2}>
       <Text style={globalStyles.Button2Text}>Change Password</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => deleteAccount()} style={globalStyles.Button2}>
    <Text style={globalStyles.Button2TextGreen}>Delete Account</Text>
    </TouchableOpacity>
    <TouchableOpacity 
       style = {globalStyles.Button}
       onPress = {() => {firebase.auth().signOut()}}>
       <Text style =  
           {globalStyles.ButtonText}>Log Out</Text>
     </TouchableOpacity>
 </View>
  )
}


export default PersonalInfo
 
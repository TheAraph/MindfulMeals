import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {firebase} from '../config'
import React, {useState, useEffect} from 'react'
import { Alert } from "react-native";



const ProfileScreen = () => {

   const [name, setName] = useState('')

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

   return (
      <View style={styles.container}>
         <View style={styles.infoBox}>
            <Text style={styles.name}>{name.firstName}</Text>
            <Text style={styles.email}>{name.email}</Text>
         </View>
         <TouchableOpacity onPress={() => changePassword()} style={styles.passwordBox}>
            <Text style={styles.password}>Change Password</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => deleteAccount()} style={styles.deleteBox}>
   <Text style={styles.delete}>Delete Account</Text>
</TouchableOpacity>
         <TouchableOpacity 
            style = {styles.Button}
            onPress = {() => {firebase.auth().signOut()}}>
            <Text style =  
                {styles.ButtonText}>Log Out</Text>
          </TouchableOpacity>
      </View>
   );
 }

export {ProfileScreen} 

const styles = StyleSheet.create({
   container: { 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center' 
   },
   infoBox: {
      width:300, 
      height:100, 
      alignItems:'center', 
      bottom:100, 
      borderBottomColor:'black', 
      borderBottomWidth:2
   },
   name: {
      fontWeight:'bold', 
      fontSize:25,
      fontFamily: 'Avenir'
   },
   email: {
      fontSize: 20, 
      top:10,
      fontFamily: 'Avenir'
   },
   passwordBox: {
      width:245, 
      height:40, 
      alignItems:'center', 
      borderBottomColor:'#4c4c4c', 
      borderBottomWidth:2, 
      bottom:60
   }, 
   password: {
      fontWeight:'600', 
      fontSize:26, 
      color:'#4c4c4c',
      fontFamily: 'Avenir'
   },
   iconBox: {
      width:170, 
      height:40, 
      alignItems:'center', 
      borderBottomColor:'#4c4c4c', 
      borderBottomWidth:2, 
      bottom:40
   },
   icon: {
      fontWeight:'600', 
      fontSize:26, 
      color:'#4c4c4c'
   },
   deleteBox: {
      width:150, 
      height:30, 
      alignItems:'center', 
      borderBottomColor:'#d5342b', 
      borderBottomWidth:2, 
      bottom:10
   },
   delete: {
      fontWeight:'500', 
      fontSize:20, 
      color:'#d5342b',
      fontFamily: 'Avenir'
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
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 10,
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
        position: "absolute",
        bottom:20
      },
      ButtonText:{
        fontFamily: "Helvetica",
        fontSize: 34,
        fontWeight: 'bold',
        color: '#fff'
      },
      Healthify:{
        fontFamily: "Avenir",
        fontSize: 61,
        color: "#D5342B",
        marginTop: 10,
        fontWeight: 'bold',
      },
      HealthifyUserName:{
        fontFamily: "AvenirNext-Heavy",
        fontSize: 61,
        color: "#E2716B",
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .2,
        shadowRadius: 5,
        elevation: 25,
      },
      Headline4:{
        fontFamily: "Avenir",
        fontSize: 34,
        color: "#000",
        margin: 10,
        alignItems: "center"
      },
      Headline4Courier:{
        fontFamily: "American Typewriter",
        fontSize: 34,
        color: "#000",
        margin: 10,
        alignItems: "center"
      },
      Button2:{
        marginTop:20, alignItems:"center",
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
        fontFamily: "Avenir"
      },
      Date:{
        fontFamily: "AvenirNext-UltraLightItalic",
        fontSize: 24,
        color: "#000",
        fontStyle: 'italic',
        fontWeight: 'bold'
      }
  })
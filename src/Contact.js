import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Linking } from 'react-native';

export const ContactScreen = () => {

   const handleEmailPress = () => {
      const email = 'healthify@gmail.com'
      Linking.openURL(`mailto:${email}`)
    }
    

   return (
      <View style={styles.container}>
         <View style={styles.emailBox}>
            <Text style={styles.emailTitle}>Email :</Text>
            <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.emailContent}>healthify@gmail.com</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
 }

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
   },
   emailBox: {
      width:300, 
      alignItems:'center', 
      bottom:90
   }, 
   emailTitle: {
      fontWeight:'800', 
      fontSize:26, 
      color:'black',
      fontFamily: 'Avenir',
      textAlign: "center"
   },
   emailContent: {
      fontWeight:'400', 
      fontSize:26, 
      color:'black', 
      top: 30,
      fontFamily: 'Avenir',
      textAlign: "center",
      textDecorationLine: "underline"
   },
})
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const AboutScreen = () => {
   return (
      <View style={styles.container}>
         <View  style={styles.contentBox}>
            <Text style={styles.contentTitle}>Healthify</Text>
            <Text style={styles.para1}>
               Healthify is a health and fitness app created by five Software Development students at the University of Malta.
            </Text>
            <Text style={styles.para2}>   
               Healthify's top priority is the user, and therefore time an effort has been taken into account to improve on current apps within the health and fitness sector to give the user a more personalized experience.
            </Text>
            <Text style={styles.para3}>   
               The application is designed with the intention to pair it with a smart watch, but may also
               be used as a stand-alone application as well. 
            </Text>
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
   contentBox: {
      width:300, 
      alignItems:'center', 
      bottom:90
   },
   contentTitle: {
      fontWeight:'700', 
      fontSize:35, 
      color:'black',
      fontFamily: 'Avenir'
   },
   para1: {
      fontWeight:'500', 
      fontSize:16, 
      color:'black', 
      top: 40, 
      width:300,
      fontFamily: 'Avenir',
      textAlign: "center"
   },
   para2: {
      fontWeight:'500', 
      fontSize:16, 
      color:'black', 
      top: 60,
      fontFamily: 'Avenir',
      textAlign: "center"
   },
   para3: {
      fontWeight:'500', 
      fontSize:16, 
      color:'black', 
      top: 80,
      fontFamily: 'Avenir',
      textAlign: "center"
   },
})
import { View, TouchableOpacity, Text, Image, StyleSheet, Linking } from 'react-native';
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import globalStyles from '../global-styles'

const Resources = () => {
  return (
    <ScrollView>
    <View style = {{marginTop:20}}>
     <View style={globalStyles.container}>

     <TouchableOpacity style={globalStyles.card1} onPress={() => {Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSfV1mDgvAM1WyP96T-Ngw5j5TfaUIbuOzZxFshwc7ntmLnZcA/viewform?usp=sf_link")}}>
        <Image
          source = {require('../assets/Hotjar-how-to-conduct-surveys.width-1500.jpg')}
          style={globalStyles.image}
        />
        <Text style={globalStyles.cardtext}>Usability Study Form</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={globalStyles.card1} onPress={() => {Linking.openURL("https://www.cq-partners.com/blog/gain-vs-loss-framed-messaging-what-do-patients-best-respond-to/")}}>
        <Image
          source = {require('../assets/gym.jpeg')}
          style={globalStyles.image}
        />
        <Text style={globalStyles.cardtext}>Blog: Loss vs Gain</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.card1} onPress={() => {Linking.openURL("https://www.bbcgoodfood.com/recipes/collection/pie-recipes")}}>
        <Image
          source = {require('../assets/pie.jpg')}
          style={globalStyles.image}
        />
        <Text style={globalStyles.cardtext}>Recipe: Easy Pie</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.card1} onPress={() => {Linking.openURL("https://www.bettersleep.com/blog/")}}>
        <Image
          source = {require('../assets/guySleeping.jpg')}
          style={globalStyles.image}
        />
        <Text style={globalStyles.cardtext}>Blog: Better Sleep</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  )
}

export default Resources

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //background: "#FF0000",
    marginTop: 200
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
    },
    ButtonText:{
      fontFamily: "Helvetica",
      fontSize: 34,
      fontWeight: 'bold',
      color: '#fff'
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
      fontFamily: "Helvetica",
      fontSize: 61,
      color: "#000",
      margin: 10,
      fontWeight: 'bold'
    },
    Button2Text:{
      fontWeight:"bold",
      fontSize: 16,
      textDecorationLine: "underline"
    },
    Date:{
      fontFamily: "Helvetica",
      fontSize: 34,
      color: "#000",
      margin: 10,
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //background: "#FF0000",
    },
    card1: {
      shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .5,
    shadowRadius: 5,
    elevation: 25,
      width: 341,
      height: 177,
      padding: 40,
      backgroundColor: '#FFF',
      alignItems: 'center',
      textAlign:'center',
      borderRadius: 15,
      cloud: "#0000",
      padding: 10,
      marginBottom: 35,
    },
    image: {
      position: 'absolute',
      overflow: "hidden",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 341,
      height: 130,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    cardtext: {
      flex: 1,
      position: 'absolute',
      color: "#000000",
      textAlign: "center",
      bottom: 8,
      fontSize: 22,
      fontFamily: 'Avenir'
    },
})
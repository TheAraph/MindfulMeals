import { View, TouchableOpacity, Text, Image, StyleSheet, Linking } from 'react-native';
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import globalStyles from '../global-styles'
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat';

const Resources = () => {

  const [resources, setResources] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('resources')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setResources(data);
      });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#FFF' }}>
         <View style={globalStyles.container}>
    <View style = {{marginTop:20}}>

    {resources.map((resource) => (
          <TouchableOpacity
            style={styles.card1}
            key={resource.id}
            onPress={() => {
              Linking.openURL(resource.link);
            }}
          >
            <Image source={{ uri: resource.image }} style={styles.image} />
            <Text style={styles.cardtext}>{resource.title}</Text>
          </TouchableOpacity>
          ))}
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
    shadowRadius: 3,
    elevation: 25,
    width: 320,
    height: 200,
    padding: 40,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 20,
    cloud: "#0000",
    padding: 10,
    marginBottom: 35,
    justifyContent: 'center',
    position: 'relative'
    },
    image: {
      position: 'absolute',
    overflow: "hidden",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 320,
    height: 135,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    },
    cardtext: {
      position: 'absolute',
    color: "#000000",
    bottom: 17,
    textAlign: 'left',
    fontSize: 24,
    fontFamily: 'Gotham-Light',
    textAlignVertical: 'center',
    },
})
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../global-styles'
import Slider from '@react-native-community/slider';

const SelfMonitoringDiary = () => {
    const navigation = useNavigation()

    const [diaryText, setDiaryText] = useState(''); // State to store the user input in the TextInput
    const [sliderValue, setSliderValue] = useState(1);

    const handleSliderChange = (value) => {
        setSliderValue(value); // Update the state with the slider value
      };

  // Function to handle adding the diary entry to the SelfMonitoringDiary array in Firebase
  const handleConfirm = () => {
    // Get the current user from Firebase authentication
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      // Get the Firestore reference for the user document in Firebase
      const userRef = firebase.firestore().collection('users').doc(currentUser.uid);

      // Update the SelfMonitoringDiary array in the user document with the new diary entry
      userRef.update({
        selfMonitoringDiary: firebase.firestore.FieldValue.arrayUnion({
          diaryText: diaryText,
          sliderValue: sliderValue
        })
      }).then(() => {
        alert('Diary entry added successfully!');
        navigation.navigate('Health')
      }).catch((error) => {
        console.log('Error adding diary entry: ', error);
      });
    }
  };

  return (
    <ScrollView style = {{backgroundColor: "#FFF"}}>
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <View style={{marginTop:20}}></View>
    <View style={globalStyles.container}>
    <View style={globalStyles.newcontainer}>
    <Image 
    style={{height: 200, width: 360, borderRadius: 20,}} 
    source={require('../assets/SelfMonitoring.png')}>
    </Image>
    </View>
    <View style={{marginTop:20}}></View>
    <Text style={[globalStyles.Headline6Bold, {textAlign: 'center'}]}>These 2 features allow the user to self-monitor their calorie & weight goals</Text>
      <Text style={[globalStyles.Headline5, {textAlign: 'center'}]}>What do you think and feel about the feature above at this moment in time?</Text>
      <View style={{marginTop:10}}></View>
      <Image 
    style={{height: 60, width: 350, borderRadius: 20,}} 
    source={require('../assets/smile-rating-review-isolated-colored-feedback-emoticon-face-white-background-sad-happy-smiley-icons-neutral-yellow-smile-200961070.jpeg')}>
    </Image>
    <Slider
    style={styles.slider}
    minimumValue={1}
    maximumValue={5}
    step={1}
    value={1}
    onValueChange={(value) => handleSliderChange(value)}
    minimumTrackTintColor="#007AFF"
    maximumTrackTintColor="#000000"
    thumbTintColor="#007AFF"
  />
    <View style={{marginTop:10}}></View>
      <TextInput
      style={[globalStyles.textInput, ]}
      placeholder="Please lay out your thoughts in this text box"
      autoCorrect={false}
      onChangeText={setDiaryText} // Update the state with the user input
      value={diaryText} // Set the value of the TextInput to the state value
    />
      <TouchableOpacity style={globalStyles.Button} onPress={handleConfirm}> 
      <Text style={globalStyles.ButtonText}>Confirm</Text>
    </TouchableOpacity>
      <TouchableOpacity style = {globalStyles.Button} onPress = {() => navigation.navigate('Health')}>
        <Text style = {globalStyles.ButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default SelfMonitoringDiary

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
  Healthify:{
    fontFamily: "Helvetica",
    fontSize: 61,
    color: "#D5342B",
    margin: 0,
    fontWeight: 'bold',
  },
  Headline4:{
    fontFamily: "Avenir",
  fontSize: 34,
  color: "#000",
  margin: 10,
  textAlign: 'center'
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  slider: {
    width: 300,
    height: 40,
  },
  sliderLabel: {
    fontFamily: 'Avenir',
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
})



  
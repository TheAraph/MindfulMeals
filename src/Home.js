import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Image, FlatList} from 'react-native'
import React, {useState, useEffect} from 'react'
import {firebase} from '../config'
import { Pedometer } from 'expo-sensors';
import { ScrollView } from 'react-native-gesture-handler'
import { RefreshControl } from 'react-native';
import Emoji from 'react-native-emoji';
import globalStyles from '../global-styles';
import RecipeDetailsScreen from '../components/RecipeDetailsScreen';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';

const Stack = createStackNavigator();

const Home = () => {
  const [name, setName] = useState('')
  const [recipes, setRecipes] = useState([])

  const navigation = useNavigation();

  const getRecipeDetails = async (recipeId) => {
    const recipeSnapshot = await firestore()
      .collection('recipes')
      .doc(recipeId)
      .get();
  
    const recipeData = recipeSnapshot.data();
  
    return recipeData;
  };
  

  useEffect(() => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data())
        } else {
          console.log('User does not exist')
        }
      })

    firebase.firestore().collection('recipes').get()
      .then((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        setRecipes(data)
      })
  }, [])

  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="Health" 
          component={() => (
    <ScrollView style={{ backgroundColor: '#FFF' }}>
      <View style={{ marginTop: 20 }}></View>
      <View style={globalStyles.container}>
        <Text style={globalStyles.Headline5}>Welcome back,</Text>
        <Text style={globalStyles.Headline4Bold}>{name.firstName} {name.lastName} <Emoji name="heart" /></Text>
        <Text style={globalStyles.Headline6}>Are you ready to <Text style={{ fontWeight: 'bold' }}>take control</Text> of {"\n"} <Text style={{ fontWeight: 'bold' }}>YOUR</Text> wellness journey?</Text>
        <View style={{ marginTop: 20 }}></View>
      </View>
      <Text style={[globalStyles.Headline5Bold, { marginLeft: 30 }]}>New Recipes:</Text>
      <View style={globalStyles.container}>
        <View style={{ marginTop: 20 }}></View>

  {recipes.map((item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card1}
      onPress={() =>
        navigation.navigate('RecipeDetailsScreen', { recipe: item })
      }
    >
      <Image source={{ uri: item.img }} style={styles.image} />
      <View style={styles.card1time}>
        <Text style={styles.card1timetext}>{item.time}</Text>
      </View>
      <Text style={styles.cardtext}>{item.title}</Text>
    </TouchableOpacity>
  ))}
      </View>
    </ScrollView>
    )}
  options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RecipeDetailsScreen" 
          component={RecipeDetailsScreen} 
          options={{
          headerTitle: () => <Header name = "Log Weight"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#6EB7F7',
          },
          headerShown: false
        }}
        />
        </Stack.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: "center",
      marginTop:20,
  },
  card1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .5,
    shadowRadius: 5,
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
  card1time: {
    position: 'absolute', // Make this absolute positioned.
    top: 0, // Position at the top.
    left: 0, // Position at the left.
    backgroundColor: '#6EB7F7', // Set the background color to blue.
    paddingHorizontal: 2, // Add some padding horizontally.
    paddingVertical: 2, // Add some padding vertically.
    borderTopLeftRadius: 20, // Add a border radius to the top-left corner.
    borderBottomRightRadius: 20, // Add a border radius to the bottom-right corner.
  },
  card1timetext: {
    fontFamily: "Helvetica",
        fontSize: 16,
        color: "#FFF",
        margin: 10,
        alignItems: "center",
        alignSelf: "center",
        textAlign: "center",
        fontWeight: 'bold'
  },
  newcontainer:{
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
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
    fontFamily: 'Helvetica',
    textAlignVertical: 'center',
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
      fontFamily: "Avenir",
      fontSize: 61,
      color: "#D5342B",
      marginTop: 10,
      fontWeight: 'bold',
    },
    HealthifyUserName:{
      fontFamily: "AvenirNext-Heavy",
      fontSize: 61,
      color: "#D5342B",
      fontWeight: 'bold',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: .1,
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
      marginBottom:20, alignItems:"center",
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
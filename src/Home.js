import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Image, FlatList} from 'react-native'
import React, {useState, useEffect} from 'react'
import {firebase} from '../config'
import { Pedometer } from 'expo-sensors';
import { ScrollView } from 'react-native-gesture-handler'
import { RefreshControl } from 'react-native';
import Emoji from 'react-native-emoji';
import globalStyles from '../global-styles';
import RecipeDetailsScreen from '../components/RecipeDetailsScreen';
import Breakfast from './Breakfast';
import Lunch from './Lunch';
import Dinner from './Dinner'
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';

const Stack = createStackNavigator();

const Home = () => {
  // Set variables
  const [name, setName] = useState('')
  const [recipes, setRecipes] = useState([])

  // Use navigation
  const navigation = useNavigation();

  const getRecipeDetails = async (recipeId) => {
    const recipeSnapshot = await firestore()
      .collection('recipes')
      .doc(recipeId)
      .get();
  
    const recipeData = recipeSnapshot.data();
  
    return recipeData;
  };
  
// Get username from firestore user database and set name
  useEffect(() => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data())
        } else {
          console.log('User does not exist')
        }
      })
// Get recipes from recipes database
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
          name="Home" 
          component={() => (
    <ScrollView style={{ backgroundColor: '#FFF' }}>
      <View style={{ marginTop: 20 }}></View>
      <View style={globalStyles.container}>
        <Text style={[globalStyles.Headline5, {margin: 0, marginTop: 10}]}>Welcome back,</Text>
        <Text style={globalStyles.Headline4Bold}>{name.firstName} <Emoji name="heart" /></Text>
        <Text style={globalStyles.Headline6}>Are you ready to <Text style={{ fontFamily: 'Gotham-Bold' }}>take control</Text>{"\n"}of <Text style={{ fontFamily: 'Gotham-Bold' }}>your</Text> wellness journey?</Text>
      </View>
      <ScrollView style={{padding: 20}}horizontal={true}>

            <TouchableOpacity 
            style = {styles.card2}
            onPress={() => navigation.navigate('Breakfast')}
            >
              <Image
                source = {require('../assets/Smoothie-Bowls-3-ways-10.jpeg')}
                style={styles.image2}
              />
              <Text style={styles.card2text}>Breakfast 🥞</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style = {styles.card2}
            onPress={() => navigation.navigate('Lunch')}
            >  
            <Image
                source = {require('../assets/veggie-wrap-recipe.jpeg')}
                style={styles.image2}
              />
              <Text style={styles.card2text}>Lunch 🌯</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style = {styles.card2}
            onPress={() => navigation.navigate('Dinner')}
            >
              <Image
                source = {require('../assets/Ham-Cheese-Stuffed-Chicken-Breasts.jpeg')}
                style={styles.image2}
              />
              <Text style={styles.card2text}>Dinner 🍗</Text>
            </TouchableOpacity>

            <View style={{ marginRight: 20 }}></View>

      </ScrollView>
      <Text style={[globalStyles.Headline5Bold, { marginLeft: 30 }]}>New Recipes</Text>
      <View style={globalStyles.container}>
        <View style={{ marginTop: 20 }}></View>
{/* Output recipes in reverse to show newest ones first */}
  {recipes.reverse().map((item) => (
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
      <Text style={[styles.cardtext, item.title.length <= 25 ? styles.cardtextLarge : null]}>
      {item.title}
    </Text>
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
          headerTitle: () => <Header name = "Recipe Details"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
          },
          headerShown: false
        }}
        />
        <Stack.Screen 
          name="Breakfast" 
          component={Breakfast} 
          options={{
          headerTitle: () => <Header name = "Breakfast"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
          },
          headerShown: false
        }}
        />
        <Stack.Screen 
          name="Lunch" 
          component={Lunch} 
          options={{
          headerTitle: () => <Header name = "Lunch"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
          },
          headerShown: false
        }}
        />
        <Stack.Screen 
          name="Dinner" 
          component={Dinner} 
          options={{
          headerTitle: () => <Header name = "Dinner"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
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
  cardtextLarge: {
    fontSize: 26,
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
    borderRadius: 20,
    cloud: "#0000",
    padding: 10,
    marginBottom: 35,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  card1time: {
    position: 'absolute', // Make this absolute positioned.
    top: 0, // Position at the top.
    left: 0, // Position at the left.
    backgroundColor: '#0072C6', // Set the background color to blue.
    paddingHorizontal: 2, // Add some padding horizontally.
    paddingVertical: 2, // Add some padding vertically.
    borderTopLeftRadius: 20, // Add a border radius to the top-left corner.
    borderBottomRightRadius: 20, // Add a border radius to the bottom-right corner.
  },
  card1timetext: {
    fontFamily: "Gotham-Bold",
        fontSize: 16,
        color: "#FFF",
        margin: 10,
        alignItems: "center",
        alignSelf: "center",
        textAlign: "center",
  },
  card2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .5,
    shadowRadius: 3,
    elevation: 25,
    width: 155,
    height: 173,
    padding: 40,
    backgroundColor: '#33A133',
    alignItems: 'center',
    borderRadius: 30,
    cloud: "#0000",
    padding: 10,
    marginBottom: 0,
    justifyContent: 'center',
    position: 'relative',
    marginRight: 20
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
  image2: {
    position: 'absolute',
    overflow: "hidden",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 155,
    height: 127.15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 2,
    borderColor: 'green',
  },
  cardtext: {
    position: 'relative',
    color: "#000000",
    top: 67,
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Gotham-Bold',
    justifyContent: 'center'
  },
  card2text: {
    position: 'absolute',
    color: "#FFF",
    bottom: 11,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Gotham-Bold',
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
      fontFamily: "Gotham-Bold",
      fontSize: 34,
      color: '#fff'
    },
    Headline4:{
      fontFamily: "Gotham-Light",
      fontSize: 34,
      color: "#000",
      margin: 10,
      alignItems: "center"
    },
    Button2:{
      marginBottom:20, alignItems:"center",
    },
    Headline2Black:{
      fontFamily: "Gotham-Black",
      fontSize: 61,
      color: "#000",
      margin: 10,
    },
    Button2Text:{
      fontSize: 16,
      textDecorationLine: "underline",
      fontFamily: "Gotham-Bold"
    },
    Date:{
      fontFamily: "Gotham-Bold",
      fontSize: 24,
      color: "#000",
      fontStyle: 'italic',
    }
})
// Import necessary components and modules
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from 'react';
import {firebase} from './config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import globalStyles from './global-styles'

// Import screens
import Login from "./src/Login";
import Register from "./src/Register"
import Signin from "./src/Signin";
import Onboarding1 from "./src/Onboarding1";
import Onboarding2 from "./src/Onboarding2";
import Onboarding3 from "./src/Onboarding3";
import Onboarding4 from "./src/Onboarding4";
import Onboarding5 from "./src/Onboarding5";
import Home from "./src/Home";
import Header from "./components/Header";
import Health from "./src/Health";
import Resources from "./src/Resources";
import PersonalInfo from "./src/PersonalInfo";
import { Button } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LogWeight from "./src/LogWeight";
import LogHealth from "./src/LogHealth";
import * as Font from 'expo-font';

const Stack = createStackNavigator();

// App function
function App(){
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [isFontLoaded, setIsFontLoaded] = useState(false)

  // Load necessary fonts
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Gotham-Black': require('./assets/fonts/Gotham-Black.otf'),
        'Gotham-Bold': require('./assets/fonts/Gotham-Bold.otf'),
        'Gotham-Light': require('./assets/fonts/Gotham-Light.otf'),
        'Gotham-Medium': require('./assets/fonts/GothamMedium.ttf')
      });
      setIsFontLoaded(true)
    }

    loadFonts();
  }, [])

  // Handle user state changes
  function onAuthStateChanged(user){
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // Detect state
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!isFontLoaded) {
    return null // Return a blank screen or a loading spinner while the font is loading
  }

  // If user is not logged in, show only login, onboarding and signup pages 
  if (!user){
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          
          options={{ 
            headerShown: false 
          }}

          />
        <Stack.Screen 
          name="Signin" 
          component={Signin} 
          
          options={{ 
            headerShown: false 
          }}

          />
          <Stack.Screen 
          name = "Onboarding1" 
          component = {Onboarding1}

          options={{ 
            headerShown: false 
          }}
          />
          <Stack.Screen 
          name = "Onboarding2" 
          component = {Onboarding2}

          options={{ 
            headerShown: false 
          }}
          />
          <Stack.Screen 
          name = "Onboarding3" 
          component = {Onboarding3}

          options={{ 
            headerShown: false 
          }}
          />
          <Stack.Screen 
          name = "Onboarding4" 
          component = {Onboarding4}

          options={{ 
            headerShown: false 
          }}
          />
          <Stack.Screen 
          name = "Onboarding5" 
          component = {Onboarding5}

          options={{ 
            headerShown: false 
          }}
          />
        <Stack.Screen 
          name = "Register" 
          component = {Register}

          options={{ 
            headerShown: false 
          }}
          />
      </Stack.Navigator>
    );
  }

  // Define names for screens
  const homeName = 'Home';
  const healthName = 'Health';
  const infoName = 'Resources';
  const profileName = 'Account'
  const stackContainer = ' ';

  const Tab = createBottomTabNavigator();

  <Stack.Screen name="LogWeight" component={LogWeight} />

  // When user is signed in
  return (
    <Tab.Navigator
    initialRouteName={homeName}
    screenOptions={({route}) => ({
      // Define bottom tabs
        tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if(rn === homeName) {
                iconName = focused ? 'home' : 'home-outline'
            } else if (rn === healthName) {
                iconName = focused ? 'heart' : 'heart-outline'
            } else if (rn === infoName) {
                iconName = focused ? 'information' : 'information-circle-outline'
            } else if (rn == profileName){
              iconName = focused ? 'person' : 'person-outline'
            }

            return <Ionicons name={iconName} size={size} color={color}/>
        },
    })}
    tabBarOptions={{
        activeTintColor: '#0072C6',
        inactiveTintColor: 'grey',
        tabBarVisible: false,
        // height: 80,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        labelStyle: { fontFamily: 'Gotham-Light',
        fontSize: 14,
        color: '#000000',
        }
    }}

    >
    <Tab.Screen 
    name={homeName} 
    component={Home} 
    options={{
          headerTitle: () => <Header name = "Home 😋"/>,
          headerStyle: {
            height:110,
            backgroundColor: "#0072C6",
            shadowColor: '#000',
            shadowRadius: 5,
            elevation: 25
          }
        }}
    />
    <Tab.Screen name={healthName} component={Health} options={{
          headerTitle: () => <Header name = "My Health ❤️"/>,
          headerStyle: {
            height:110,
            backgroundColor: "#0072C6",
            shadowColor: '#000',
            shadowRadius: 5,
            elevation: 25
          }
        }}/>
    <Tab.Screen name={infoName} component={Resources} options={{
          headerTitle: () => <Header name = "Resources 📝"/>,
          headerStyle: {
            height:110,
            backgroundColor: "#0072C6",
            shadowColor: '#000',
            shadowRadius: 5,
            elevation: 25
          }
        }}/>
    <Tab.Screen name={profileName} component={PersonalInfo}  options={{
          headerTitle: () => <Header name = "Account 🤗"/>,
          headerStyle: {
            height:110,
            backgroundColor: "#0072C6",
            shadowColor: '#000',
            shadowRadius: 5,
            elevation: 25
          }
        }}/>
    </Tab.Navigator>

  )
  
}

export default () => {
  return(
    <NavigationContainer>
        <App/>
    </NavigationContainer>
    
  )
}

// Styles
const styles = StyleSheet.create({
  profileBtn:{
    width: 20,
    height: 20,
    borderRadius: 73,
    elevation: 3,
    backgroundColor: '#D5342B',
    margin: 10,
    borderWidth: 1,
    borderColor: "black"
  }}
)
import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import { WatchConnectivity } from 'react-native-watch-connectivity';

//Screens
import HomeScreen from './Home'
import HealthScreen from './Health'
import InfoScreen from './Resources'

//scree names
const homeName = 'Home';
const healthName = 'Health';
const infoName = 'Info';

const Tab = createBottomTabNavigator();


export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if(rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn === healthName) {
                        iconName = focused ? 'heart' : 'heart-outline'
                    } else if (rn === infoName) {
                        iconName = focused ? 'information' : 'information-circle-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            
            tabBarOptions={{
                activeTintColor: '#D5342B',
                inactiveTintColor: 'grey',
                labelStyle: { fontSize: 15}
            }}

            >

            <Tab.Screen 
            name={homeName} 
            component={Home} 
            options={{headerShown: false,}}
            />
            <Tab.Screen name={healthName} component={HealthScreen} options={{headerShown: false,}}/>
            <Tab.Screen name={infoName} component={InfoScreen} options={{headerShown: false,}}/>

            </Tab.Navigator>
        </NavigationContainer>
    )
}
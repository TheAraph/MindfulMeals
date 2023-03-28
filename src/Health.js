import { StatusBar } from 'expo-status-bar';
import Header from "../components/Header";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import Weight from "../src/Weight";
import FoodDrink from "../src/FoodDrink";
import Sleep from "../src/Sleep";
import LogWeight from "../src/LogWeight";
import LogHealth from "../src/LogHealth";
import LogFood from "../src/LogFood"
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../global-styles'
import { useState, useEffect } from 'react';
import Emoji from 'react-native-emoji';
import firebase from 'firebase/compat';
import { BarChart } from 'react-native-chart-kit';
import { CircularProgress } from 'react-native-circular-progress';
import LottieView from 'lottie-react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const Stack = createStackNavigator();

const Health = () => {
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [totalCalories, setTotalCalories] = useState(0);
  const [remainingCalories, setRemainingCalories] = useState(0);
  const [caloriePoints, setCaloriePoints] = useState('')
  const [weight, setWeight] = useState([]);
  const [isRemainingCaloriesZero, setIsRemainingCaloriesZero] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data().name);
        setTotalCalories(snapshot.data().dailyCalories);
        setRemainingCalories(snapshot.data().remainingCalories);
        setCaloriePoints(snapshot.data().caloriePoints);
        setWeight(snapshot.data().weight)
        setIsRemainingCaloriesZero(snapshot.data().remainingCalories === 0);
      }
      else{
        console.log('User does not exist')
      }
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const userData = snapshot.data();
          setName(userData.name); 
          setTotalCalories(userData.dailyCalories);
          setRemainingCalories(userData.remainingCalories);
          setWeight(userData.weight);
          setCaloriePoints(userData.caloriePoints);
        } else {
          console.log('User does not exist');
        }
      });
  }, []);

  useEffect(() => {
    const resetRemainingCalories = () => {
      const date = new Date();
      if (date.getHours() === 0 && date.getMinutes() === 0) {
        setRemainingCalories(totalCalories);
      }
    };
    const interval = setInterval(resetRemainingCalories, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [totalCalories]);
  
  const addWeight = () => {
    navigation.navigate('LogWeight');
  }

  const addFood = () => {
    navigation.navigate('LogFood');
  }

  const lastThreeEntries = weight.length > 2 ? weight.slice(-3) : weight;
  const remainingCaloriesPercentage = (remainingCalories / totalCalories) * 100;

  if (weight.length === 0 || weight[0] === 0) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Health"
          component={() => (
            <View style={globalStyles.container}>
            <Text style={globalStyles.Headline2Black}>Oops! <Emoji name = "smiley"></Emoji></Text>
            <Text style={globalStyles.Headline5Bold}>It seems that you have{"\n"}chosen to not track your{"\n"}calories and health data</Text>
            <TouchableOpacity 
            style={globalStyles.Button}
            onPress={() => navigation.navigate('LogHealth')}
              >
            <Text style={styles.ButtonText}>Start Tracking</Text>
            </TouchableOpacity>
            </View>
  )}
  options={{ headerShown: false }}
/>
<Stack.Screen 
          name="LogHealth" 
          component={LogHealth} 
          options={{
          headerTitle: () => <Header name = "Log Health"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#6EB7F7',
          }
        }}
        />
        </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="Health" 
          component={() => (
      <ScrollView style = {{backgroundColor: '#FFF'}}> 
    <View style = {{marginTop: 20}}></View>
        <View style={globalStyles.container}>
        <View style = {globalStyles.container}>

      {isRemainingCaloriesZero && (
          <ConfettiCannon
            count={200}
            origin={{ x: -670, y: -1000 }} // set origin to top of screen
            explosionSpeed={1000}
            spread={1000}
            fadeOut
            fadeOutDelay={3000}
            style={{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9999, // set a higher value than other components
  }}
          />
          )}
          {isRemainingCaloriesZero && (
  <ConfettiCannon
    count={200}
    origin={{ x: 670, y: -1000 }} // set origin to right of screen
    explosionSpeed={1000}
    spread={1000}
    fadeOut
    fadeOutDelay={3000}
    style={{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9999, // set a higher value than other components
  }}
  />
)}
          <Text style={globalStyles.Headline6Bold}>Finish your Daily Calories and get</Text>
          <Text style={[globalStyles.Headline5Bold, {marginTop: 0}]}>100 CALORIE POINTS 🎉</Text>
          <View style = {{marginTop: 20}}></View>
          <View style = {[globalStyles.newcontainer, { backgroundColor: '#7C9A3E' }]}>
          <Text style={[globalStyles.Headline5Bold, {color: '#FFF'}]}>Calorie Points: {caloriePoints}</Text>
          </View>
          <View style = {{marginTop: 20}}></View>
          {remainingCalories === 0 && (
              <Text style={styles.Headline4Bold}>CONGRATS!{" "}<Emoji name="tada" style={{ fontSize: 24 }} /></Text>
            )}
          {remainingCalories === 0 && (
              <Text style={styles.Headline5Bold}>You hit your calorie goal!</Text>
            )}
          <Text style={globalStyles.Headline2Black}>Calories</Text>
          <View style={styles.progressBar}>
      <CircularProgress
        size={200}
        width={8}
        fill={remainingCaloriesPercentage}
        tintColor="#6EB7F7"
        backgroundColor="#e3e3e3"
        rotation={0}
        lineCap="round"
        arcSweepAngle={360}
        arcRadius={50}
        >
          {() => (
            <View style={styles.progressText}>
            <Text style={[globalStyles.Headline2Black, {marginTop: 0, fontSize: 48}]}>
            {remainingCalories}
            </Text>
            <Text style={[globalStyles.Headline5Bold, {marginTop: 0}]}>
            Remaining
            </Text>
            </View>
            )}
      </CircularProgress>
      </View>
    </View>
    <TouchableOpacity style={globalStyles.Button2} onPress={addFood}><Text style = {globalStyles.Button2Text}>Update</Text></TouchableOpacity>
    <Text style={globalStyles.Headline2Black}>Weight</Text>
          <View style = {globalStyles.newcontainer}>
          <View style = {{marginTop:20}}></View>
          <BarChart
  data={{
    labels: lastThreeEntries.map((item, index) => `Entry ${weight.length - 2 + index}`),
    datasets: [
      {
        data: lastThreeEntries,
        color: () => '#007AFF',
      },
    ],
  }}
  width={343}
  height={237}
  chartConfig={{
    fromZero: true,
    height: 5000,
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    color: (opacity = 1) => `#6EB7F7`,
    barPercentage: 0.7,
    fillShadowGradient: `#6EB7F7`,
    fillShadowGradientOpacity: 1,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
    xAxisLabel: 'Entry',

    style: {
      borderRadius: 16,
      fontFamily: "Helvetica",
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: "#e3e3e3",
      strokeDasharray: "0",
    },
    propsForLabels: {
      fontFamily: "Helvetica",
    },
  }}
  style={{ marginVertical: 8, borderRadius: 16 }}
  showValuesOnTopOfBars={true}
  verticalLabelRotation={0}
    />
    </View>
      
        <View style = {{marginTop:20, justifyContent: 'center', alignSelf: 'center'}}><Text style={globalStyles.Headline5}>You're on the right track!</Text></View>
        <View style = {{justifyContent: 'center', alignSelf: 'center'}}><Text style={globalStyles.Headline5}>Just keep pushing <Emoji name = "fire"></Emoji></Text></View>
        <View style = {{marginTop:20}}></View>
        <TouchableOpacity style={globalStyles.Button2} onPress={addWeight}><Text style = {globalStyles.Button2Text}>New Weight Entry</Text></TouchableOpacity>
      </View>
    </ScrollView> 
  )}
  options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="LogFood" 
          component={LogFood} 
          options={{
          headerTitle: () => <Header name = "Log Food"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#6EB7F7',
          }
        }}
        />
        <Stack.Screen 
          name="LogWeight" 
          component={LogWeight} 
          options={{
          headerTitle: () => <Header name = "Log Weight"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#6EB7F7',
          }
        }}
        />
        <Stack.Screen 
          name="LogHealth" 
          component={LogHealth} 
          options={{
          headerTitle: () => <Header name = "Log Health"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#6EB7F7',
          }
        }}
        />
        </Stack.Navigator>
  )
      }


export default Health

const styles = StyleSheet.create({
  progressBar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    padding: 20,
    borderRadius: 20,
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      borderWidth: 2,
      borderColor: 'black',
  },
  progressText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  progressLabel: {
    fontSize: 16,
    color: '#9B9B9B',
  },
  Headline5Bold:{
    fontFamily: "Arial",
    fontSize: 24,
    color: "#D5342B",
    margin: 10,
    alignItems: "center",
    fontWeight: 'bold'
  },
  Headline4Bold:{
    fontFamily: "Helvetica",
    fontSize: 34,
    color: "#D5342B",
    margin: 10,
    alignItems: "center",
    fontWeight: 'bold'
  },
  ButtonText:{
    fontFamily: "Helvetica",
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
})
import { StatusBar } from 'expo-status-bar';
import Header from "../components/Header";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import LogWeight from "../src/LogWeight";
import LogHealth from "../src/LogHealth";
import LogFood from "../src/LogFood"
import RewardsDiary from './RewardsDiary';
import SelfMonitoringDiary from './SelfMonitoringDiary';
import TailoringDiary from './TailoringDiary';
import MotivationDiary from './MotivationDiary';
import PraiseDiary from './PraiseDiary';
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
import { Video } from 'expo-av';

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
  const [rewardsDiary, setRewardsDiary] = useState([])

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data().name);
        setRewardsDiary(snapshot.data().rewardsDiary);
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
          setRewardsDiary(snapshot.data().rewardsDiary);
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
    const checkAndUpdateRemainingCalories = async () => {
      const userDoc = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
    
      const userSnapshot = await userDoc.get();
      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        const lastUpdated = new Date(userData.lastUpdated);
        const currentDate = new Date();
    
        // Extract only the date part from the lastUpdated and currentDate
        const lastUpdatedDate = new Date(lastUpdated.getFullYear(), lastUpdated.getMonth(), lastUpdated.getDate());
        const currentDateDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    
        if (currentDateDate.getTime() > lastUpdatedDate.getTime()) { // check if the lastUpdated date is before the current date
          await userDoc.update({
            remainingCalories: userData.dailyCalories,
            lastUpdated: currentDate.toISOString(), // update lastUpdated date to current date
          });
          setRemainingCalories(userData.dailyCalories); // update remainingCalories state
        }
      }
    };
  
    checkAndUpdateRemainingCalories();
  }, []);

  
  const addWeight = () => {
    navigation.navigate('LogWeight');
  }

  const addFood = () => {
    navigation.navigate('LogFood');
  }
  
  const checkLastDiaryEntryTime = () => {
    if (rewardsDiary?.length > 0) {
      const lastEntry = rewardsDiary[rewardsDiary.length - 1]; // assuming the last entry is at the end of the array
      const lastDiaryEntryTime = new Date(lastEntry.timeofdiary);
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - lastDiaryEntryTime.getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // convert time difference to days
      return daysDifference >= 3;
    } else {
      // Return true or false based on your desired behavior when rewardsDiary is not available
      return true; // or return true, or any other default value
    }
  };

  const lastThreeEntries = weight.length > 2 ? weight.slice(-3) : weight;
  const remainingCaloriesPercentage = (remainingCalories / totalCalories) * 100;

  if (weight.length === 0 || weight[0] === 0) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Health"
          component={() => (
          <ScrollView style = {{backgroundColor: "#FFF"}}>
            <View style={globalStyles.container}>
            <Text style={globalStyles.Headline2Black}>Oops! 😄</Text>
            <Text style={[globalStyles.Headline5Bold, {textAlign: 'center'}]}>It seems that you have{"\n"}not chosen to track your{"\n"}calories and health data yet</Text>
            <Text style={[globalStyles.Headline5, {textAlign: 'center'}]}>To start tracking, tap the button below & enter your details!</Text>
            <View style = {{marginTop:40}}></View>
            <Text style={[globalStyles.Headline6, {textAlign: 'center'}]}>Note: You<Text style={{ fontWeight: 'bold' }}> don't</Text> have to track your health{"\n"}data if you don't want to <Emoji name = "wink"></Emoji></Text>
            <TouchableOpacity 
            style={[globalStyles.Button, {backgroundColor: "#FF4D4D", borderWidth: 2, borderColor: "#000", marginTop:30}]}
            onPress={() => navigation.navigate('TailoringDiary')}
              >
            <Text style={styles.ButtonText}>👉 Tap Me! 👈</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={globalStyles.Button}
            onPress={() => navigation.navigate('LogHealth')}
              >
            <Text style={styles.ButtonText}>Start Tracking</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
  )}
  options={{ headerShown: false }}
/>
<Stack.Screen 
          name="LogHealth" 
          component={LogHealth} 
          options={{
            headerShown: false,
          headerTitle: () => <Header name = "Log Health"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
          }
        }}
        />
        <Stack.Screen 
          name="TailoringDiary" 
          component={TailoringDiary} 
          options={{
            headerShown: false,
          headerTitle: () => <Header name = "Tailoring Diary"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
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
            <View style = {{marginTop: 0}}></View>
        <View style = {globalStyles.container}>

      {isRemainingCaloriesZero && (
          <ConfettiCannon
            count={200}
            origin={{ x: -670, y: -1000 }} // set origin to top of screen
            explosionSpeed={1000}
            spread={1000}
            fadeOut
            fadeOutDelay={3000}
            colors={[
              '#0072C6', // blue
              '#33A133', // green
              '#A040A0', // purple
              '#7F7F7F', // gray
              '#FF4D4D', // red
            ]}
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
    colors={[
    '#0072C6', // blue
    '#33A133', // green
    '#A040A0', // purple
    '#7F7F7F', // gray
    '#FF4D4D', // red
  ]}
    style={{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9999, // set a higher value than other components
  }}
  />
)}
<View style = {{marginTop: 10}}></View>
          <Text style={globalStyles.Headline6Bold}>Finish your Daily Calories and get</Text>
          <Text style={[globalStyles.Headline5Bold, {marginTop: 0}]}>100 CALORIE POINTS 🥇</Text>
          <View style = {[globalStyles.newcontainer, { backgroundColor: '#33A133' }]}>
          <Text style={[globalStyles.Headline5Bold, {color: '#FFF'}]}>Calorie Points: {caloriePoints}</Text>
          </View>
          {checkLastDiaryEntryTime() && (
              <TouchableOpacity 
              style={[globalStyles.Button, {backgroundColor: "#FF4D4D", borderWidth: 2, borderColor: "#000", marginTop:30}]}
              onPress={() => navigation.navigate('RewardsDiary')}>
                <Text style={globalStyles.ButtonText}>👉 Tap Me! 👈</Text>
              </TouchableOpacity>
            )}
          <View style = {{marginTop: 10}}></View>
          {remainingCalories === 0 && (
              <Text style={[globalStyles.Headline3Bold, {color: "#FF4D4D"}]}>CONGRATS!{" "}<Emoji name="tada"/></Text>
            )}
          {remainingCalories === 0 && (
              <Text style={[globalStyles.Headline5Bold, {color: "#FF4D4D"}]}>You hit your calorie goal!</Text>
            )}
            {remainingCalories === 0 && (
              <TouchableOpacity 
            style={[globalStyles.Button, {backgroundColor: "#FF4D4D", borderWidth: 2, borderColor: "#000", marginTop:30}]}
            onPress={() => navigation.navigate('PraiseDiary')}
              >
            <Text style={styles.ButtonText}>👉 Tap Me! 👈</Text>
            </TouchableOpacity>
            )}
          <Text style={[globalStyles.Headline2Black, {marginTop:0}]}>Calories 🔥</Text>
          {remainingCalories === totalCalories && (
              <Text style={[globalStyles.Headline6, {color: "#000", textAlign: 'center'}]}><Text style = {[globalStyles.Headline5Bold, {color: "#FF4D4D"}]}>Start your day off well! 🍳</Text></Text>
            )}
        {(remainingCalories > totalCalories * 0.75 && remainingCalories < totalCalories - 0.01) && (
              <Text style={[globalStyles.Headline5Bold, {color: "#FF4D4D", textAlign: 'center'}]}>You're doing great 😄{'\n'}<Text style = {[globalStyles.Headline3Bold, {color: "#FF4D4D"}]}>Keep it up!</Text></Text>
            )}
            {(remainingCalories > totalCalories * 0.51 && remainingCalories < totalCalories * 0.74) && (
              <Text style={[globalStyles.Headline5Bold, {color: "#FF4D4D", textAlign: 'center'}]}>You're making progress 💪{'\n'}<Text style = {[globalStyles.Headline3Bold, {color: "#FF4D4D"}]}>Well done!</Text></Text>
            )}
            {(remainingCalories > totalCalories * 0.26 && remainingCalories < totalCalories * 0.50) && (
              <Text style={[globalStyles.Headline5Bold, {color: "#FF4D4D", textAlign: 'center'}]}>You're over half way there 🤩{'\n'}<Text style = {[globalStyles.Headline4Bold, {color: "#FF4D4D"}]}>That's Amazing!</Text></Text>
            )}
            {(remainingCalories > 0 && remainingCalories < totalCalories * 0.25) && (
              <Text style={[globalStyles.Headline5Bold, {color: "#FF4D4D", textAlign: 'center'}]}>You are so close, just a{'\n'}few more to go 👏{'\n'}<Text style = {[globalStyles.Headline4Bold, {color: "#FF4D4D"}]}>You can do this!</Text></Text>
            )}
            {(remainingCalories > 0 && remainingCalories < totalCalories * 0.25) && (
              <TouchableOpacity 
            style={[globalStyles.Button, {backgroundColor: "#FF4D4D", borderWidth: 2, borderColor: "#000", marginTop:30}]}
            onPress={() => navigation.navigate('MotivationDiary')}
              >
            <Text style={styles.ButtonText}>👉 Tap Me! 👈</Text>
            </TouchableOpacity>
            )}
          <View style={styles.progressBar}>
      <CircularProgress
        size={200}
        width={8}
        fill={remainingCaloriesPercentage}
        tintColor="#0072C6"
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
      <View style = {{marginTop: 20}}></View>
      <TouchableOpacity style={globalStyles.Button2} onPress={addFood}><Text style = {[globalStyles.Button2Text, {color: "#33A133", marginBottom: 0}]}>Update</Text></TouchableOpacity>
      <View style = {{marginTop: -20}}></View>
      </View>
    </View>
    <Text style={globalStyles.Headline2Black}>Weight 💪</Text>
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
    color: (opacity = 1) => `#0072C6`,
    barPercentage: 1,
    fillShadowGradient: `#0072C6`,
    fillShadowGradientOpacity: 1,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
    xAxisLabel: 'Entry',

    style: {
      borderRadius: 16,
      fontFamily: "Gotham-Light",
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
    <TouchableOpacity style={globalStyles.Button2} onPress={addWeight}><Text style = {[globalStyles.Button2Text, {color: "#33A133"}]}>New Weight Entry</Text></TouchableOpacity>
        
    </View>
      
        <View style = {{marginTop:20, justifyContent: 'center', alignSelf: 'center'}}><Text style={globalStyles.Headline5}>You're on the right track!</Text></View>
        <View style = {{justifyContent: 'center', alignSelf: 'center'}}><Text style={globalStyles.Headline5}>Just <Text style = {globalStyles.Headline5Bold}>keep pushing</Text> <Emoji name = "fire"></Emoji></Text></View>
        <TouchableOpacity 
            style={[globalStyles.Button, {backgroundColor: "#FF4D4D", borderWidth: 2, borderColor: "#000", marginTop:30}]}
            onPress={() => navigation.navigate('SelfMonitoringDiary')}
              >
            <Text style={styles.ButtonText}>👉 Tap Me! 👈</Text>
            </TouchableOpacity>
        <TouchableOpacity 
            style={globalStyles.Button}
            onPress={() => navigation.navigate('LogHealth')}
              >
            <Text style={styles.ButtonText}>Change Goals</Text>
            </TouchableOpacity>
      </View>
    </ScrollView> 
  )}
  options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="LogFood" 
          component={LogFood} 
          options={{
            headerShown: false ,
          headerTitle: () => <Header name = "Log Food"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
          }
        }}
        />
        <Stack.Screen 
          name="RewardsDiary" 
          component={RewardsDiary} 
          options={{
            headerShown: false ,
          headerTitle: () => <Header name = "Rewards Diary"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
          }
        }}
        />
        <Stack.Screen 
          name="MotivationDiary" 
          component={MotivationDiary} 
          options={{
            headerShown: false ,
          headerTitle: () => <Header name = "Motivation Diary"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
          }
        }}
        />
        <Stack.Screen 
          name="PraiseDiary" 
          component={PraiseDiary} 
          options={{
            headerShown: false ,
          headerTitle: () => <Header name = "Praise Diary"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
          }
        }}
        />
        <Stack.Screen 
          name="SelfMonitoringDiary" 
          component={SelfMonitoringDiary} 
          options={{
            headerShown: false ,
          headerTitle: () => <Header name = "Self-Monitoring Diary"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
          }
        }}
        />
        <Stack.Screen 
          name="LogWeight" 
          component={LogWeight} 
          options={{
            headerShown: false ,
          headerTitle: () => <Header name = "Log Weight"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
          }
        }}
        />
        <Stack.Screen 
          name="LogHealth" 
          component={LogHealth} 
          options={{
            headerShown: false ,
          headerTitle: () => <Header name = "Log Health"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#0072C6',
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
    color: '#000',
  },
  progressLabel: {
    fontSize: 16,
    color: '#9B9B9B',
  },
  Headline5Bold:{
    fontFamily: "Gotham-Bold",
    fontSize: 24,
    color: "#FF4D4D",
    margin: 10,
    alignItems: "center",
  },
  Headline4Bold:{
    fontFamily: "Gotham-Bold",
    fontSize: 34,
    color: "#FF4D4D",
    margin: 10,
    alignItems: "center",
  },
  ButtonText:{
    fontFamily: "Gotham-Bold",
    fontSize: 24,
    color: '#fff',
  },
})
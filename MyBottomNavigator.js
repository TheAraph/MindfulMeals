import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Health from './src/Health';
import Home from './src/Home';
import Resources from './src/Resources';

const Tab = createBottomTabNavigator();

function MyBottomNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Health" component={Health} />
      <Tab.Screen name="Resources" component={Resources} />
    </Tab.Navigator>
  );
}

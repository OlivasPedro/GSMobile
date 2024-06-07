import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import SustainabilityTipsScreen from './screens/Sustainability';
import OceanCollectionPointsScreen from './screens/OceanCollection';
import PollutionReportScreen from './screens/PollutionReport';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sustainability" component={SustainabilityTipsScreen} />
        <Stack.Screen name="CollectionPoints" component={OceanCollectionPointsScreen} />
        <Stack.Screen name="Report" component={PollutionReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

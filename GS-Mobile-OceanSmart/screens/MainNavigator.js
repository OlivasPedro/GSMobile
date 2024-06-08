import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import SustainabilityTipsScreen from './Sustainability';
import OceanCollectionPointsScreen from './OceanCollection';
import PollutionReportScreen from './PollutionReport';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sustentabilidade" component={SustainabilityTipsScreen} />
        <Stack.Screen name="Pontos de Coleta" component={OceanCollectionPointsScreen} />
        <Stack.Screen name="Denúncia" component={PollutionReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LocationTracker from './components/Location';
import ForeGroundTracking from './components/ForeGroundTracking';

export default function App() {
  return (
    <View style={styles.container}>
      <ForeGroundTracking />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useContext, useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ForeGroundTracking from "../components/ForeGroundTracking";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = (props) => {
  const { logout } = useContext(AuthContext);
  const state = useNavigationState(state => state);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={logout}
        style={{
          backgroundColor: state.index === 2 ? '#e0e0e0' : 'transparent',
        }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Trace" component={ForeGroundTracking} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require('../assets/favicon.png')} style={styles.logo} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="App" component={DrawerNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default AppNavigator;

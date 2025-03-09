import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const ForeGroundTracking = () => {
  const [status, setStatus] = useState("Not tracking");
  const [location, setLocation] = useState(null);
  let locationSubscription = null;

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  };

  const sendLocation = async (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });

    try {
      await axios.post("http://192.168.134.247:8080/api/delivery/update-location", {
        agentId: 1,
        latitude,
        longitude,
      });
      setStatus(`Location sent: ${latitude}, ${longitude}`);
      console.log("Location sent successfully!");
    } catch (error) {
      console.error("Error sending location:", error);
      setStatus("Error sending location");
    }
  };

  const startTracking = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setStatus("Permission denied");
      return;
    }

    setStatus("Tracking started...");
    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000, // Every 10 seconds
        distanceInterval: 10, // Every 10 meters
      },
      sendLocation
    );
  };

  const stopTracking = async () => {
    if (locationSubscription) {
      locationSubscription.remove();
      locationSubscription = null;
      setStatus("Tracking stopped");
    } else {
      setStatus("No active tracking");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{status}</Text>
      {location && (
        <Text>📍 Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
      )}
      <Button title="Start Tracking" onPress={startTracking} />
      <Button title="Stop Tracking" onPress={stopTracking} color="red" />
    </View>
  );
};

export default ForeGroundTracking;

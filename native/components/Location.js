import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import axios from "axios";

const LOCATION_TRACKING = "background-location-task";

// Define the background task
TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error("❌ Background location error:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];

    if (location) {
      console.log("📍 Background Location:", location.coords);

      // Send location to the backend
      try {
        await axios.post("http://192.168.134.247:8080/api/delivery/update-location", {
          agentId: 1,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        console.log("Location sent successfully!");
      } catch (error) {
        console.error("Error sending location:", error);
      }
    }
  }
});

const LocationTracker = () => {
  const [status, setStatus] = useState("Not tracking");
  
  const startTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setStatus("Permission denied");
      return;
    }

    const backgroundPermission = await Location.requestBackgroundPermissionsAsync();
    if (backgroundPermission.status !== "granted") {
      setStatus("Background permission denied");
      return;
    }

    const isTracking = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
    if (!isTracking) {
      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000, // Every 10 seconds
        distanceInterval: 10, // Every 10 meters
        foregroundService: {
          notificationTitle: "Live Tracking",
          notificationBody: "Tracking your location...",
        },
      });
      setStatus("Tracking started...");
    } else {
      setStatus("Already tracking!");
    }
  };

  const stopTracking = async () => {
    const isTracking = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
    if (isTracking) {
      await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
      setStatus("Tracking stopped");
    } else {
      setStatus("Tracking is not active");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{status}</Text>
      <Button title="Start Tracking" onPress={startTracking} />
      <Button title="Stop Tracking" onPress={stopTracking} color="red" />
    </View>
  );
};

export default LocationTracker;

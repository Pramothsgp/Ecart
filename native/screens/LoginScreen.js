import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={() => login(username, password)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 20 },
});

export default LoginScreen;

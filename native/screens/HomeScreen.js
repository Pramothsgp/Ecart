import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, ScrollView, Image, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("User:", user);

    axios
      .get(
        `http://localhost:8080/api/orders/get-agent-orders?agentId=${user.id}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  useEffect(() => {
    console.log("Updated Data:", data);
  }, [data]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {data?.orders?.length > 0 ? (
        data.orders.map((innerOrder) => (
          <View key={innerOrder.id} style={styles.orderContainer}>
            {innerOrder.product?.image && (
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${innerOrder.product.image}`,
                }}
                style={styles.productImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.orderDetails}>
              <Text style={styles.orderText}>Order ID: {innerOrder.id}</Text>
              <Text style={styles.orderText}>User: {innerOrder.user?.username || "N/A"}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noOrdersText}>No Orders Found</Text>
      )}

      <Button title="Logout" onPress={logout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "100%",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  orderText: {
    fontSize: 16,
    color: "#333",
  },
  noOrdersText: {
    fontSize: 18,
    color: "#999",
    marginTop: 20,
  },
});

export default HomeScreen;

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";

const Footer = () => {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => alert("Home Page")}
      >
        <AntDesign
          name="home"
          style={[styles.icon, route.name === "Home" && styles.active]}
        />
        <Text style={[styles.iconText, route.name === "Home" && styles.active]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => alert("Notification Page")}
      >
        <AntDesign
          name="bells"
          style={[styles.icon, route.name === "notification" && styles.active]}
        />
        <Text
          style={[
            styles.iconText,
            route.name === "notification" && styles.active,
          ]}
        >
          Notification
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => alert("Account Page")}
      >
        <AntDesign
          name="user"
          style={[styles.icon, route.name === "account" && styles.active]}
        />
        <Text
          style={[styles.iconText, route.name === "account" && styles.active]}
        >
          Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => alert("Cart Page")}
      >
        <AntDesign
          name="shoppingcart"
          style={[styles.icon, route.name === "cart" && styles.active]}
        />
        <Text style={[styles.iconText, route.name === "cart" && styles.active]}>
          Cart
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => alert("Logout Page")}
      >
        <AntDesign name="logout" style={styles.icon} />
        <Text style={styles.iconText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
    color: "#000000",
  },
  iconText: {
    fontSize: 10,
    color: "#000000",
  },
  active: {
    color: "blue",
  },
});
export default Footer;

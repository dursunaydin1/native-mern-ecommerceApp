import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useReduxStateHook } from "@/hooks/customHook";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/actions/userActions";

const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const loading = useReduxStateHook(navigation, (path = "login"));
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("home")}
      >
        <AntDesign
          name="home"
          style={[styles.icon, route.name === "home" && styles.active]}
        />
        <Text style={[styles.iconText, route.name === "home" && styles.active]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("notifications")}
      >
        <AntDesign
          name="bells"
          style={[styles.icon, route.name === "notifications" && styles.active]}
        />
        <Text
          style={[
            styles.iconText,
            route.name === "notifications" && styles.active,
          ]}
        >
          Notification
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("account")}
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
        onPress={() => navigation.navigate("cart")}
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
        onPress={() => {
          dispatch(logout());
        }}
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

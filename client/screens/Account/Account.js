import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { userData } from "../../data/userData";
import AntDesign from "react-native-vector-icons/AntDesign";

const Account = ({ navigation }) => {
  return (
    <Layout>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: userData.profilePic }} />
        <View style={{ alignItems: "flex-start", marginTop: 20 }}>
          <Text style={styles.name}>
            Hi <Text style={{ color: "green" }}>{userData.name}</Text> 👏
          </Text>
          <Text style={styles.text}>Email: {userData.email}</Text>
          <Text style={styles.text}>Contact: {userData.contact}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.heading}>Account Setting</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("profile", { id: userData._id })}
          >
            <AntDesign style={styles.icon} name="edit" />
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate("myorders", { id: userData._id })
            }
          >
            <AntDesign style={styles.icon} name="bars" />
            <Text style={styles.btnText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("notifications")}
          >
            <AntDesign style={styles.icon} name="bells" />
            <Text style={styles.btnText}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate("adminPanel", { id: userData._id })
            }
          >
            <AntDesign style={styles.icon} name="windows" />
            <Text style={styles.btnText}>Admin Panel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    marginTop: 5,
    fontSize: 16,
  },
  btnContainer: {
    width: "95%",
    padding: 10,
    backgroundColor: "#ffffff",
    marginVertical: 20,
    elevation: 5,
    borderRadius: 10,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 5,
  },
  icon: {
    fontSize: 15,
    marginRight: 10,
  },
  btnText: {
    fontSize: 15,
    marginLeft: 10,
  },
});

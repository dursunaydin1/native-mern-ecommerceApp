import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Layout from "../../components/Layout/Layout";
import AntDesign from "react-native-vector-icons/AntDesign";

const Dashboard = () => {
  return (
    <Layout>
      <View style={styles.main}>
        <Text style={styles.heading}>Dashboard</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}>
            <AntDesign style={styles.icon} name="edit" />
            <Text style={styles.btnText}>Manage Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <AntDesign style={styles.icon} name="edit" />
            <Text style={styles.btnText}>Manage Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <AntDesign style={styles.icon} name="user" />
            <Text style={styles.btnText}>Manage Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <AntDesign style={styles.icon} name="bars" />
            <Text style={styles.btnText}>Manage Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <AntDesign style={styles.icon} name="info" />
            <Text style={styles.btnText}>About App</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "lightgray",
    height: "96%",
  },
  heading: {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    padding: 20,
    fontSize: 20,
    margin: 10,
    borderRadius: 5,
    fontWeight: "bold",
  },
  btnContainer: {
    margin: 10,
  },
  btn: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  icon: {
    fontSize: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  btnText: {
    fontSize: 18,
  },
});

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import InputBox from "@/components/Form/InputBox";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // register function
  const handleRegister = () => {
    if (!email || !password || !name) {
      alert("Please enter your name, email, and password");
      return;
    }
    // Simulating registration success
    alert("Registration successful!");
    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/login.png")} style={styles.image} />
      <InputBox
        placeholder={"Enter Your Name"}
        value={name}
        autoComplete={"name"}
        setValue={setName}
      />
      <InputBox
        placeholder={"Enter Your Email"}
        autoComplete={"email"}
        value={email}
        setValue={setEmail}
      />
      <InputBox
        placeholder={"Enter Your Password"}
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />

      <View style={styles.loginBtnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
          <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>
        <Text>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("login")}
          >
            Login here!
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 50,
  },
  loginBtnContainer: {
    width: "80%",
    marginTop: 20,
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#000",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

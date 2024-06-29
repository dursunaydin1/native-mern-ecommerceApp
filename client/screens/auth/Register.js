import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Form/InputBox";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");

  // register function
  const handleRegister = () => {
    if (!email || !password || !name || !address || !city || !contact) {
      alert("Please fill in all fields");
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

      <InputBox
        placeholder={"Enter Your Address"}
        autoComplete={"address-line1"}
        value={address}
        setValue={setAddress}
      />

      <InputBox
        placeholder={"Enter Your City"}
        autoComplete={"country"}
        value={city}
        setValue={setCity}
      />

      <InputBox
        placeholder={"Enter Your Contact"}
        autoComplete={"tel"}
        value={contact}
        setValue={setContact}
      />

      <View style={styles.loginBtnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
          <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>
        <Text>
          Already have an account?
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
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 50,
  },
  loginBtnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#000000",
    width: "80%",
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
  loginBtnText: {
    color: "#ffffff",
    fontWeight: "500",
    textTransform: "uppercase",
    fontSize: 18,
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

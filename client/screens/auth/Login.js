import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputBox from "../../components/Form/InputBox";
import React, { useState, useEffect } from "react";

// redux hooks
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { useReduxStateHook } from "../../hooks/customHook";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // hooks
  const dispatch = useDispatch();

  // global state
  // const { error, loading, message } = useSelector((state) => state.user);
  const loading = useReduxStateHook(navigation, "home");

  //   login function
  const handleLogin = () => {
    if (!email || !password) {
      alert("Please email and password is required");
      return;
    }
    dispatch(login(email, password));
  };
  // life cycle
  // useEffect(() => {
  //   if (error) {
  //     alert(error);
  //     dispatch({ type: "clearError" });
  //   }
  //   if (message) {
  //     alert(message);
  //     navigation.navigate("home");
  //     dispatch({ type: "clearMessage" });
  //   }
  // }, [error, message, dispatch]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/login.png")} style={styles.image} />
      {loading && <Text>Loading...</Text>}
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
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
        <Text>
          Already a user please ?
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("register")}
          >
            login !
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

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

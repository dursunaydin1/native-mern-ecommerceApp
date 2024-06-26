import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const InputBox = ({
  autoComplete,
  placeholder,
  secureTextEntry,
  value,
  setValue,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoComplete={autoComplete}
        placeholder={placeholder}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  input: {
    width: "80%",
    backgroundColor: "white",
    height: 40,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    color: "black",
    borderColor: "gray",
  },
});

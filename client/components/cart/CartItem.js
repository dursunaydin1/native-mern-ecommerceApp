import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const CartItem = ({ item }) => {
  const [pDetails, setPDetails] = useState({});
  const [qty, setQty] = useState(1);

  // handle function for + - button
  const handleAddQty = () => {
    if (qty === 10) return alert("You cannot add more than 10 items");
    setQty(qty + 1);
  };

  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.imageUrl }} style={styles.image} />
      <View style={{ margin: 10 }}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.price}>Price: {item?.price} $</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
          <Text style={styles.btnQtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{qty}</Text>
        <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
          <Text style={styles.btnQtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 12,
    color: "#666",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  btnQty: {
    backgroundColor: "lightgray",
    width: 40,
    alignItems: "center",
    marginHorizontal: 5,
  },
  btnQtyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  qtyText: {
    fontSize: 20,
  },
});

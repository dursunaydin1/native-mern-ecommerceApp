import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ProductsData } from "../data/ProductsData";
import Layout from "../components/Layout/Layout";

const ProductDetails = ({ route }) => {
  const [pDetails, setPDetails] = useState({});
  const [qty, setQty] = useState(1);

  // get product details
  useEffect(() => {
    const getProduct = ProductsData.find(
      (item) => item?._id === route.params?._id
    );
    setPDetails(getProduct);
  }, [route.params?._id]);

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
    <Layout>
      <Image source={{ uri: pDetails?.imageUrl }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{pDetails?.name}</Text>
        <Text style={styles.price}>Price: ${pDetails?.price}</Text>
        <Text style={styles.description}>{pDetails?.description}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnCart}
            onPress={() => alert(`${qty} items added to cart`)}
            disabled={pDetails?.quantity === 0}
          >
            <Text style={styles.btnText}>
              {pDetails?.quantity > 0 ? "ADD TO CART" : "OUT OF STOCK"}
            </Text>
          </TouchableOpacity>
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
              <Text style={styles.btnQtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{qty}</Text>
            <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
              <Text style={styles.btnQtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginVertical: 5,
    backgroundColor: "white",
  },
  container: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "justify",
    marginBottom: 15,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnCart: {
    backgroundColor: "#000000",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnQty: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  btnQtyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  qtyText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default ProductDetails;

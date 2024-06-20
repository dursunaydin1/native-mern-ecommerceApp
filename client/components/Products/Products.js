import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductsCard from "./ProductsCard";
import { ProductsData } from "../../data/ProductsData";

const Products = () => {
  return (
    <View>
      {ProductsData.map((item) => (
        <ProductsCard key={item._id} item={item} />
      ))}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({});

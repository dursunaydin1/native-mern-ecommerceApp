import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProductsCard = ({ item }) => {
  const navigation = useNavigation();

  //more details btn
  const handleMoreButton = () => {
    navigation.navigate("productDetails", { _id: id });
    console.log(id);
  };

  //add to cart btn
  const handleAddToCart = () => {
    Alert.alert("Added to cart");
  };

  return (
    <View>
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{ uri: item?.imageUrl }} />
        <Text style={styles.cardTitle}>{item?.name}</Text>
        <Text style={styles.cardDescription}>
          {item?.description.substring(0, 30) + "...more"}
        </Text>
        <View style={styles.BtnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleMoreButton(item._id)}
          >
            <Text style={styles.btnText}>Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCart} onPress={handleAddToCart}>
            <Text style={styles.btnText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductsCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "lightgray",
    marginVertical: 5,
    marginHorizontal: 8,
    width: "45%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  cardImage: {
    width: "100%",
    height: 120,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 10,
    textAlign: "left",
  },
  BottomContainer: {
    marginTop: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#000000",
    height: 20,
    width: 75,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  btnCart: {
    backgroundColor: "orange",
    height: 20,
    width: 75,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 10,
  },
});

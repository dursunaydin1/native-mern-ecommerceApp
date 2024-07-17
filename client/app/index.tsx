import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import About from "../screens/About";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import Payments from "../screens/Payments";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Account from "../screens/Account/Account";
import Profile from "../screens/Account/Profile";
import Notifications from "../screens/Account/Notifications";
import ProductDetail from "../screens/ProductDetails";
import MyOrders from "../screens/Account/MyOrder";
import Dashboard from "../screens/Admin/Dashboard";
import { Provider } from "react-redux";
import store from "../redux/store";

const Stack = createNativeStackNavigator();
export default function Page() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="productDetails" component={ProductDetail} />
          <Stack.Screen name="cart" component={Cart} />
          <Stack.Screen name="checkout" component={Checkout} />
          <Stack.Screen name="payment" component={Payments} />
          <Stack.Screen name="account" component={Account} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="myorders" component={MyOrders} />
          <Stack.Screen name="adminPanel" component={Dashboard} />
          <Stack.Screen name="notifications" component={Notifications} />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="mobile" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

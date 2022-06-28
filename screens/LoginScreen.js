import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import LoginForm from "../components/loginScreen/LoginForm";

const INSTAGRAM_LOGO = require("../assets/3.jpg");

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={INSTAGRAM_LOGO} style={styles.logo} />
      </View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

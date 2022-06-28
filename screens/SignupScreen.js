import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import SignupForm from "../components/signupScreen/SignupForm";

const INSTAGRAM_LOGO = require("../assets/3.jpg");

const SignupScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={INSTAGRAM_LOGO} style={styles.logo} />
      </View>
      <SignupForm navigation={navigation} />
    </ScrollView>
  );
};

export default SignupScreen;

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

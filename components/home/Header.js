import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { firebase } from "../../firebase";

const handleSignOut = async () => {
  try {
    await firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed out successfully"));
  } catch (err) {
    console.log(err);
  }
};

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <FontAwesome5
            style={styles.icon}
            name="plus-square"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5
            style={styles.icon}
            name="heart"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>13</Text>
          </View>
          <FontAwesome5
            style={styles.icon}
            name="facebook-messenger"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  unreadBadge: {
    backgroundColor: "#ff3250",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "500",
  },
});

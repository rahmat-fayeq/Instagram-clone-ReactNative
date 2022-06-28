import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { USERS } from "../../data/users";

const BottomTabs = () => {
  const [activeHome, setActiveHome] = useState(true);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeMovie, setActiveMovie] = useState(false);
  const [activeShop, setActiveShop] = useState(false);
  const [activeTab, setaAtiveTab] = useState(false);
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {activeHome ? (
          <TouchableOpacity onPress={() => setActiveHome(!activeHome)}>
            <Entypo name="home" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setActiveHome(!activeHome)}>
            <Entypo name="home" size={24} color="white" />
          </TouchableOpacity>
        )}
        {activeSearch ? (
          <TouchableOpacity onPress={() => setActiveSearch(!activeSearch)}>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setActiveSearch(!activeSearch)}>
            <Feather name="search" size={24} color="white" />
          </TouchableOpacity>
        )}
        {activeMovie ? (
          <TouchableOpacity onPress={() => setActiveMovie(!activeMovie)}>
            <FontAwesome name="plus-square-o" size={30} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setActiveMovie(!activeMovie)}>
            <FontAwesome name="plus-square-o" size={30} color="white" />
          </TouchableOpacity>
        )}
        {activeShop ? (
          <TouchableOpacity onPress={() => setActiveShop(!activeShop)}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setActiveShop(!activeShop)}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => setaAtiveTab(!activeTab)}>
          <Image
            style={[styles.profilePic(), styles.profilePic(activeTab)]}
            source={USERS[0].image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 1,
    backgroundColor: "#ffffff",
    zIndex: 999,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 45,
    paddingTop: 3,
    alignItems: "center",
  },
  profilePic: (activeTab) => ({
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: activeTab ? 1 : 2,
    borderColor: activeTab ? "#000000" : "#ffffff",
  }),
});

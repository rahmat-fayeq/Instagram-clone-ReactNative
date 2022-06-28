import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import FormikPostUploader from "./FormikPostUploader";

const AddNewPost = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FormikPostUploader navigation={navigation} />
    </View>
  );
};

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Feather name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
    <Text style={styles.headerText}>New Post</Text>
    <Text></Text>
  </View>
);

export default AddNewPost;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },
});

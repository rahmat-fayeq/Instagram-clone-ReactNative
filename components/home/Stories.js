import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { USERS } from "../../data/users";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Image style={styles.story} source={story.image} />
            <Text>
              {story.user.length > 11
                ? story.user.slice(0, 7).toLocaleLowerCase() + "..."
                : story.user.toLocaleLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginLeft: 15,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});

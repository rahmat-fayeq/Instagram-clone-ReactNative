import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5, Feather, AntDesign } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { db, firebase } from "../../firebase";

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => console.log("Document successfully updated!"))
      .catch((err) => console.log("Error updated document: " + err));
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 10, marginTop: 5 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 5,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image style={styles.profile} source={{ uri: post.profile_picture }} />
      <Text style={{ marginLeft: 5, fontWeight: "700" }}>{post.user}</Text>
    </View>
    <View>
      <Text style={{ fontWeight: "700" }}>...</Text>
    </View>
  </View>
);

const PostImage = ({ post }) => (
  <View
    style={{
      height: 450,
      alignItems: "center",
    }}
  >
    <Image
      style={{ height: "100%", width: "100%", resizeMode: "cover" }}
      source={{ uri: post.imageUrl }}
    />
  </View>
);

const PostFooter = ({ post, handleLike }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        {post.likes_by_users.includes(firebase.auth().currentUser.email) ? (
          <AntDesign name="heart" size={24} color="black" />
        ) : (
          <FontAwesome5 name="heart" size={24} color="black" />
        )}
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5
          style={{ marginLeft: 15 }}
          name="comment"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather
          style={{ marginLeft: 15 }}
          name="send"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <TouchableOpacity>
        <Feather name="bookmark" size={24} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ fontWeight: "600" }}>
      {post.likes_by_users.length} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text>
      <Text style={{ fontWeight: "700" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post?.comments?.length && (
      <Text style={{ color: "gray" }}>
        View {post.comments.length > 1 ? "all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text>
          <Text style={{ fontWeight: "700" }}> {comment.user} </Text>
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

export default Post;

const styles = StyleSheet.create({
  profile: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.5,
    borderColor: "#ff8501",
  },
});

import { Text, View, TextInput, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { db, firebase } from "../../firebase";

const PLACEHOLDER_IMG =
  "https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-comin.jpg?ver=6";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required."),
  caption: Yup.string().max(2200, "Caption has reached the character."),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const getUserName = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );
    return unsubscribe;
  };
  useEffect(() => {
    getUserName();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());

    return unsubscribe;
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ fontSize: 20 }}
                multiline={true}
                placeholder="Write a caption..."
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation={"vertical"} />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{
              fontSize: 18,
              marginTop: 10,
              borderWidth: 1,
              height: 50,
              borderColor: "silver",
              borderRadius: 5,
            }}
            placeholder="Enter Image URL"
            placeholderTextColor="silver"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            values={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ color: "red", fontSize: 10, marginBottom: 50 }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button onPress={handleSubmit} title="share" disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

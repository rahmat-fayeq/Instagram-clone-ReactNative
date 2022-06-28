import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { firebase, db } from "../../firebase";

const getRandomProfilePicture = async () => {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  return data.results[0].picture.large;
};

const SignupForm = ({ navigation }) => {
  const singupFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string().required().min(2, "A username is required"),
    password: Yup.string()
      .required()
      .min(6, "Password must be more than 6 characters"),
  });

  const onSignup = async (email, username, password) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      db.collection("users")
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: email,
          profile_picture: await getRandomProfilePicture(),
        });

      console.log("User created successfully");
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) =>
          onSignup(values.email, values.username, values.password)
        }
        validationSchema={singupFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "silver"
                      : "red",
                },
              ]}
            >
              <TextInput
                style={{ fontSize: 18, fontWeight: "600" }}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.username.length < 1 || values.username.length > 2
                      ? "silver"
                      : "red",
                },
              ]}
            >
              <TextInput
                style={{ fontSize: 18, fontWeight: "600" }}
                placeholder="Username"
                autoCapitalize="none"
                textContentType="username"
                autoFocus={true}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length >= 6
                      ? "silver"
                      : "red",
                },
              ]}
            >
              <TextInput
                style={{ fontSize: 18, fontWeight: "600" }}
                placeholder="Password"
                autoCapitalize="none"
                textContentType="password"
                autoFocus={true}
                autoCorrect={false}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <TouchableOpacity
              style={{ alignItems: "flex-end", marginBottom: 30 }}
            >
              <Text style={{ color: "#6bb0f5" }}>Forgot Password</Text>
            </TouchableOpacity>
            <Pressable
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6bb0f5" }}> Log in</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "silver",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096f6" : "#9acaf7",
    minHeight: 42,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  }),
  buttonText: {
    fontWeight: "600",
    fontSize: 20,
    color: "#fff",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "center",
  },
});

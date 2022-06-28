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
import { firebase } from "../../firebase";

const LoginForm = ({ navigation }) => {
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be more than 6 characters"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() =>
          console.log("Firebase login successfully!", email, password)
        );
    } catch (err) {
      Alert.alert(
        "Warning",
        err.message + "\n\n...What would you like to do next !?",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("OK");
            },
            style: "cancel",
          },
          {
            text: "Sign Up",
            onPress: () => {
              navigation.push("SignupScreen");
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onLogin(values.email, values.password)}
        validationSchema={loginFormSchema}
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
                placeholder="Phone number, username or email"
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
                secureTextEntry={true}
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
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#6bb0f5" }}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

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

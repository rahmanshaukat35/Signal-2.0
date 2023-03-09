import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, Image, Input } from "react-native-elements";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
  }, []);

  const signIn = () => {
    const { email, password } = state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          navigation.replace("Home");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://seeklogo.com/images/S/signal-logo-899FCAD070-seeklogo.com.png",
        }}
        style={{ width: 150, height: 150, borderRadius: 20 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          value={state.email}
          onChangeText={(value) => handleChange("email", value)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={state.password}
          onChangeText={(value) => handleChange("password", value)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

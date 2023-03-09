import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const initialState = {
  name: "",
  email: "",
  password: "",
  imageUrl: "",
};
const RegisterScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };
  const register = () => {
    const { name, email, password, imageUrl } = state;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          value={state.name}
          onChangeText={(value) => handleChange("name", value)}
        />
        <Input
          placeholder="Email"
          value={state.email}
          onChangeText={(value) => handleChange("email", value)}
        />
        <Input
          placeholder="Password"
          value={state.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />
        <Input
          placeholder="Profile Picture URL (Optional)"
          value={state.imageUrl}
          onChangeText={(value) => handleChange("imageUrl", value)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.button}
        raised
        title="Register"
        onPress={register}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});

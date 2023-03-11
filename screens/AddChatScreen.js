import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
const initialState = {
  input: "",
};
const AddChatScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);
  const randomId = () => Math.random().toString(36).slice(2);
  const createChat = async () => {
    try {
      await setDoc(doc(db, "chats", randomId()), {
        chatName: state.input,
      });
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter chat name"
        value={state.input}
        onChangeText={(value) => handleChange("input", value)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button onPress={createChat} title="Create new chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});

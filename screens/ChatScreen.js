import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Avatar
            rounded
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            }}
          />
          <Text style={styles.headerText}>{route.params.chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  // const sendMessage = async () => {
  //   Keyboard.dismiss();
  //   try {
  //     await db
  //       .collection("chats")
  //       .doc(route.params.id)
  //       .collection("messages")
  //       .add({
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //         message: input,
  //         displayName: auth.currentUser.displayName,
  //         email: auth.currentUser.email,
  //         photoURL: auth.currentUser.photoURL,
  //       });
  //     setInput("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const sendMessage = async () => {
    if (!auth.currentUser) {
      console.error("User is not signed in.");
      alert("Please sign in to send messages.");
      return;
    }

    try {
      await setDoc(doc(db, "messages", route.params.id), {
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });
      setInput("");
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView>{/* chat area */}</ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="Signal Messages"
              value={input}
              onChangeText={(text) => setInput(text)}
              style={styles.textInput}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "700",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});

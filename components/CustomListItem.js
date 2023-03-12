import React from "react";
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({ id, chatName, subtitle, enterChat }) => {
  return (
    <ListItem onPress={() => enterChat(id, chatName)} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName ? chatName : "No name available"}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {subtitle ? subtitle : "No messages yet"}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

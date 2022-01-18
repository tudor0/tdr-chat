import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import "./App.css";
import "stream-chat-react/dist/css/index.css";
import { ChannelListContainer, ChannelContainer, Auth } from "./components";

const apiKey = "799pvu2jncff";
const client = StreamChat.getInstance(apiKey);
const cookies = new Cookies();
const authToken = cookies.get("token");

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setisCreating] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setCreateType={setCreateType}
          setisCreating={setisCreating}
          setisEditing={setisEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          isEditing={isEditing}
          setisCreating={setisCreating}
          setisEditing={setisEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;

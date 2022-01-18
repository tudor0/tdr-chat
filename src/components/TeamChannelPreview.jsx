import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({
  channel,
  type,
  setToggleContainer,
  setisCreating,
  setisEditing,
  setActiveChannel,
}) => {
  const { channel: activeChannel, client } = useChatContext();
  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );
  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    return (
      <div className="channel-preview__item singe">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    );
  };
  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__wrapper_selected"
          : "channel-preview__wrapper"
      }
      onClick={() => {
        setisCreating(false);
        setisEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevstate) => !prevstate);
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;

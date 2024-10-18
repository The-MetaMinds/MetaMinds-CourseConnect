import React from "react";
import { Box } from "@chakra-ui/react";
import { useUser } from "../contexts/UserProvider";
import MyChats from "./miscellanuous/MyChats";
import ChatBox from "./miscellanuous/ChatBox";
import SideDrawer from "./miscellanuous/SideDrawer";

const ChatPage = () => {
  const { auth } = useUser();

  const user = auth.user;

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;

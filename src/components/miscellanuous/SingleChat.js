import React, { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from '../../config/ChatLogic'
import ProfileModal from './ProfileModal'
import axios from 'axios'
import ScrollableChat from './ScrollableChat'
import io from "socket.io-client"

const ENDPOINT = "http://localhost:3000";

var socket, selectedChatCompare


const SingleChat = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()
    const [socketConnected, setSocketConnected] = useState(false)

    const toast = useToast();

   const {auth, selectedChat, setSelectedChat } =  useUser()

   const user = auth.user

     const fetchMessages = async () => {
        if (!selectedChat) return;

    
        try {
            setLoading(true)


            const {data} = await axios.get(`http://localhost:3000/api/messages/${selectedChat.id}`)
            setMessages(data)
            
            console.log(data)
            
            setLoading(false)
            
            socket.emit("join chat", selectedChat.id)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
        }
   }

   const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // Typing indicator logic
   }

   useEffect(() => { 
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on('connection', () => setSocketConnected(true) )
    }, [])

   useEffect(() => {
    fetchMessages()
    selectedChatCompare = selectedChat;
   }, [selectedChat])

   useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
        console.log("got here 1")
        console.log(selectedChatCompare)
        console.log(newMessageRecieved)
        if (!selectedChatCompare || selectedChatCompare.id !== newMessageRecieved.chatId){
            //give notification
        }
        else{
            console.log("got here 2")
            setMessages([...messages, newMessageRecieved])
        }
    })
   }) 

   const sendMessage = async(event) => {
    if(event.key === "Enter" && newMessage){
        try {
            setNewMessage("")
            var {data} =await axios.post("http://localhost:3000/api/messages", {content : newMessage, chatId: selectedChat.id} )
            const sender = {
                ...data.sender,
                id: user.id
            }
            data = {
                ...data,
                sender: sender,
                chatId: selectedChat.id
            }
            console.log(data)

            socket.emit("new message", data)

            setMessages([...messages,data])

            console.log("message was sent")
            
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Failed to send the message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            
        }
    }
   }

  return (
    <>
        {
            selectedChat ? (
                <>
                    <Text 
                        fontSize={{base: "28px", md: "30px"}}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent={{base : "space-between"}}
                        alignItems="center"
                    >
                        <IconButton 
                            display={{base: "flex", md: "none"}}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        <Text>
                        {!selectedChat.isGroupChat
                            ? getSender(user, selectedChat.users)
                            : selectedChat.chatName.toUpperCase()}
                        </Text>
                        <ProfileModal user={getSenderFull(user, selectedChat.users)}/>

                    </Text>
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="scroll"
                    >
                        {loading ? (
                            <Spinner 
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className='messages'>
                                <ScrollableChat  messages={messages} />
                            </div>
                        )}

                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            <Input 
                                variant="filled"
                                bg="E0E0E0"
                                placeholder='Enter a message'
                                onChange={typingHandler}
                                value={newMessage}
                            />
                            
                        </FormControl>
                        
                    </Box>
                </>
            ) : (<Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text> 
                    
            </Box>)       
         }
    </>
  )
}

export default SingleChat
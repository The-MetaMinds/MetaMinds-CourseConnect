import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogic'
import { useUser } from '../../contexts/UserProvider'
import { Avatar, Box, Text, Tooltip } from '@chakra-ui/react'

const ScrollableChat = ({messages}) => {
    const {auth} = useUser()
    const user = auth.user 

  return (
    <ScrollableFeed>
        {messages && (messages.map((m,i) => 
        (<div style={{display: "flex"}} key={m.id}>
            {(isSameSender(messages, m, i, user.id) ||
            isLastMessage(messages, i, user.id)) && (
                <Tooltip
                    label = {m.sender.firstname}
                    placement= "bottom-start"
                    hasArrow
                >
                    <Avatar
                        mt = "7px"
                        mr={1}
                        size="sm"
                        cursor="pointer"
                        name= {`${m.sender.firstname} ${m.sender.lastname}`}
                        src={m.sender.image}
                    />
                </Tooltip>
            )}

            <span
                style={{
                    backgroundColor: `${
                        m.sender.id === user.id ? "#BEE3F8" : "#FFFFFF"
                     }`,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                    marginLeft: isSameSenderMargin(messages, m, i, user.id),
                    marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10
                }}
            >
                {m.content}
            </span>
        </div>)))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
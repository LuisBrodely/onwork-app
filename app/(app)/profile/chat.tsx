import React, { useState, useCallback, useEffect } from 'react'
import { Avatar, GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = () => {
  const [messages, setMessages] = useState<any>([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.applesfera.com%2Fcuriosidades%2Fcomo-era-dia-a-dia-steve-jobs-cuando-trabajaba-apple-pixar&psig=AOvVaw2BqZlYXaXhXrkNQzOXHqWo&ust=1721670852090000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKi4mO7ZuIcDFQAAAAAdAAAAABAE',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages as any)}
      user={{
        _id: 1,
      }}
    />
  )
}

export default ChatScreen
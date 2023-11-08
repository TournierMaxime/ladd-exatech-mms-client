import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import message from '../styles/components/utils/message'

const Message = ({ message, priority }) => {
  switch (priority) {
    case 'info':
      return (
        <View style={[styles.containerMessage, { backgroundColor: '#e9e9ff' }]}>
          <Text style={[styles.messageText, { color: '#696cff' }]}>{message}</Text>
        </View>
      )
    case 'success':
      return (
        <View style={[styles.containerMessage, { backgroundColor: '#e4f8f0' }]}>
          <Text style={[styles.messageText, { color: '#1ea97c' }]}>{message}</Text>
        </View>
      )
    case 'warning':
      return (
        <View style={[styles.containerMessage, { backgroundColor: '#fff2e2' }]}>
          <Text style={[styles.messageText, { color: '#cc8925' }]}>{message}</Text>
        </View>
      )
    case 'error':
      return (
        <View style={[styles.containerMessage, { backgroundColor: '#ffe7e6' }]}>
          <Text style={[styles.messageText, { color: '#ff5757' }]}>{message}</Text>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  containerMessage: message.containerMessage,
  messageText: message.messageText,
})

export default Message

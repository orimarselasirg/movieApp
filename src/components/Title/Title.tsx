import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const Title = ({title}: {title: string}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
})

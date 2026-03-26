import React from 'react'
import { Text, View } from 'react-native'
import { Screen } from 'react-native-screens'
import { styles } from './styles/loading.style'

export const Loading = ({loadingText}: {loadingText: string}) => {
  return (
    <Screen style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
      </Screen>
  )
}

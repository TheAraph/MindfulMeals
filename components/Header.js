import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

//Header Component - relates to current page
const Header = (props) => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.HeaderText}>
        {props.name}
      </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container:{
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
    HeaderText:{
      fontFamily: "Gotham-Bold",
      fontSize: 34,
      color: "#F0F0F0",
      margin: 10,
      textAlign: 'center',
    },
})
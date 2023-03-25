import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

//Header Component - relates to current page
const Header = (props) => {
  return (
    <View style = {{marginLeft:15}}>
      <Text style = {styles.HeaderText}>
        {props.name}
      </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: "center",
      marginTop:100,
  },
    HeaderText:{
      fontFamily: "Helvetica",
      fontSize: 30,
      color: "#F0F0F0",
      margin: 10,
      fontWeight: 'bold',
    },
})
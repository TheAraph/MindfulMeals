import React from 'react';
import { View, Text, Image } from 'react-native';
import globalStyles from '../global-styles'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style = {{backgroundColor: '#FFF'}}>
    <View style = {{borderBottomWidth: 4, borderBottomColor: '#6EB7F7'}}>
    <Image style={{ width: 391, height: 219 }}source={{uri: recipe.img}} />
      <View style={styles.card1time}>
            <Text style={styles.card1timetext}>{recipe.time}</Text>
      </View>
      <View style={styles.card1category}>
            <Text style={styles.card1timetext}>{recipe.category}</Text>
      </View>
    </View>
    <View style = {[globalStyles.container, {elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 4,}]}>
      <Text style = {globalStyles.Headline4Bold}>{recipe.title}</Text>
      <Text style = {globalStyles.Headline5}>{recipe.description}</Text>
      <View style={styles.line}></View>
      <Text style = {globalStyles.Headline6Bold}>Ingredients:</Text>
      <Text style = {globalStyles.Headline6}>{recipe.ingredients}</Text>
      <View style={styles.line}></View>
      <Text style = {globalStyles.Headline6Bold}>Nutritional Information:</Text>
      <Text style = {globalStyles.Headline6}>Sodium: {recipe.sodium}mg</Text>
      <Text style = {globalStyles.Headline6}>Calories: {recipe.calories}g</Text>
      <Text style = {globalStyles.Headline6}>Fat: {recipe.fat}g</Text>
      <Text style = {globalStyles.Headline6}>Protein: {recipe.protein}g</Text>
      <View style={styles.line}></View>
      <Text style = {globalStyles.Headline5Bold}>Directions:</Text>
      {recipe.directions.map((direction, index) => (
        <Text style = {globalStyles.Headline5} key={index}>{direction}</Text>
      ))}
      <View style={styles.line}></View>
      </View>
      </ScrollView>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  card1time: {
    position: 'absolute', // Make this absolute positioned.
    top: 0, // Position at the top.
    left: 0, // Position at the left.
    backgroundColor: '#7C9A3E', // Set the background color to blue.
    paddingHorizontal: 2, // Add some padding horizontally.
    paddingVertical: 2, // Add some padding vertically.
    borderTopLeftRadius: 0, // Add a border radius to the top-left corner.
    borderBottomRightRadius: 20, // Add a border radius to the bottom-right corner.
  },
  card1timetext: {
    fontFamily: "Helvetica",
        fontSize: 16,
        color: "#FFF",
        margin: 10,
        alignItems: "center",
        alignSelf: "center",
        textAlign: "center",
        fontWeight: 'bold'
  },
  card1category: {
    position: 'absolute', // Make this absolute positioned.
    bottom: 0, // Position at the top.
    right: 0, // Position at the left.
    backgroundColor: '#7C9A3E', // Set the background color to blue.
    paddingHorizontal: 2, // Add some padding horizontally.
    paddingVertical: 2, // Add some padding vertically.
    borderTopLeftRadius: 20, // Add a border radius to the top-left corner.
    borderBottomRightRadius: 0, // Add a border radius to the bottom-right corner.
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 312,
    marginTop: 10,
    marginBottom: 10,
  },
})
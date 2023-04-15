import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: 'white',
        justifyContent: "center",
        backgroundColor: '#FFF',
    },
    newcontainer:{
      borderRadius: 20,
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      borderWidth: 2,
      borderColor: 'black',
    },
    textInput:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 60,
        borderRadius:30,
        elevation: 3,
        backgroundColor: '#FFF',
        margin: 10,
        borderWidth: 1,
        borderColor: "black",
        padding: 15,
      },
      picker:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 60,
        elevation: 3,
        backgroundColor: '#FFF',
        margin: 10,
        padding: 15,
      },
      Button:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 260,
        height: 60,
        borderRadius: 73,
        elevation: 3,
        backgroundColor: '#33A133',
        margin: 10,
        borderWidth: 0,
        borderColor: "black",
        alignSelf: 'center'
      },
      ButtonText:{
        fontFamily: "Gotham-Bold",
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
      },
      MindfulMeals:{
        fontFamily: "Gotham-Black",
        fontSize: 61,
        color: "#0072C6",
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: "center"
      },
      HealthifyUserName:{
        fontFamily: "Gotham-Bold",
        fontSize: 61,
        color: "#D5342B",
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .1,
        shadowRadius: 5,
        elevation: 25,
      },
      Headline6:{
        fontFamily: "Gotham-Light",
        fontSize: 16,
        color: "#000",
        margin: 10,
        alignItems: "center",
        alignSelf: "center",
        textAlign: "center"
      },
      Headline6Bold:{
        fontFamily: "Gotham-Bold",
        fontSize: 16,
        color: "#000",
        margin: 10,
        fontWeight: 'bold'
      },
      Headline5:{
        fontFamily: "Gotham-Light",
        fontSize: 24,
        color: "#000",
        margin: 10,
        alignItems: "center"
      },
      Headline5Bold:{
        fontFamily: "Gotham-Bold",
        fontSize: 24,
        color: "#000",
        margin: 10,
        alignItems: "center",
        fontWeight: 'bold'
      },
      Headline4:{
        fontFamily: "Gotham-Light",
        fontSize: 34,
        color: "#000",
        margin: 10,
        alignItems: "center"
      },
      Headline4Bold:{
        fontFamily: "Gotham-Bold",
        fontSize: 34,
        color: "#000",
        margin: 10,
        alignItems: "center",
        fontWeight: 'bold'
      },
      Headline3Bold:{
        fontFamily: "Gotham-Bold",
        fontSize: 48,
        color: "#000",
        margin: 10,
        alignItems: "center",
        fontWeight: 'bold',
        textAlign: 'center'
      },
      Headline2Black:{
        fontFamily: "Gotham-Black",
        fontSize: 61,
        color: "#000",
        margin: 10,
        fontWeight: 'bold'
      },
      Button2:{
        marginBottom:20, alignItems:"center",
      },
      Button2Text:{
        fontWeight:"bold",
        fontSize: 24,
        textDecorationLine: "underline",
        fontFamily: "Gotham-Bold"
      },
      Button2TextGreen:{
        fontWeight:"bold",
        fontSize: 16,
        textDecorationLine: "underline",
        fontFamily: "Gotham-Bold",
        color: "#33A133"
      },
      Button3:{
        marginBottom:20, alignItems:"center",
      },
      Button3Text:{
        fontWeight:"bold",
        fontSize: 20,
        textDecorationLine: "underline",
        fontFamily: "Gotham-Bold"
      },
      Button3TextGreen:{
        fontWeight:"bold",
        fontSize: 20,
        textDecorationLine: "underline",
        fontFamily: "Gotham-Bold",
        color: "#33A133"
      },
      card1: {
        shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: .5,
      shadowRadius: 5,
      elevation: 25,
        width: 341,
        height: 177,
        padding: 40,
        backgroundColor: '#FFF',
        alignItems: 'center',
        textAlign:'center',
        borderRadius: 15,
        cloud: "#0000",
        padding: 10,
        marginBottom: 35,
      },
      image: {
        position: 'absolute',
        overflow: "hidden",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 341,
        height: 130,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
      cardtext: {
        flex: 1,
        position: 'absolute',
        color: "#000000",
        textAlign: "center",
        bottom: 8,
        fontSize: 22,
        fontFamily: 'Gotham-Light'
      },
      infoBox: {
        width:350, 
        height:100, 
        alignItems:'center', 
        borderBottomColor:'black', 
        borderBottomWidth:2
     },
     passwordBox: {
      width:245, 
      height:40, 
      alignItems:'center', 
      borderBottomColor:'#4c4c4c', 
      borderBottomWidth:2, 
      bottom:60
     }
     ,password: {
      fontWeight:'600', 
      fontSize:26, 
      color:'#4c4c4c',
      fontFamily: 'Gotham-Light'
    },
    deleteBox: {
      width:150, 
      height:30, 
      alignItems:'center', 
      borderBottomColor:'#d5342b', 
      borderBottomWidth:2, 
      bottom:10
   },
   delete: {
      fontWeight:'500', 
      fontSize:20, 
      color:'#d5342b',
      fontFamily: 'Gotham-Bold'
   },
  })

export default styles;
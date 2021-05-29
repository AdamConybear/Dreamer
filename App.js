/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef } from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { BlurView } from "@react-native-community/blur";
import Record from './Record';
import { CalendarList } from 'react-native-calendars';
import CalendarsList from './CalendarsList';
import HorizCalendar from './HorizCalendar';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;






const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  const [selectedDate, setSelectedDate] = useState(Date());
  const [markedDates, setMarkedDates] = useState({});
  const [expandWidget, setExpandWidget] = useState(false);
  const calWidgetAnim = useRef(new Animated.Value(windowHeight * 0.15)).current;

//   const expandAnimation = () => {
//     // Will change fadeAnim value to 0 in 3 seconds
//     Animated.timing(calWidgetAnim, {
//         toValue: windowHeight*0.40,
//         duration: 600,
//         useNativeDriver: false,
//     }).start();
// };
// const collapseAnimation = () => {
//     // Will change fadeAnim value to 0 in 3 seconds
//     Animated.timing(calWidgetAnim, {
//         toValue: windowHeight*0.15,
//         duration: 300,
//         useNativeDriver: false,
//     }).start();
// };

  const monthWidget = () => {

    return (
      <Animated.View style={[styles.monthWidget,{height:calWidgetAnim}]}>
          {/* <View style={styles.widgetHeader}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>Monthly</Text>
            <Text onPress={() => {
              collapseAnimation();
              setExpandWidget(!expandWidget)}
              }>Show less
            </Text>
          </View> */}
          <View>
              {/* {HorizontalCalendarList()} */}
              <CalendarsList 
                collapseAnim={collapseAnimation} 
                setExpandWidget={setExpandWidget}
                expandWidget={expandWidget}
                />
          </View>
        </Animated.View>
    );

  }
  const weekWidget = () => {

    let weekArr = [];
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    // var last = first + 6; // last day is the first day + 6
    for(let i=0; i < 7; i++){
      weekArr.push(new Date(curr.setDate(first + i)).toDateString());
    }

    // var firstday = new Date(curr.setDate(first)).toUTCString();
    // var lastday = new Date(curr.setDate(last)).toUTCString();

    // console.log(weekArr);
    
    
    return (
      <Animated.View style={[styles.weekWidget,{height:calWidgetAnim}]}>
          <View style={styles.widgetHeader}>
            <Text style={{fontSize:18, fontWeight:'bold', marginLeft:5, color:'#FAFFFF'}}>
              This week</Text>
            <Text onPress={() => {
              expandAnimation();
              setExpandWidget(!expandWidget)}
              }
              style={{fontSize:14, fontWeight:'bold',marginRight:5, color:'#FAFFFF'}}>
                Show more</Text>
          </View>
          <View style={styles.weekDays}>
            {weekArr.map(day => {
              return (
                <View style={styles.weekCal} key={day}>
                  <Text style={{color:'#FAFFFF', marginBottom:3}}>{day.charAt(0)}</Text>
                  <View style={styles.dayCircle}></View>
                </View>
              );
            })}
          </View>
        </Animated.View>
    );

  }


  return (
    <View style={{flex:1,justifyContent: "center",
    alignItems: "center"}}>
      <ImageBackground style={ styles.backgroundImage } source={require('./assets/longer-bg2.png')} >
        <View style={styles.homeContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>My Dreams</Text>
          </View>

          <HorizCalendar />
          <Record/>

        </View>
      </ImageBackground>
    </View>
  );
};



// console.log(windowHeight);
{/* <LinearGradient 
          colors={['#31325D', '#30315A', '#23253C']} 
          locations={[0,0.1,1]}
          style={{
            width:windowWidth,
            height:100
          }}>

          </LinearGradient> */}

const styles = StyleSheet.create({
  homeContainer:{
    // display:'flex',
    position:'relative',
    width:windowWidth,
    height:windowHeight,
    marginTop:60,
    // backgroundColor:'red'
    // flex:1,
    // justifyContent:'center',
    // alignItems:'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    // height:windowWidth,
    // width: windowHeight * 0.05,
    // marginTop: 20,
    // marginLeft: 25,
  },
  headerText:{
    fontSize:24,
    color:'#FAFFFF',
    fontFamily:'Quicksand',
    fontWeight: '500',
   marginTop: 20,
    marginLeft: 25,
  },
  weekWidget:{
    display:'flex',
    position:'relative',
    backgroundColor: '#353535',
    width: windowWidth * 0.87,
    // height: windowHeight * 0.15,
    justifyContent: 'center',
    alignItems:'center',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
  },
  monthWidget: {
    display:'flex',
    position:'relative',
    backgroundColor: '#353535',
    width: windowWidth * 0.87,
    // height: windowHeight * 0.35,
    justifyContent: 'center',
    alignItems:'center',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    
  },
  widgetHeader:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    position:'absolute',
    top:10,
    paddingLeft:15,
    paddingRight:15,
    marginTop:5,
  },
  weekDays:{
    display:'flex',
    flexDirection:'row',
    width:'90%',
    justifyContent:'space-between',
    position:'absolute',
    bottom:15,
  },
  // weekCircles:{
  //   display:'flex',
  //   flexDirection:'row',
  //   width:'93%',
  //   justifyContent:'space-between'
  // },
  backgroundImage:{
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    // opacity: 0.7
  },
  dayCircle: {
    width: 35,
    height:35,
    borderRadius: 18,
    backgroundColor: '#FAFFFF',
    // padding:10,
  },
  weekCal:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:'auto',
    marginRight:'auto',
  }
});

export default App;

import React, {useState} from 'react';
import {StyleSheet, Text, View,Dimensions} from 'react-native';
import {CalendarList} from 'react-native-calendars';

// const testIDs = require('../testIDs');
const RANGE = 12;
const initialDate = Date();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CalendarsList = ({collapseAnim, setExpandWidget, expandWidget}) => {
  const [selected, setSelected] = useState(initialDate);
  const markedDates = {
    [selected]: {
      selected: true,
      disableTouchEvent: true,
    //   selectedColor: '#5E60CE',
      selectedColor: '#4BB4BB',
    //   selectedTextColor: 'white'
      selectedTextColor: '#FAFFFF'
    }
  };
  
  const onDayPress = day => {
    setSelected(day.dateString);
  };

  return (
    <CalendarList
    //   testID={testIDs.calendarList.CONTAINER}
      current={initialDate}
      pastScrollRange={RANGE}
      futureScrollRange={0}
      renderHeader={(date)=>renderCustomHeader(date,collapseAnim, setExpandWidget,expandWidget)}
      theme={theme}
      onDayPress={onDayPress}
      calendarWidth={windowWidth * 0.87}
      calendarHeight={windowHeight * 0.05}
      markedDates={markedDates}
      horizontal
      pagingEnabled
    />
  );
};

const theme = {
  'stylesheet.calendar.header': {
    dayHeader: {
      fontWeight: '500',
      fontSize:16,
      color: '#FAFFFF',
    //   color: 'black'
    }
  },
  'stylesheet.day.basic': {
    // today: {
    //   borderColor: '#4BB4BB',
    //   borderWidth: 0.8,
    //   borderRadius:16
    // },
    todayText: {
      color: '#FAFFFF',
      fontWeight: '800'
    }
  },
  
  calendarBackground:'transparent',
  textDayFontWeight: '400',
//   dotColor: 'red',
//   dayTextColor: 'black', //actual cal days
  dayTextColor: '#FAFFFF', //actual cal days
  textDayFontSize: 16,
//   todayDotColor:'#FAFFFF'
  //   todayTextColor: '#red', //current day
};

function renderCustomHeader(date, collapseAnim, setExpandWidget,expandWidget) {
  const header = date.toString('MMMM yyyy');
  const [month, year] = header.split(' ');
  const textStyle = {
    // fontSize: 18,
    fontWeight: 'bold',
    // paddingTop: 10,
    paddingBottom: 10,
    color: '#FAFFFF',
    // color: 'black',
    // paddingRight: 5
  };

  return (
    <View style={styles.header}>
      <Text style={[styles.month, textStyle]}>{`${month}`} {`${year}`}</Text>
      <Text style={[styles.collapse, textStyle]} onPress={()=>{
          collapseAnim();
          setExpandWidget(!expandWidget);
      }}>Show less</Text>
    </View>
  );
}

export default CalendarsList;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    // marginBottom: 10
  },
  month: {
    // marginLeft: 5,
    fontSize: 18,
  },
  collapse: {
    // marginRight: 5,
    fontSize:14
  }
});

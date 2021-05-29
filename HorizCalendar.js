import React, {useState} from 'react';
import {StyleSheet, Text, View,Dimensions} from 'react-native';
import {CalendarList} from 'react-native-calendars';

// const testIDs = require('../testIDs');
const RANGE = 12;
const initialDate = Date();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HorizCalendar = () => {
  const [selected, setSelected] = useState(initialDate);

  //TODO
  //useEffect to fill markedDates with dates a dream was recorded
  //search asyncStorage or documents directory..whichever is easier

  const markedDates = {
    [selected]: {
      selected: true,
      disableTouchEvent: true,
    //   selectedColor: '#5E60CE',
      selectedColor: '#5132EA',
    //   selectedTextColor: 'white'
      selectedTextColor: '#FAFFFF'
    }
  };
  
  const onDayPress = day => {
    setSelected(day.dateString);
  };

  return (
    <CalendarList 
        horizontal
        pagingEnabled
        hideArrows={false}
        // hideExtraDays={false}
        onDayPress={onDayPress}
        pastScrollRange={RANGE}
        futureScrollRange={0}
        theme={calTheme}
        markedDates={markedDates}
        // calendarWidth={windowWidth * 0.95}
        // calendarHeight={windowHeight * 0.35}
        
    />
  );
};

const calTheme = {
    // 'stylesheet.calendar.header': {
    //   dayHeader: {
    //     // fontWeight: '500',
    //     // fontSize:16,
    //     fontFamily:'Quicksand',
    //     color: '#FAFFFF',
    //   //   color: 'black'
    //   },

    // },
    'stylesheet.day.basic': {
      // today: {
      //   borderColor: '#4BB4BB',
      //   borderWidth: 0.8,
      //   borderRadius:16
      // },
      todayText: {
        // color: '#FAFFFF',
        fontWeight: '800'
      }
    },
    
    calendarBackground:'transparent',
    arrowColor: '#FAFFFF', 
        
    textDayFontFamily: 'Quicksand',
    textDayFontSize: 17,
    textDayFontWeight: '400',
    
    monthTextColor: '#FAFFFF',
    textMonthFontSize: 18,
    textMonthFontFamily: 'Quicksand',
    textMonthFontWeight: '500',

    textDayHeaderFontFamily: 'Quicksand',
    textDayHeaderFontSize: 15,
    textDayHeaderFontWeight: '500',
    dayTextColor: '#FAFFFF', //actual cal days
  };
  

export default HorizCalendar;

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

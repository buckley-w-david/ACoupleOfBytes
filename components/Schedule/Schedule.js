import React, { Component } from 'react';
import { Header,SideMenu, List, ListItem  } from 'react-native-elements';
import {View, Text, TextInput, TouchableOpacity, Button,StyleSheet, Navigator,Image  } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {list, MenuComponent} from '../navigationList';
import Login from '../Login/Login';
import MedsHome from '../Medications/MedicationsHome';
export default class Schedule extends Component {
   
       constructor(props){
        super(props);
        
        this.state = {
            isOpen: false,
            isLogout: false,
            dateSelected:'',
            markedDates:{
              '2017-11-16': { marked: true},//selected: true,
              '2017-11-17': {marked: true},
            },
            date: new Date()
        };
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
    }
  onSideMenuChange (isOpen) {
    this.setState({
      isOpen: isOpen
    })
  }
  CurrentDate(){
 
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      return(year + '-' + month + '-' + date);
      
    }
  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  navigationPushed(page){
    switch(page){
      case 'home':
        this.setState({
          isHome: !this.state.isHome
        })
        break;
      case  'notifcation':
        this.setState({
          isNotifcations: !this.state.isNotifcations
        })
        break;
      case 'schedule':
        this.setState({
          isSchedule: !this.state.isSchedule
        })
        break;
      case 'meds':
        this.setState({
          isMeds: !this.state.isMeds
        })
        break;

      case 'messages':
        this.setState({
          isMessages: !this.state.isMessages
        })
        break;
      case 'FaF':
        this.setState({
          isFaF: !this.state.isFaF
        })
        break;  
    }
   
  }
  logout(){
    // end session
    this.setState({
        isLogout: !this.state.isLogout
    })
  }
  dayPressed(date){
    var dateTemp= date.dateString;
        this.setState({
          dateSelected: date.dateString,
          markedDates:{
            dateTemp: {selected: true}
          }
        })
        
      console.log(date.dateString, this.state.markedDates);
      return;
  }

  renderArrow(direction){
    if (direction=='left'){
      return(
      <Image resizeMode="contain" style={styles.arrowButtons} source={require('../images/blackBack.png')} />
      )
    }else{
      return(
      <Image resizeMode="contain" style={styles.arrowButtons} source={require('../images/blackForward.png')} />
      )
    }
  }
 
    render(){
    if(this.state.isLogout){
      return <Login />
    }
    if(this.state.isHome){
      return <Home />
    }
    // if(this.state.isNotifcations){
    //   return <Notifications />
    // }

    if(this.state.isSchedule){
      return <Schedule />
    }
    if(this.state.isMeds){
      return <MedsHome />
    }
    // if(this.state.isMessages){
    //   return <Messages />
    // }
    // if(this.state.isFaF){
    //   return <FaF />
    // }
      const MenuComponent = (
    <View style={{flex: 1, backgroundColor: '#3f4144', paddingTop: 50}}>
      
      <List containerStyle={{marginBottom: 20}}>
      {
        
           list.map((l, i) => (
            <ListItem
                //roundAvatar
                avatar={{uri:l.avatar_url}}//
                key={i}
                title={l.name}
                onPress= {()=>this.navigationPushed(l.shortCut)}
                avatarOverlayContainerStyle= {{backgroundColor: '#fff'}}
                

            />))
          
       
      }
      </List>
     
    </View>
  )


          return(
           
            <SideMenu
            isOpen={this.state.isOpen}
            onChange={this.onSideMenuChange.bind(this)}
            menu={MenuComponent}>
                <View style={styles.container} toggleSideMenu={this.toggleSideMenu.bind(this)}>
                    <Header
                        leftComponent={ { icon: 'menu', color: '#fff', onPress:this.toggleSideMenu.bind(this) }}
                        centerComponent={{ text: 'Schedule', style: { color: '#fff', fontWeight: 'bold' } }} 
                        rightComponent={{ icon: 'home', color: '#fff', onPress:  ()=>this.logout()}}
                        style={{height:50}}
                        />
                    <View style={styles.calendar}>
                        <Calendar
                        
                            // Initially visible month. Default = Date() 
                            current={this.CurrentDate()}
                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined 
                            minDate={'2012-05-10'}
                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined 
                            maxDate={'2025-05-30'}
                            // Handler which gets executed on day press. Default = undefined 
                            onDayPress={(day) => {this.dayPressed( day)}}
                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting 
                            monthFormat={'MMMM yyyy '}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined 
                            onMonthChange={(month) => {console.log('month changed', month)}}
                            // Hide month navigation arrows. Default = false 
                            hideArrows={false}
                            // Replace default arrows with custom ones (direction can be 'left' or 'right') 
                            renderArrow={(direction) => (this.renderArrow(direction))}
                            // Do not show days of other months in month page. Default = false 
                            hideExtraDays={true}
                            // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out 
                            // day from another month that is visible in calendar page. Default = false 
                            disableMonthChange={true}
                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday. 
                            firstDay={1}

                            markedDates={this.state.markedDates}
                            markingType={'interactive'}
                            style={{
                                borderWidth: 1,
                                borderColor: 'gray',
                                height: 350
                            }}
                            theme={{
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#2a323d',
                                selectedDayBackgroundColor: '#00adf5',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#00adf5',
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#00adf5',
                                selectedDotColor: '#ffffff',
                                arrowColor: 'orange',
                                monthTextColor: '#00adf5'
                            }}
                      />
                    </View> 
                    <View style={styles.container}>
                        <Text style={styles.text}>{this.state.dateSelected}</Text>

                    </View>        
                </View>
          </SideMenu>
        )
    }

}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    calendar:{
       backgroundColor: '#91a0ba', 
       height: 320
    },
    text:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        paddingVertical: 5
    },
    arrowButtons:{
      height:30,
      width:30
    }
   
});

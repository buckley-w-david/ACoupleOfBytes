import React, { Component } from 'react';
import {View, Text, StyleSheet, Image,Button, KeyboardAvoidingView, TouchableOpacity, navigation} from 'react-native';
import SideBar from '../sideBar/drawer';
import {  SideMenu, List, ListItem , Header } from 'react-native-elements';
import Login from '../Login/Login';
import {list, MenuComponent} from '../navigationList';
import Home from '../Home/Home';
import EditMeds from './EditMeds';
import Schedule from '../Schedule/Schedule';
export default class MedsHome extends Component {
 constructor (props) {
  super(props)
    this.state = {
        isLogout: false,
        isEditMed: false,
        medSelected:{},
        isSchedule: false
    }
  }

  onSideMenuChange (isOpen) {
    this.setState({
      isOpen: isOpen
    })
  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  endSession(){
    console.log('end', this.props.sessionKey);
    return fetch('http://acoupleofbytes.jordonsmith.ca/logout/', {
    method: 'GET',
      headers: {
        'SESSION-KEY': this.props.sessionKey,// this.props.sessionKey
      },

    }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({medDue:responseJson})
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        // console.error(error);
        });
  }
  
  logout(){
   this.endSession();// end session
      this.setState({
      isLogout: !this.state.isLogout
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

  editMed(med){
    console.log("here it is ", med);
     this.setState({
          isEditMed: !this.state.isEditMed
      })
      this.setState({
          medSelected: med
      })
  }
  schedule(){
     this.setState({
          isSchedule: !this.state.isSchedule
      })
  }

render () {

      const Medications = [
      {
        name: 'Adderall',
        subtitle: 'Every day at 1:00pm'
      },
      {
        name: 'Dexedrine',
        subtitle: 'twice a day 8AM and 4PM'
      },
      {
        name: 'Haldol',
        subtitle: 'Everyday at 1:00'
      },
      ]
    if(this.state.isLogout){
      return <Login />
    }
    if(this.state.isHome){
      return <Home sessionKey={this.props.sessionKey}/>
    }
    // if(this.state.isNotifcations){
    //   return <Notifications />
    // }

    if(this.state.isSchedule){
      return <Schedule sessionKey={this.props.sessionKey}/>
    }
    if(this.state.isMeds){
      return <MedsHome sessionKey={this.props.sessionKey}/>
    }
    // if(this.state.isMessages){
    //   return <Messages />
    // }
    // if(this.state.isFaF){
    //   return <FaF />
    // }
    if(this.state.isEditMed){
      return <EditMeds
        med= {this.state.medSelected}
        sessionKey={this.props.sessionKey}
       />
    }
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

  return (

    <SideMenu
      isOpen={this.state.isOpen}
      onChange={this.onSideMenuChange.bind(this)}
      menu={MenuComponent}>
    
      
    <View  style={styles.container} toggleSideMenu={this.toggleSideMenu.bind(this)} >
         <Header
                leftComponent={ { icon: 'menu', color: '#fff', onPress:this.toggleSideMenu.bind(this) }}
                centerComponent={{ text: 'Medications', style: { color: '#fff', fontWeight: 'bold' } }} 
                rightComponent={{ icon: 'home', color: '#fff', onPress: ()=>this.logout()}}
                style={{height:50}}
                />   

  <List  >
  {
    Medications.map((l, i) => (
      <ListItem
        //roundAvatar
        //avatar={{uri:l.avatar_url}}
        key={i}
        subtitle={l.subtitle}
        title={l.name}
        onPress={()=>this.editMed(l.name)}
      />
    ))
  }
</List>
  
    {this.state.isFirstMed && 
      <View style={styles.page}>
          <Image resizeMode="contain" style={styles.logo} source={require('../images/firstmedbadge.png')} />
      </View>         
    }

            
   
</View>
     <View style={styles.bottonMenu}>
        <TouchableOpacity style={styles.buttonContainerMeds } onPress={()=>this.editMed()}>
            <Text  style={styles.buttonText}>Add New Meds</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.buttonContainer } onPress={()=>this.schedule()}>
            <View  style={styles.schedule}>
              <Text  style={styles.buttonText}>     Schedule</Text>
              <Image resizeMode="contain" style={styles.logo} source={require('../images/calendar.png')} />
            </View> 
        </TouchableOpacity> 

     </View> 
       
    </SideMenu>
    

  );
}
}



const styles =StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',

    },
    logo: {
      flex:1,
        //alignItems: 'center',
        //position: 'absolute',
        //justifyContent: 'center',
      width: 20,
      height: 20,
       // paddingVertical: 30,

    },
    page:{
        alignItems: 'center',
        position: 'absolute',
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        width: 100,
        flex:1
    },
    buttonContainerMeds:{
        backgroundColor: '#102342',
        paddingVertical: 15,
        width: 100,
        flex:1
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    bottonMenu:{
       //  flex: 0,
        flexDirection: 'row',
        backgroundColor: '#2c3e50',
    },
    schedule:{
      flexDirection: 'row',
      alignItems: 'center',
      //position: 'absolute',
     // textAlign: 'center',
    }


   
});
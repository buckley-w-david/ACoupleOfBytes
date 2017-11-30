import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, navigation} from 'react-native';
import SideBar from '../sideBar/drawer';
import {  SideMenu, List, ListItem , Header } from 'react-native-elements';
import Login from '../Login/Login';
import Cards from './cards';
import MedsHome from '../Medications/MedicationsHome';
import {list, MenuComponent} from '../navigationList';
import Schedule from '../Schedule/Schedule';
import Logo from '../header';
export default class Home extends Component {
 constructor (props) {
  super(props)
  this.state = {
    isOpen: false,
    isLogout: false,
    isHome: false,
    isNotifcations: false,
    isSchedule: false,
    isMeds: false,
    isMessages: false,
    isFaF:false,
    medDue:[],
  }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
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
    // end session
      this.endSession();
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


getMedValues(){
    return fetch('http://acoupleofbytes.jordonsmith.ca/meds/due/', {
    method: 'GET',
      headers: {
        'SESSION-KEY': this.props.sessionKey,
      },

    }).then((response) => response.json())
        .then((responseJson) => {
            console.log("here ",responseJson);
            this.setState({medDue:responseJson})
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        // console.error(error);
        });
}

render () {
  
    //this.getMedValues();
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
      return <Schedule sessionKey={this.props.sessionKey} />
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
                centerComponent={<Logo/>} 
                rightComponent={{ icon: 'home', color: '#fff', onPress:  ()=>this.logout()}}
                style={{height:50}}
                />
         <Cards medDue={this.state.medDue} />
       
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
        alignItems: 'center',
        position: 'absolute',
        width: 50,
        height: 50,
        paddingVertical: 30
    },
});
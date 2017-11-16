import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, navigation} from 'react-native';
import SideBar from '../sideBar/drawer';
import {  FormLabel, FormInput,SideMenu, List, ListItem , Header } from 'react-native-elements';
import Login from '../Login/Login';
import MedsHome from '../Medications/MedicationsHome';
import {list, MenuComponent} from '../navigationList';
import Schedule from '../Schedule/Schedule';
export default class Home extends Component {
 constructor (props) {
  super(props)
  this.state = {
    isOpen: false,
    medName: this.props.med,

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
  logout(){
    // end session
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
 


render () {
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
  var medName= '';
  if (this.props.med){
      medName=this.props.med.name;
  }
  return (

    <SideMenu
      isOpen={this.state.isOpen}
      onChange={this.onSideMenuChange.bind(this)}
      menu={MenuComponent}>
    
      
    <View  style={styles.container} toggleSideMenu={this.toggleSideMenu.bind(this)} >
         <Header
                leftComponent={ { icon: 'menu', color: '#fff', onPress:this.toggleSideMenu.bind(this) }}
                centerComponent={{ text: 'Edit Medication', style: { color: '#fff', fontWeight: 'bold' } }} 
                rightComponent={{ icon: 'home', color: '#fff', onPress:  ()=>this.logout()}}
                style={{height:50}}
                />
          <View style={styles.container}>
            {/*<ScrollView>*/}
             <View style={styles.form}>
             
            
            <FormLabel labelStyle={{color: '#fff'}}>Medication Name:</FormLabel>
            <FormInput 
                value={medName}
                placeholder='Enter medication Name'  
                placeholderTextColor={'#AAAAAA'} 
                containerStyle={styles.FormInput} 
                inputStyle={{color: '#fff'}} 
                onChangeText={(medName) => this.setState({medName})}/>
             {/*<FormValidationMessage>{this.state.emptyFName}</FormValidationMessage>   */}

            </View>
            {/*</ScrollView>*/}
        </View>
       
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
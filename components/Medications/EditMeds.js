import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, navigation} from 'react-native';
import SideBar from '../sideBar/drawer';
import {  FormLabel, FormInput,SideMenu, List, ListItem , Header } from 'react-native-elements';
import Login from '../Login/Login';
import MedsHome from '../Medications/MedicationsHome';
import {list, MenuComponent} from '../navigationList';
import Schedule from '../Schedule/Schedule';
/*import ToggleSwitch from 'toggle-switch-react-native';
*/
export default class Home extends Component {
 constructor (props) {
  super(props)
  this.state = {
    isOpen: false,
    medName: this.props.med,
    isLoggedIn: true,
    isCreated: false,

  }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
    
  }

  submitButton(){  
         this.setState({
        isCreated: true,
    })  
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
 


render () {
  if (this.state.isCreated)
  {
    return <MedsHome />
  }

  
  var medname='current name'+this.props.med;
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
  var medName= 'Eg Adderall';
  var medDosage= 'Eg 20 mg';
  var medTimesPerDay= 'Eg 1';
  var medDosageTimes= 'Eg 7:00 AM and 3:00 PM';

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
                placeholder={medName}  
                placeholderTextColor={'#AAAAAA'} 
                containerStyle={styles.FormInput} 
                inputStyle={{color: '#fff'}} 
                onChangeText={(medName) => this.setState({medName})}/>
             {/*<FormValidationMessage>{this.state.emptyFName}</FormValidationMessage>   */}
             <FormLabel labelStyle={{color: '#fff'}}>Dosage (include unit):</FormLabel>
            <FormInput 
                placeholder={medDosage}  
                placeholderTextColor={'#AAAAAA'} 
                containerStyle={styles.FormInput} 
                inputStyle={{color: '#fff'}} 
                onChangeText={(medName) => this.setState({medName})}/>
             {/*<FormValidationMessage>{this.state.emptyFName}</FormValidationMessage>   */}
             <FormLabel labelStyle={{color: '#fff'}}>Times Per Day:</FormLabel>
            <FormInput 
                placeholder={medTimesPerDay}  
                placeholderTextColor={'#AAAAAA'} 
                containerStyle={styles.FormInput} 
                inputStyle={{color: '#fff'}} 
                onChangeText={(medName) => this.setState({medName})}/>
             {/*<FormValidationMessage>{this.state.emptyFName}</FormValidationMessage>   */}
            <FormLabel labelStyle={{color: '#fff'}}>Dosage Time(s):</FormLabel>
            <FormInput 
                placeholder={medDosageTimes}  
                placeholderTextColor={'#AAAAAA'} 
                containerStyle={styles.FormInput} 
                inputStyle={{color: '#fff'}} 
                onChangeText={(medName) => this.setState({medName})}/>
             {/*<FormValidationMessage>{this.state.emptyFName}</FormValidationMessage>   */}


             <TouchableOpacity style={styles.buttonContainer } onPress={()=>this.submitButton()}>
                <Text  style={styles.buttonText}>Submit</Text>
            </TouchableOpacity> 

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
    form: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
     buttonContainer:{
        backgroundColor: '#287BAF',
        paddingVertical: 15,
        padding: 20
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    FormInput:{
        width:275,
     
    },
});
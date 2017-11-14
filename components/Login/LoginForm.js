import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, Button,StyleSheet, StatusBar, Navigator } from 'react-native';
import Home from '../Home/Home';




export default class LoginForm extends Component {
  


    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            password: '',
            isLogin: false,
        };
    }
    
    onButtonPress(state){
       this.setState({isLogin:true})
        //console.log(this.props.navigator);
       // this.props.navigation.navigate('Home', { name: 'Jane' })
       
       
    }
    

    render(){
       

        return(
            
            <View style={styles.container}>
                <TextInput style = {styles.input} 
                    autoCapitalize="none" 
                    onSubmitEditing={() => this.passwordInput.focus()} 
                    autoCorrect={false} 
                    keyboardType='email-address' 
                    returnKeyType="next" 
                    placeholder='Email Address' 
                    onChangeText={(username) => this.setState({username})}
                    placeholderTextColor='rgba(225,225,225,0.7)'/>

                <TextInput style = {styles.input}   
                    returnKeyType="go" 
                    //ref={(input)=> this.passwordInput = input} 
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    placeholder='Password' 
                    placeholderTextColor='rgba(225,225,225,0.7)' 
                    secureTextEntry/>

                <TouchableOpacity style={styles.buttonContainer } href="../Home/Home" 
                    onPress={()=>this.onButtonPress(this.state)}>
                    <Text  style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity> 
               
            </View>       
        );
    }
}





const styles =StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }

});
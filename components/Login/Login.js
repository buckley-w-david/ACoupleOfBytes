import React, { Component } from 'react';

import {View, Text, TextInput, TouchableOpacity, Alert, Button,StyleSheet, StatusBar, Navigator,Image, KeyboardAvoidingView  } from 'react-native';
import Home from '../Home/Home';
import CreateAccount from '../CreateAccount/createAccount';
import LoginForm from './LoginForm';
import bcrypt from 'react-native-bcrypt'
import { FormValidationMessage } from 'react-native-elements'
export default class Login extends Component {
   

       constructor(props){
        super(props);
        
        this.state = {
            username: '',
            data:{},
            password: '',
            isLogin: false,
            isCreateAccout:false,
            errorMessage:'',
            sessionKey:'',
        };
    }
    
    checkCredientals(){
        if (this.state.password==''){
            this.setState({errorMessage:'please enter a password'})
            return false;
        }
        if (this.state.username==''){
            this.setState({errorMessage: 'Please enter a username'});
            return false;
        }
        var DBPass='tt'//get password for username
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(this.state.password, salt);
        console.log(hash);
        DBPass=hash; //take out
      
        //console.log(bcrypt.compareSync(DBPass, hash));
        return DBPass==hash;
        
    }
    login(){
        return fetch('http://acoupleofbytes.jordonsmith.ca/login/', {
        method: 'POST',
        body: JSON.stringify({"username": this.state.username, "password": this.state.password})

        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error){
                    this.setState({errorMessage:'Username or Password is incorrect '})
                    return 0;
                }else{
                    console.log(responseJson);
                    this.setState({isLogin:true})// create session
                    this.setState({sessionKey:responseJson.session_key})
                }    
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
            // console.error(error);
            });
    }
    onButtonPress(state, button){
      this.state.errorMessage='';
       if (button=='login'){
            if(this.checkCredientals()){
                this.login();  
            }  
       } 
       if (button=='CreateAccount'){
           this.setState({isCreateAccout:true})
       }
    }
 
    render(){
        console.disableYellowBox = true;
        if(this.state.isLogin){
            return <Home  sessionKey={this.state.sessionKey}/>
        }
        if(this.state.isCreateAccout){
            return <CreateAccount />
        }
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.loginContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={require('../images/ComLifeLogo.png')} />
                    </View>
                    
                        <View style={styles.containerForm}>
                            <TextInput style = {styles.input} 
                                autoCapitalize="none" 
                                onSubmitEditing={() => this.passwordInput.focus()} 
                                autoCorrect={false} 
                                //keyboardType='email-address' 
                                returnKeyType="next" 
                                placeholder='Username' 
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
                             <FormValidationMessage  labelStyle={styles.errorText}>{this.state.errorMessage}</FormValidationMessage>      
                            <Text  style={styles.text}>Forgot Password</Text>     
                            <TouchableOpacity style={styles.buttonContainer }
                                onPress={()=>this.onButtonPress(this.state, 'login')}>
                                <Text  style={styles.buttonText}>LOGIN</Text>
                            </TouchableOpacity> 
                            <Text  style={styles.text}  onPress={()=>this.onButtonPress(this.state, 'CreateAccount')} >Create Account</Text>                          
                        </View>    
   
                </View>
            </KeyboardAvoidingView>       
        );
    }
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 700,
        height: 300
    },
    containerForm: {
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
    },
    text:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        paddingVertical: 5
    },
    errorText:{
        textAlign: 'center',
        fontWeight: '700',
        paddingVertical: 5
    }
});
import React, {Component,Route, Navigator} from 'react'; 
import { AppRegistry,StyleSheet,Text ,View} from 'react-native';
//import Login Component 
import Login from './components/Login/Login.js';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home/Home.js';



export default class clc extends Component {
  render() {

    return (

       <Login />
 
     
    );
  }
}



AppRegistry.registerComponent('clc', () => clc);

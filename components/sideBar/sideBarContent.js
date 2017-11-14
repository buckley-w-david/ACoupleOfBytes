import React, {Component} from 'react';
import {Text,View, TouchableOpacity, StyleSheet} from 'react-native';
import Home from '../Home/Home';

export default class SideBarContent extends Component{
    constructor() {
        super();


    }

    newPage(state){
        console.log('new page')
    };
    render()
    {

        return(
            <View style={styles.styecontainer}>
                <TouchableOpacity style={styles.buttonContainer } href="../Home/Home" 
                                onPress={()=>this.newPage()}>
                                <Text  style={styles.buttonText}>L1</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.buttonContainer } href="../Home/Home" 
                                onPress={()=>this.newPage()}>
                                <Text  style={styles.buttonText}>L2</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.buttonContainer } href="../Home/Home" 
                                onPress={()=>this.newPage()}>
                                <Text  style={styles.buttonText}>L3</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.buttonContainer } href="../Home/Home" 
                                onPress={()=>this.newPage()}>
                                <Text  style={styles.buttonText}>L4</Text>
                </TouchableOpacity> 
            </View >
        );
    }
}



const styles =StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        
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
});    
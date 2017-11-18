import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, navigation} from 'react-native';

export default class Logo extends Component {

render () {
  return (
    <View style={styles.container}>
        <Image resizeMode="contain" style={styles.logo2} source={require('./images/logoPic.png')} />
        <Image resizeMode="contain" style={styles.logo} source={require('./images/logoWords.png')} />     
    </View>
  );
 }
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    logo: {
        alignItems: 'center',
        width: 100,
        height: 75,
        paddingVertical: 30,
    },
    logo2: {
        alignItems: 'center',
        width: 30,
        height: 30,
        paddingVertical: 30,
    },
});
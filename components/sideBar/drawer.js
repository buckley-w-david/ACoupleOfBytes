import Drawer from 'react-native-drawer';
import React, {Component} from 'react';
import SideBarContent from './sideBarContent';
import {Text,View,Image, TouchableOpacity,StyleSheet,Button} from 'react-native';
import { Header } from 'react-native-elements';
export default class SideBar extends Component{

    constructor(){
        super();
        this.closeControlPanel = this.closeControlPanel.bind(this);
        this.openControlPanel = this.openControlPanel.bind(this);
    }

    closeControlPanel = () => {
        console.log("close it");
        this._drawer.close()
    };
    openControlPanel = () => {
        console.log("open");
        this._drawer.open()
    };

    render()
    {
        const drawerStyles = {
            drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
            main: {paddingLeft: 5},
        }


        return (
            <View>
                 <View>
             <Header
                leftComponent={ { icon: 'menu', color: '#fff', onPress:()=>this.openControlPanel() }}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }} 
                rightComponent={{ icon: 'home', color: '#fff' }}
                />
           
             </View>
            <View>
             <Drawer
                type="overlay"
                content={<SideBarContent  />}
                ref = {(ref) => this._drawer = ref}
                openDrawerOffset={225}
                
                tapToClose={false}
                styles={drawerStyles}
                tweenHandler={Drawer.tweenPresets.parallax}
            >
            </Drawer>       
                {/*<View>
                    <TouchableOpacity  onPress={()=>this.openControlPanel()}>
                        <Image resizeMode="contain"  style={styles.logo} source={require('../images/drawerImage.png')} />
                    </TouchableOpacity> 
                </View>*/}
                
            </View>
            </View> 
             
        );
    }
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',

    },
     buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    logo: {
        alignItems: 'center',
        position: 'absolute',
        width: 50,
        height: 50,
    },
});
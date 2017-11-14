import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, Header ,StatusBar} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import * as Progress  from 'react-native-progress';
export default class Cards extends Component {
    
    OverDueMeds(overDue){
        if (overDue==false){
            return;
        }
        return(
               <Card
                        title='Schedule - Past Due'
                        containerStyle={styles.card}
                        //image={require('../images/logo.png')}
                        >
                        <Text style={{marginBottom: 10}}>
                            This medication is past due should have been taken yesterday
                        </Text>
                        <Button
                            icon={{name: 'code'}}
                            backgroundColor='#03A9F4'
                            fontFamily='FontAwesome'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='Record NOW' />
                    </Card>
        );
    }

   
    firstLoginFunc(firstLogin){
        if (firstLogin){
            return(
                text={nextDue: 'Add your meds to see whats next!',
                      points: 'Level 1 - earn points by taking your meds on time'  
                    }
            )

        }
        else{
            return(
                text={nextDue: 'Next med is <med> and do at <Time:Time> <AM/PM>',
                      points: 'Level 1;'  
                    }
            )
        }
    }



    
    render(){
      const firstLogin=false;
      const overDue=true;
      const textValues=this.firstLoginFunc(firstLogin);
        return(
                <View style={styles.reminders}> 
                        {this.OverDueMeds(overDue)}
                    <Card
                        title='Schedule - Next Due'
                        //image={require('../images/logo.png')}
                        containerStyle={styles.card}
                        >
                        
                        <Text style={{marginBottom: 10}} >
                            {textValues.nextDue}
                        </Text>

                    </Card>
                    <Card
                        title='Points'
                        containerStyle={styles.card}
                        //image={require('../images/logo.png')}
                        >
                        <Text style={{marginBottom: 10}}>
                            {textValues.points}
                        </Text>
                        
                         <Progress.Bar progress={.5} width={300} />
                        <Text>Value: {100}</Text>
                        

                    </Card>
                  </View>
           
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
       
    },
    reminders:{
         alignItems: 'center',
         flexDirection:'column',
       
    },
    card:{
        width:350,
       
    }
});
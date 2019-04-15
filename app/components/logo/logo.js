import React from 'react';
import { StyleSheet, View, Text,Image } from 'react-native';

export default class Logo extends React.Component {
    render() {
        return (
            // <View style={styles.container}>
                // {/* <Text>CustomApp</Text> */}
                <Image resizeMode="contain" style={styles.logo} source={require('../../assets/images/logo.png')} />
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex:1,
        alignItems:'center',
        // height:200,
        flex:1
    },
    logo:{
        width:150,
        height:150
 
        // width:300,
        // height:180
        // width:30
    }
});

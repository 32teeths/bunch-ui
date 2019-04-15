import React from 'react';

import { Image, StyleSheet, Button, Modal, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';


class NoticeSection extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            someKey: 'someValue'
        };
    }

    render() {
        return <View style={[styles.containerPadding, styles.landingContainer]}>

            <View style={styles.noticeSection}>

                <View style={styles.noticeIconWrapper}>
                    <Text style={styles.noticeIconText}>
                        <FontAwesome className={styles.noticeIcon}>
                            {Icons['bellO']}
                        </FontAwesome>
                    </Text>
                </View>

                <View style={styles.noticeInfo}>
                    <Text style={styles.noticeText}>
                        3 Alerts
                        </Text>
                </View>
                {/* Header Title Ends */}

                {/* Header Title */}
                {/* <View style={styles.noticeArrowView}> */}
                <Text style={styles.noticeArrow}>

                    <FontAwesome className={styles.noticeIcon}>
                        {Icons['chevronRight']}
                    </FontAwesome>

                </Text>
                {/* </View> */}
                {/* Header Title Ends */}

            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    noticeIconText:{
        // color:'white',
        fontSize:18
    },
    noticeIcon:{
        // color:'white'
    },
    noticeSection: {


        // Border
        borderWidth: 1,
        // backgroundColor:'#07167C',
        // borderColor:'#07167C',
        // borderColor: 'yellow',

        // Shadow
        // shadowOffset: { width: 5, height: 5, },
        // shadowColor: 'gray',
        // shadowOpacity: 0.1,


        alignItems: 'center',
        marginTop: 10,
        // marginBottom: 10,
        borderRadius: 4,
        justifyContent: 'center',
        flex: 1,
        height: 50,
        padding: 10,
        flexDirection: 'row',
        // color:'white'
        // borderColor: 'whitesmoke',
        // backgroundColor: 'whitesmoke',
        // borderWidth: 1
        // backgroundColor: 'white',

    },



    noticeInfo: {

        flexGrow: 1

        // backgroundColor: 'white',
        // shadowOffset: { width: 5, height: 5, },
        // shadowColor: 'gray',
        // shadowOpacity: 0.1,
        // margin: 8,
        // padding: 20,



    },


    noticeArrowView: {
        // flexBasis: '10%',
        alignSelf: 'flex-end',
        flex: 1,

        justifyContent: 'center'
    },
    noticeText: {
        // color: 'black'
        // color:'white',
        fontSize:18

        
    },

    noticeIconWrapper: {
        alignItems: 'flex-start',
        // justifyContent:'flex-start',
        flexBasis: '10%',

        
    },


    // Notices Styling End
})

export default NoticeSection;

import { StyleSheet } from 'react-native';
import GLOBAL from './../global'

module.exports = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 4,
        borderWidth: 1,
        borderColor: '#d2d1d1',
        padding: 10,
        flex: 1,
        flexDirection: 'row'
    },
    topSection: {
        // backgroundColor:'gray',
        height: 100,
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#d2d1d1',
        paddingBottom: 10
    },
    topLeft: {
        width: '10%',
        flex: 1,
        // alignItems: 'center',
        // justif
    },
    imageTag: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#f5f3f3',

    },
    topRight: {
        padding: 10,
        flex: 1,
        flexDirection: 'column'
    }
});
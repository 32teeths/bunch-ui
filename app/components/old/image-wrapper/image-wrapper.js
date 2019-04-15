import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

export default class ImageWrapper extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            source: props.source,
            loaded: false
        };
    }

    onLoad = () => {
        this.setState({ loaded: true })
    }

    render() {

        const { source, loaded } = this.state;

        return (
            <View style={styles.imageWrapper}>
                {
                    loaded ?
                        <Image source={{ uri: source }} onLoad={this.onLoad} style={styles.uploadAvatar} />
                        : <View style={styles.imageTag}></View>
                }
            </View>
        );
    }
}

// onPress={() => { Actions.SHIPPINGDETAILS() }}>

const styles = StyleSheet.create({
    imageWrapper: {

    },
    image: {

    },
    imageTag: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#f5f3f3',

    }
});

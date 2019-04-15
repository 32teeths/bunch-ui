import React from 'react';
import { Animated, StatusBar, StyleSheet, MaskedViewIOS, Text, View, Button } from 'react-native';

export default class MyMaskedView extends React.Component {

    static defaultProps = {
        isLoaded: false,
    };

    state = {
        loadingProgress: new Animated.Value(0),
        animationDone: false
    };

    componentDidMount(nextProps) {
        setTimeout(() => {
            this.startAnimation();
        }, 4000);
    }

    startAnimation = () => {
        this.state.loadingProgress = new Animated.Value(0);
        this.state.animationDone = false;
        this.setState({ animationDone: false, loadingProgress: new Animated.Value(0) });
        Animated.timing(this.state.loadingProgress, {
            toValue: 100,
            duration: 4050,
            useNativeDriver: true
        }).start(() => this.setState({ animationDone: true }));
    }

    render() {

        const opacityClearToVisible = {
            opacity: this.state.loadingProgress.interpolate({
                inputRange: [0, 15, 30],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp'
            })
        };

        const imageScale = {
            transform: [
                {
                    scale: this.state.loadingProgress.interpolate({
                        inputRange: [0, 10, 100],
                        outputRange: [1, 0.8, 70]
                    })
                }
            ]
        };

        const appScale = {
            transform: [
                {
                    scale: this.state.loadingProgress.interpolate({
                        inputRange: [20, 50, 100],
                        outputRange: [1.1, 1.03, 1]
                    })
                }
            ]
        }

        const fullScreenBackgroundLayer = this.state.animationDone ? null : (
            <View style={[StyleSheet.absoluteFill, styles.backgroundStyle]} />
        )

        const fullScreenWhiteLayer = this.state.animationDone ? null : (
            <View style={[StyleSheet.absoluteFill, styles.fullScreenWhiteLayer]} />
        );

        return (
            <View style={styles.fullScreen}>
                <StatusBar animated={true} hidden={!this.state.animationDone} />
                {fullScreenBackgroundLayer}

                <MaskedViewIOS style={{ flex: 1 }}
                    maskElement={
                        <View style={styles.centeredFullScreen}>
                            <Animated.Image style={[styles.maskImageStyle, imageScale]} source={{ uri: 'https://raw.githubusercontent.com/TheSavior/react-native-mask-loader/master/example/assets/twitter.png' }} />
                        </View>
                    }
                >

                    {fullScreenWhiteLayer}

                    <Animated.View style={[opacityClearToVisible, appScale, { flex: 1 }]}>
                        <View style={styles.container}>
                            <Button onPress={() => {
                                this.startAnimation();
                            }} title="See it again">
                            </Button>
                        </View>
                    </Animated.View>
                </MaskedViewIOS>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredFullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    maskImageStyle: {
        height: 100,
        width: 100,
    },
    fullScreenWhiteLayer: {
        backgroundColor: 'white',
    }, backgroundStyle: {
        backgroundColor: 'rgba(125, 125, 255, 1)',
    }
});
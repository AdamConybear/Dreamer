import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    LayoutAnimation,
    Image,
    ScrollView,
    Animated,
    Easing,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView, VibrancyView } from "@react-native-community/blur";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Record extends Component {
    state = {
        isPressed: false,
        animated: new Animated.Value(0.5),
        opacityA: new Animated.Value(1),
        containerHeight: new Animated.Value(0),
    }
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
    }

    expandAnimation = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(this.state.containerHeight, {
            toValue: windowHeight*0.35,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };
    collapseAnimation = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(this.state.containerHeight, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    _runAnimation() {
        const { animated, opacityA } = this.state;

        Animated.loop(
            Animated.parallel([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: 1000,
                    // easing: Easing.inOut(Easing.quad),
                    // easing: Easing.out(Easing.exp),
                    // easing: Easing.in,
                    easing: Easing.linear,
                    // easing: Easing.inOut(Easing.sin),
                    // easing: Easing.inOut(Easing.linear),
                    useNativeDriver: false,
                }),
                Animated.timing(opacityA, {
                    toValue: 0.5,
                    duration: 1000,
                    // easing: Easing.linear,
                    // easing: Easing.inOut(Easing.quad),
                    useNativeDriver: false,
                })
            ])
        ).start();
    }
    _stopAnimation() {
        Animated.loop(
            Animated.parallel([
                Animated.timing(animated),
                Animated.timing(opacityA),
            ])
        ).stop();
    }
    _onPress() {
        this.setState(
            state => ({ isPressed: !state.isPressed }),
        )
    }
    _micButton() {
        const { isPressed, animated, opacityA, } = this.state;
        if (isPressed) {
            //some function
            this.expandAnimation();
            this._runAnimation();
            return (
                
                <Animated.View style={{
                    // width: 100,
                    // height: 100,
                    // borderRadius: 30,
                    // backgroundColor: 'rgb(153,0,0)',
                    // backgroundColor: '#4BB4BB',
                    display:'flex',
                    position:'relative',
                    justifyContent:'center',
                    alignItems:'center',
                    // marginTop:50,
                    opacity: opacityA,
                    transform: [
                        {
                            scale: animated
                        }
                    ]
                }}>
                    {/* icon or image */}
                    {/* <Image source={require('./assets/mic3x.png')} style={{height:'100%', width:'100%'}}/> */}
                    
                    <Image source={require('./assets/big_circle_noblur.png')} style={{height:100, width:100, opacity:0.95}}/>
                    <Image source={require('./assets/microphone.png')} style={{position:'absolute',height:40, width:40}}/>
                </Animated.View>
                
            );
        } else {
            //some function
            this.collapseAnimation();
            return (
                <View style={{
                    // width: 100,
                    // height: 100,
                    // borderRadius: 30,
                    // backgroundColor: 'rgb(153,0,0)',
                    // backgroundColor: '#4BB4BB',
                    display:'flex',
                    position:'relative',
                    justifyContent:'center',
                    alignItems:'center',
                    // marginTop:50,
                }}>
                    {/* icon or image */}
                    {/* <Image source={require('./assets/mic3x.png')} style={{height:'100%', width:'100%'}}/> */}
                    <Image source={require('./assets/big_circle_noblur.png')} style={{height:100, width:100, opacity:0.95}}/>
                    <Image source={require('./assets/microphone.png')} style={{position:'absolute',height:40, width:40}}/>
                </View>
            );
        }
    }

    render() {
        return (
            <Animated.View style={{
                position:'absolute',
                bottom: 0,
                width:'100%',
                height:this.state.containerHeight,
            }}>
                <View style={styles.recContainer}>
                        <View style={styles.butttonContainer}>
                            <TouchableOpacity onPress={this._onPress}>
                                {this._micButton()}
                            </TouchableOpacity>
                        </View>
                </View>
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    butttonContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        position:'absolute',
        bottom:70,
        // zIndex: 1001,
    },
    recContainer:{
        position:'relative',
        // backgroundColor: '#23253C',
        backgroundColor: '#31325D',
        width:'100%',
        height:"100%",
        justifyContent: 'center',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    }

});
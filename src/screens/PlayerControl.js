/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const PlayerControl = props => {
    const { playing, onPlay, onPause, skipForwards, skipBackwards } = props;

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
                <Image
                    source={require('../../assets/backward.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchable} onPress={playing ? onPause : onPlay}>
                {playing ? (
                    <Image
                        source={require('../../assets/pause.png')} style={styles.pause} />
                ) : (
                    <Image
                        source={require('../../assets/play.png')} style={styles.image} />
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
                <Image
                    source={require('../../assets/forward.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 140,
    },
    icon: {
        height: 20,
        width: 20,
    },
    image: {
        height: 30,
        width: 30,
    },
    pause: {
        height: 50,
        width: 40,
    },
});

export default PlayerControl;
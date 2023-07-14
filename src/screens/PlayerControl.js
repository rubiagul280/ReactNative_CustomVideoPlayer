import React from "react";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PlayerControl = props => {
    const { playing, onPlay, onPause, skipForwards, skipBackwards } = props;

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
                <AntDesign name="banckward" size={25} color="#fff"/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchable} onPress={playing ? onPause : onPlay}>
                {playing ? (
                    <AntDesign name="pause" size={30} color="#fff"/>
                ) : (
                    <AntDesign name="play" size={30} color="#fff" />
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
                <AntDesign name="forward" size={25} color="#fff" />   
            </TouchableOpacity>
        </View>
    );
}

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
});

export default PlayerControl;

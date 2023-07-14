import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const ProgressBar = props => {
    const { currentTime, duration, onSlideCapture, onSlideStart, onSlideComplete } = props;

    const getMinutesFromSeconds = time => {
        const minutes = time >= 60 ? Math.floor(time / 60) : 0;
        const seconds = Math.floor(time - minutes * 60);

        return `${minutes >= 10 ? minutes : '0' + minutes} : ${seconds >= 10 ? seconds : '0' + seconds}`;
    }

    const position = getMinutesFromSeconds(currentTime);
    const fullDuration = getMinutesFromSeconds(duration);

    const handleOnSlide = time => {
        onSlideCapture({seekTime : time});
    }

    return (
        <View style={styles.progressBarContainer}>
            <Slider height={10}
                value={currentTime}
                minimumValue={0}
                maximumValue={150}
                step={1}
                onValueChange={handleOnSlide}
                onSlidingStart={onSlideStart}
                onSlidingComplete={onSlideComplete}
                minimumTrackTintColor={'#F44336'}
                maximumTrackTintColor={'#FFFFFF'}
                thumbTintColor={'#F44336'} />
            <View style={styles.timeWrapper}>
                <Text style={styles.timeLeft}>{position}</Text>
                <Text style={styles.timeRight}>{fullDuration}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    timeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 5,

    },
    timeLeft: {
        color: '#fff'
    },
    timeRight: {
        color: '#fff',
    }
});

export default ProgressBar;

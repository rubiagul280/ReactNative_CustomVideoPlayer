/* eslint-disable prettier/prettier */
import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Image, StatusBar, Text } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import PlayerControl from './PlayerControl';
import ProgressBar from './ProgressBar';

const windowHeight = Dimensions.get('window').width * (9 / 12);
const windowWidth = Dimensions.get('window').height;

const VideoPlayer = ({ uri }) => {
  const videoRef = createRef();
  const [fullScreen, setFullScreen] = useState(false);
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

  const handleFullScreen = () => {
    if (fullScreen) {
      if (isPortrait) {
        Orientation.lockToPortrait();
      } else {
        Orientation.unlockAllOrientations();
      }
    } else {
      Orientation.lockToLandscapeLeft();
    }
  };

  const handlePlay = () => {
    setPlay(true);
  };

  const handlePause = () => {
    if (play) {
      setPlay(false);
      return;
    }
    setPlay(true);
  };

  const skipBackward = () => {
    videoRef.current.seek(currentTime - 5);
    setCurrentTime(currentTime - 5);
  };

  const skipForward = () => {
    videoRef.current.seek(currentTime + 5);
    setCurrentTime(currentTime + 5);
  };

  const onSeek = (data) => {
    videoRef.current.seek(data.seekTime);
    setCurrentTime(data.seekTime);
  };

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const onLoadEnd = (data) => {
    setDuration(data.duration);
    setCurrentTime(data.currentTime);
  };

  const onEnd = () => {
    setPlay(false);
    videoRef.current.seek(0);
  };

  const handleOrientation = (orientation) => {
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      setFullScreen(true);
      StatusBar.setHidden(true);
      setIsPortrait(false);
    } else {
      setFullScreen(false);
      StatusBar.setHidden(false);
      setIsPortrait(true);
    }
  };

  const handleTap = () => {
    setShowControls(true);
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri }}
          style={[styles.video, fullScreen ? styles.fullScreenVideo : styles.normalVideo]}
          resizeMode="contain"
          controls={false}
          muted={true}
          paused={!play}
          onProgress={onProgress}
          onLoad={onLoadEnd}
          onEnd={onEnd}
          onTouchStart={handleTap}
        />
        {showControls && (
          <View style={styles.controlOverlay}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/back-arrow.png')} style={styles.icon} />
                <Image
                  source={require('../../assets/logo.png')}
                  style={styles.image}
                />
              </View>
              <View style={styles.icons}>
              <Image
                  source={require('../../assets/right-arrow.png')} style={styles.icon} />
                <Image
                  source={require('../../assets/like_icon.png')} style={styles.icon} />
                <TouchableOpacity onPress={handleFullScreen}>
                <Image
                  source={require('../../assets/fullscreen.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>

            <PlayerControl
              onPlay={handlePlay}
              onPause={handlePause}
              playing={play}
              skipBackwards={skipBackward}
              skipForwards={skipForward}
            />

            <View style={styles.location}>
              <Text style={styles.txt}>SHELTON STREET</Text>
              <Text style={styles.txt}>COVENT GARDEN</Text>
              <Text style={styles.txt}>LONDON</Text>
              <Text style={styles.txt}>UNITED KINGDOM</Text>
            </View>

            <ProgressBar
              currentTime={currentTime}
              duration={duration > 0 ? duration : 0}
              onSlidingStart={handlePause}
              onSlidingComplete={handlePause}
              onSlidingCapture={onSeek}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: windowWidth,
    height: windowHeight,
  },
  fullScreenVideo: {
    width: 600,
    height: 500,
  },
  fullScreenButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  normalVideo: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
    marginTop: 45,
  },
  image: {
    height: 25,
    width: 60,
    marginLeft: 100,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginTop: 1,
    marginRight: 5,
    marginLeft: 5,
    height: 15,
    width: 15,
  },
  txt: {
    fontSize: 9,
    fontFamily: 'Lato',
    color: '#FFFFFF',
    lineHeight: 10,
    marginLeft: 10,
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default VideoPlayer;

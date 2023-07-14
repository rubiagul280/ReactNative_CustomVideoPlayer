/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import VideoPlayer from './src/screens/VideoPlayer';

const App = () => {
  const videoUri = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

  return (
    <View style={{ flex: 1 }}>
      <VideoPlayer uri={videoUri} />
    </View>
  );
};

export default App;

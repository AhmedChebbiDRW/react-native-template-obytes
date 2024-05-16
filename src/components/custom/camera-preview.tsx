/* eslint-disable react-native/no-inline-styles */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

interface CameraPreviewProps {
  photo: any;
  retakePicture: () => void;
  savePhoto: () => void;
}

const CameraPreview = ({
  photo,
  retakePicture,
  savePhoto,
}: CameraPreviewProps) => {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);

  const sendImage = () => {
    /*
     * SEND IMAGE TO SERVER
     */
  };
  return (
    <View style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor="#000"
        barStyle={'light-content'}
      />
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          height: height,
          width: '100%',
        }}
      />
      <View style={styles.photoOptions}>
        <Pressable style={styles.photoOption} onPress={retakePicture}>
          <Text style={styles.photoOptionText}>Re-Take</Text>
        </Pressable>
        <Pressable style={styles.photoOption} onPress={savePhoto}>
          <Text style={styles.photoOptionText}>Save</Text>
        </Pressable>
        <Pressable style={styles.sendButton} onPress={sendImage}>
          <Text style={styles.sendText}>Send</Text>
          <Ionicons name="send-outline" size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  photoOptions: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    width: '100%',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  photoOption: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  photoOptionText: {
    // color: '#fff',
    fontSize: 17,
  },
  sendButton: {
    width: 110,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#17B169',
    flexDirection: 'row',
  },
  sendText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '400', // Changed from 400 to "400"
    marginRight: 10,
  },
});

export default CameraPreview;

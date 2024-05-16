/* eslint-disable max-lines-per-function */
import type { CameraCapturedPicture } from 'expo-camera';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import CameraPreview from '@/components/custom/camera-preview';

const CameraWrapper = () => {
  const cameraRef = useRef<Camera | null>(null); // Ref with Camera type

  const [flashMode, setFlashMode] = useState<'on' | 'off' | 'auto'>('on'); // Limited flashMode to known values
  const [cameraPermissions, setCameraPermissions] = useState<
    boolean | undefined
  >();
  const [, setMediaLibraryPermissions] = useState<boolean | undefined>(); // Using _ as placeholder

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>(null); // Typed to CameraCapturedPicture | null

  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);

  useEffect(() => {
    requestCamera();
  }, []);

  const requestCamera = async () => {
    try {
      const permitCamera = await Camera.requestCameraPermissionsAsync();
      const permitMediaLibrary = await MediaLibrary.requestPermissionsAsync();

      setCameraPermissions(permitCamera.status === 'granted');
      setMediaLibraryPermissions(permitMediaLibrary.status === 'granted');
    } catch (err) {
      console.warn(err);
    }
  };

  if (cameraPermissions === undefined) {
    return <Text>Requesting Permissions...</Text>;
  } else if (!cameraPermissions) {
    return (
      <Text>Permission Denied!!! You can change this in the settings</Text>
    );
  }

  const handleFlashMode = () => {
    setFlashMode((prevMode) =>
      prevMode === 'on' ? 'off' : prevMode === 'off' ? 'auto' : 'on'
    ); // Using callback function to update state based on previous state
  };

  const handleTakePicture = async () => {
    try {
      let photo = await cameraRef.current?.takePictureAsync();
      if (photo) {
        setPreviewVisible(true);
        setCapturedImage(photo);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const savePhoto = () => {
    if (capturedImage) {
      MediaLibrary.saveToLibraryAsync(capturedImage.uri).then(() => {
        setCapturedImage(null); // Resetting capturedImage after saving
      });
      setPreviewVisible(false);
    }
  };

  const retakePicture = () => {
    setPreviewVisible(false);
    setCapturedImage(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {previewVisible && capturedImage ? (
        <CameraPreview
          photo={capturedImage}
          savePhoto={savePhoto}
          retakePicture={retakePicture}
        />
      ) : (
        <>
          <View style={styles.cameraWrapper}>
            <Pressable
              onPress={handleFlashMode}
              style={[
                styles.flashButton,
                flashMode === 'off'
                  ? styles.flashButtonOff
                  : styles.flashButtonOn,
              ]}
            >
              {flashMode === 'on' ? (
                <Text style={styles.flashButtonText}>Flash On</Text>
              ) : (
                <Text style={styles.flashButtonText}>Flash Off</Text>
              )}
            </Pressable>
            <Camera style={{ height }} ref={cameraRef} />
          </View>
          <Pressable onPress={handleTakePicture} style={styles.captureButton}>
            <View style={styles.captureButtonInner} />
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  captureButton: {
    position: 'absolute',
    borderWidth: 4,
    borderColor: '#fff',
    bottom: '10%',
    left: '50%',
    width: 80,
    height: 80,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -40 }], // Adjusted for smaller button
  },
  captureButtonInner: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  flashButton: {
    width: 60,
    height: 40,
    borderRadius: 50,
    position: 'absolute',
    zIndex: 200,
    top: '2%',
    right: '2%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashButtonOff: {
    backgroundColor: '#000',
  },
  flashButtonOn: {
    backgroundColor: '#ff0',
  },
  flashButtonText: {
    color: '#000', // Adjusted text color
  },
});

export default CameraWrapper;

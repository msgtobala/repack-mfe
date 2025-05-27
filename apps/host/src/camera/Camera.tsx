import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text, Image, Modal } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { requestCameraPermissions } from './CameraPermissions';
import type { Camera as CameraType, PhotoFile } from 'react-native-vision-camera';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const devices = useCameraDevices();
  const device = devices.find((device) => device.position === 'back');
  const cameraRef = useRef<CameraType>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        await requestCameraPermissions();
        setHasPermission(true);
      } catch (err) {
        console.error('Permission error:', err);
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const capturedPhoto = await cameraRef.current.takePhoto({
          flash: 'off',
        });
        setPhoto(capturedPhoto);
        console.log('Captured:', capturedPhoto);
      } catch (err) {
        console.error('Capture error:', err);
      }
    }
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsCameraOpen(true)}>
        <Text style={styles.openCameraText}>Open Camera</Text>
      </TouchableOpacity>
      <Modal style={styles.modal} animationType="slide" transparent={true} visible={isCameraOpen}>
        <Camera ref={cameraRef} style={styles.camera} device={device} isActive={true} photo={true} />
        <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
          <Text style={styles.captureText}></Text>
        </TouchableOpacity>

        {photo && (
          <TouchableOpacity onPress={() => setIsCameraOpen(false)}>
            <Image source={{ uri: 'file://' + photo.path }} style={styles.preview} />
          </TouchableOpacity>
        )}
      </Modal>
      {photo && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: 'file://' + photo.path }} style={styles.previewImage} />
          <TouchableOpacity onPress={() => setPhoto(null)}>
            <Text>Delete Photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  modal: {
    alignItems: 'center',
  },
  captureText: {
    fontSize: 18,
    borderColor: '#fff',
    borderRadius: 100,
    width: 70,
    height: 70,
    borderWidth: 2,
    backgroundColor: '#ffffffaa',
  },
  openCameraText: {
    fontSize: 18,
    color: '#000',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  preview: {
    width: 100,
    height: 150,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  previewContainer: {},
  previewImage: {
    width: 100,
    height: 150,
  },
});

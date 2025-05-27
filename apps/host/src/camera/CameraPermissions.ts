// CameraPermissions.ts
import { Camera } from 'react-native-vision-camera';

export async function requestCameraPermissions() {
  const cameraPermission = await Camera.requestCameraPermission();
  const microphonePermission = await Camera.requestMicrophonePermission();

  if (cameraPermission !== 'granted') {
    throw new Error('Camera permission denied');
  }
  if (microphonePermission !== 'granted') {
    throw new Error('Microphone permission denied');
  }
}

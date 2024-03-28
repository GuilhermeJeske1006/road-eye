import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Camera, useCameraDevices, CameraPosition } from "react-native-vision-camera";

export default function CameraComponent() {
    const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
    const [isFlash, setIsFlash] = useState<boolean>(false);

    const devices = useCameraDevices();
    const device = devices[cameraPosition];
  
    function handleToggleCameraPosition() {
      setCameraPosition(prevState => prevState === 'front' ? 'back' : 'front');
    }
  
    function handleToggleFlash() {
      if(cameraPosition === 'front') {
        return Alert.alert('Flash indisponível na câmera frontal');
      }
      setIsFlash(prevState => !prevState);
    }

    return(
    <Camera
        style={styles.image}
        device={device}
        torch={isFlash ? 'on' : 'off'}
        isActive={true}
      />
    )
}

const styles = StyleSheet.create({
    image: {
     flex: 1,
    },
})

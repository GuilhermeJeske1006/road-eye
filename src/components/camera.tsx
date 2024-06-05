import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import BtnFloating from "./geral/btn-floating";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { getStudentPeriod, putUpdateImage } from "../store/Route/thunks";
import * as FileSystem from "expo-file-system";
import Loading from "./geral/loading";

export default function CameraComponent(props: {
  setOpenCamera: (openCamera: boolean) => void;
  people?: any;
}) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facing, setFacing] = useState<any>("back");
  const cameraRef = useRef<CameraView>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<any>();
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState<any>();

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      setHasPermission(status == "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text> Acesso negado </Text>;
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  async function takePicture() {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      try {
        const base64Image = await imageToBase64(data.uri);
        setImage(base64Image);
      } catch (error) {
        console.error("Erro ao converter imagem para base64:", error);
      }
    }
  }

  async function imageToBase64(uri) {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  }

  async function sendPicture() {
    if (capturedPhoto) {
      try {
        setLoading(true);
        console.log("Loading começou");
        await dispatch(putUpdateImage(props.people?.studentRoute?.id, image));
      } catch (error) {
        console.error("Erro ao enviar imagem:", error);
      } finally {
        const currentDate = new Date().toISOString().split("T")[0];
        await dispatch(getStudentPeriod("", currentDate));
        console.log("Loading terminou");
        setLoading(false);
        props.setOpenCamera(false);
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <CameraView style={styles.image} facing={facing} ref={cameraRef}>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => props.setOpenCamera(false)}
                style={{
                  alignItems: "flex-start",
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                <Icon name="close" size={25} color="#FFF" />
              </TouchableOpacity>

              {props.people && (
                <TouchableOpacity style={[styles.cardName, { marginTop: 30 }]}>
                  <Text style={styles.buttonText}>
                    Tirar foto de {props.people.studentRoute.user.name}{" "}
                  </Text>
                </TouchableOpacity>
              )}
              <BtnFloating
                icon="camera-flip-outline"
                fn={toggleCameraFacing}
                right={5}
                top={150}
              />
              <TouchableOpacity
                onPress={takePicture}
                style={[styles.buttonCamera, { marginTop: 30 }]}
              >
                <Text style={styles.buttonText}>Tirar a foto</Text>
              </TouchableOpacity>
            </View>
          </CameraView>

          {capturedPhoto && (
            <Modal animationType="slide" transparent={false} visible={true}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 20,
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: 450,
                    borderRadius: 20,
                    margin: 10,
                  }}
                  source={{ uri: capturedPhoto }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 30,
                    justifyContent: "center",
                    left: 0,
                    right: 0,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setCapturedPhoto(null)}
                    style={[styles.button]}
                  >
                    <Text style={styles.buttonText}>Retirar outra</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={sendPicture}
                    style={[styles.button]}
                  >
                    <Text style={styles.buttonText}>Enviar foto</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    zIndex: 999999,
  },
  buttonModal: {
    backgroundColor: "#121212",
    padding: 20,
    color: "#fff",
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#BC1C2C",
    padding: 20,
    borderRadius: 20,
    fontSize: 20,
    margin: 10,
    color: "#fff",
  },
  cardName: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDB047",
    padding: 20,
    borderRadius: 20,
    fontSize: 20,
    margin: 50,
    position: "absolute",
    top: 20,
    color: "#fff",
    right: 0,
    left: 0,
  },

  buttonCamera: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#BC1C2C",
    padding: 20,
    borderRadius: 20,
    fontSize: 20,
    margin: 10,
    color: "#fff",
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
    justifyContent: "center",
    left: 0,
    right: 0,
  },
});

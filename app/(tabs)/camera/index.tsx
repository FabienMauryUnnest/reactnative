import { Pressable } from "react-native";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions, type CameraType } from "expo-camera";
import { Image } from "expo-image";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { styles } from "./styles";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const openCamera = async () => {
    if (!permission?.granted) {
      const p = await requestPermission();
      if (!p.granted) return;
    }

    setShowCamera(true);
  };

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (!photo?.uri) return;

    setPhotoUri(photo.uri);
    setShowCamera(false);
  };

  const toggleFacing = () => {
    setFacing((cur) => (cur === "back" ? "front" : "back"));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.headerImagePhoto}
            contentFit="cover"
          />
        ) : (
          <ThemedView />
        )
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Camera
        </ThemedText>
      </ThemedView>

      {!showCamera ? (
        <Pressable onPress={openCamera} style={styles.button}>
          <ThemedText type="subtitle">Ouvrir la caméra</ThemedText>
        </Pressable>
      ) : (
        <ThemedView style={styles.cameraWrap}>
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />

          <ThemedView style={styles.cameraActions}>
            <Pressable onPress={toggleFacing} style={styles.smallButton}>
              <ThemedText>Flip</ThemedText>
            </Pressable>
            <Pressable onPress={takePhoto} style={styles.smallButton}>
              <ThemedText>Photo</ThemedText>
            </Pressable>
            <Pressable
              onPress={() => setShowCamera(false)}
              style={styles.smallButton}
            >
              <ThemedText>Fermer</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      )}

      {photoUri ? (
        <ThemedView style={styles.previewCard}>
          <ThemedText type="subtitle">Dernière photo</ThemedText>
          <Image
            source={{ uri: photoUri }}
            style={styles.previewImage}
            contentFit="cover"
          />
        </ThemedView>
      ) : null}
    </ParallaxScrollView>
  );
}

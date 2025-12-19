import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";

import { Image } from "expo-image";
import { useState } from "react";
import { styles } from "./styles";

export default function ImageScreen() {
  const [pickedUri, setPickedUri] = useState<string | null>(null);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;

    setPickedUri(result.assets[0].uri);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        pickedUri ? (
          <Image
            source={{ uri: pickedUri }}
            style={styles.headerPickedImage}
            contentFit="cover"
          />
        ) : (
          <ThemedView />
        )
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Images
        </ThemedText>
      </ThemedView>

      <Pressable onPress={pickImage} style={styles.button}>
        <ThemedText type="subtitle">Choisir une image</ThemedText>
      </Pressable>

      {pickedUri ? (
        <ThemedView style={styles.previewCard}>
          <ThemedText type="subtitle">Preview</ThemedText>
          <Image
            source={{ uri: pickedUri }}
            style={styles.previewImage}
            contentFit="cover"
          />
        </ThemedView>
      ) : null}
    </ParallaxScrollView>
  );
}

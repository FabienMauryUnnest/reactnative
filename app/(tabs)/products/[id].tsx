import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const products = [
  {
    id: "1",
    name: "Iphone 13",
    price: "19,99€",
    desc: "Lorem Iphone",
  },
  {
    id: "2",
    name: "Samsung S21",
    price: "29,99 €",
    desc: "Lorem Samsung",
  },
  {
    id: "3",
    name: "Pixel 6",
    price: "39,99 €",
    desc: "Lorem Pixel",
  },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Produit introuvable</ThemedText>
        <ThemedText onPress={() => router.back()} style={styles.link}>
          Retour
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{product.name}</ThemedText>
      <ThemedText style={styles.price}>{product.price}</ThemedText>
      <ThemedText>{product.desc}</ThemedText>

      <ThemedText onPress={() => router.back()} style={styles.link}>
        Retour
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  price: { opacity: 0.8 },
  link: { marginTop: 16, textDecorationLine: "underline" },
});

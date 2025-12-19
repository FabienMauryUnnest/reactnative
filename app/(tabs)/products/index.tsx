import { router } from "expo-router";
import { FlatList, Pressable } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { styles } from "./styles";

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

export default function Products() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Products
        </ThemedText>
      </ThemedView>
      <ThemedText>Liste des produits</ThemedText>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/products/[id]",
                params: { id: item.id },
              })
            }
          >
            <ThemedView style={styles.card}>
              <ThemedText type="subtitle">{item.name}</ThemedText>
              <ThemedText>{item.price}</ThemedText>
            </ThemedView>
          </Pressable>
        )}
      />
    </ParallaxScrollView>
  );
}

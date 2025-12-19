import { Image } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { postsService, Post } from "@/api/posts.service";

import { styles } from "./styles";


export default function ApiScreen() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createPost = useMutation({
    mutationFn: postsService.create,
    onSuccess: (created) => {
      queryClient.setQueryData<Post[]>(["posts"], (old) =>
        old ? [created, ...old] : [created]
      );
      setTitle("");
      setBody("");
    },
  });

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getAll,
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">API</ThemedText>
        <ThemedText type="default">API - Training</ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Créer un post</ThemedText>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="red"
        />

        <TextInput
          placeholder="Body"
          value={body}
          onChangeText={setBody}
          style={[styles.input, styles.textarea]}
          placeholderTextColor="red"
          multiline
        />
      </ThemedView>

      <Pressable
        style={[styles.button, (!title || !body) && styles.buttonDisabled]}
        disabled={!title || !body || createPost.isPending}
        onPress={() => createPost.mutate({ title, body, userId: 1 })}
      >
        <ThemedText type="defaultSemiBold">
          {createPost.isPending ? "Création du post..." : "Créer un post"}
        </ThemedText>
      </Pressable>

      {createPost.isError && (
        <ThemedText style={{ color: "red" }}>
          Erreur de création :{" "}
          {(createPost.error as Error)?.message ?? "unknown"}
        </ThemedText>
      )}

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Liste des posts</ThemedText>

        {postsQuery.isLoading && (
          <ActivityIndicator style={{ marginTop: 12 }} />
        )}

        {postsQuery.isError && (
          <ThemedText style={{ color: "red" }}>
            {(postsQuery.error as Error)?.message ?? "unknown"}
          </ThemedText>
        )}

        {postsQuery.data && (
          <FlatList
            data={postsQuery.data.slice(0, 20)}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <ThemedView style={{ backgroundColor: "red", height: 5 }} />
            )}
            renderItem={({ item }) => (
              <ThemedView style={styles.card}>
                <ThemedText type="defaultSemiBold" numberOfLines={1}>
                  {item.id} | {item.title}
                </ThemedText>
                <ThemedText numberOfLines={2}>{item.body}</ThemedText>
              </ThemedView>
            )}
          />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

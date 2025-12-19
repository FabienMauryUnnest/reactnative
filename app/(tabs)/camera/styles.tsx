import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleContainer: { flexDirection: "row", gap: 8, marginBottom: 16 },

  button: {
    marginTop: 12,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.08)",
    alignItems: "center",
  },

  cameraWrap: { marginTop: 12, marginBottom: 12, gap: 10 },
  camera: { width: "100%", height: 300, borderRadius: 12, overflow: "hidden" },
  cameraActions: { flexDirection: "row", gap: 10 },
  smallButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.08)",
    alignItems: "center",
  },

  previewCard: {
    gap: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginBottom: 12,
  },
  previewImage: { width: "100%", height: 180, borderRadius: 12 },

  headerImagePhoto: { width: "100%", height: "100%" },
});

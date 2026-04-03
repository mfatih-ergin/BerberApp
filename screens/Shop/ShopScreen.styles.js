import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroContainer: {
    height: 180,
    width: "100%",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  content: {
    paddingHorizontal: 20,
    marginTop: -40,
  },
  infoCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  fullName: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  shopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  shopName: {
    fontSize: 15,
    fontWeight: "600",
  },
  verifiedBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    width: "100%",
    marginBottom: 20,
  },
  detailsContainer: {
    gap: 15,
    marginBottom: 25,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailText: {
    fontSize: 15,
    fontWeight: "500",
  },
  editButton: {
    height: 54,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 2,
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

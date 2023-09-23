import { StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
  },
  header: {
    padding: 25,
  },
  headerText: {
    marginTop: 30,
    fontSize: 24,
    lineHeight: 45,
    color: "#FFF",
  },
  noResult: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  containerInput: {
    backgroundColor: "#67686D",
    height: 42,
    padding: 10,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  input: {
    color: "#FFF",
    width: "80%",
    paddingLeft: 15,
  },
  genreListContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: "#242e32",
  },
  genreListContent: {
    paddingRight: 20,
  },
  genreText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    fontSize: 16,
    color: "#0296e5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0296e5",
  },
  selectedGenreText: {
    backgroundColor: "#0296e5",
    color: "#242e32",
  },
  movieListContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#242e32",
  },
  movieListContent: {
    paddingBottom: 100,
  },
  movieDetailsModal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  movieOverview: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#0296e5",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  cardContainer: {
    flex: 1,
    margin: 8, // Ajuste conforme necessário para a área de toque
    alignItems: "center",
  },
  moviePoster: {
    width: 120,
    height: 180,
    marginBottom: 8, // Espaçamento inferior da imagem
    resizeMode: "cover",
  },
  movieItemContainer: {
    flex: 1 / 3,
    marginBottom: 15,
  },
  movieBanner: {
    width: "100%",
    height: 200, // Altura desejada para os banners
    borderRadius: 10,
    marginBottom: 10,
  },
});

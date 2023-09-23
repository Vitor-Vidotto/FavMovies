import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { MagnifyingGlass } from "phosphor-react-native";
import { api } from "../../services/api";
import { styles } from "./styles";
import { CardMovies } from "../../components/CardMovies";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/movie/popular", {
        params: {
          page,
        },
      });
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query: string) => {
    setLoading(true);
    try {
      const response = await api.get("/search/movie", {
        params: { query },
      });
      if (response.data.results.length === 0) {
        setNoResult(true);
        setMovies([]);
      } else {
        setMovies(response.data.results);
        setNoResult(false);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      searchMovies(text);
    } else {
      setNoResult(false);
      loadMoreData();
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
        <View style={styles.containerInput}>
          <TextInput
            placeholderTextColor={"#FFF"}
            placeholder="Buscar"
            style={styles.input}
            value={search}
            onChangeText={handleSearch}
          />
          <MagnifyingGlass color="#FFF" size={25} weight="light" />
        </View>
        {noResult && (
          <Text style={styles.noResult}>
            Nenhum filme encontrado para: {search}!
          </Text>
        )}
      </View>
      <View>
        <FlatList
          data={movies}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleMovieSelect(item)}
              style={styles.movieItemContainer}
            >
              <CardMovies data={item} />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={() => loadMoreData()}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            padding: 35,
            paddingBottom: 100,
          }}
        />
        {loading && <ActivityIndicator size={50} color="#0296e5" />}
      </View>
      {selectedMovie && (
        <Modal isVisible={selectedMovie !== null}>
          <View style={styles.movieDetailsModal}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`,
              }}
              style={styles.moviePoster}
            />
            <Text style={styles.movieTitle}>{selectedMovie.title}</Text>
            <Text style={styles.movieOverview}>{selectedMovie.overview}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedMovie(null)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}
``;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { styles } from "./styles";
import { api } from "../../services/api";
import { CardMovies } from "../../components/CardMovies";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface Genre {
  id: number;
  name: string;
}

export function Home() {
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>(
    {}
  );
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadGenres();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      loadMoviesByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  const loadGenres = async () => {
    setLoading(true);
    const response = await api.get("/genre/movie/list");
    setGenres(response.data.genres);
    setLoading(false);

    // Seleciona a primeira categoria como padrão, se houver
    if (response.data.genres.length > 0) {
      handleGenreSelect(response.data.genres[0].id.toString());
    }
  };

  const loadMoviesByGenre = async (genreId: string) => {
    setLoading(true);
    const response = await api.get("/discover/movie", {
      params: {
        with_genres: genreId,
      },
    });

    setMoviesByGenre((prevMoviesByGenre) => ({
      ...prevMoviesByGenre,
      [genreId]: response.data.results,
    }));

    setLoading(false);
  };

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const movieData = selectedGenre ? moviesByGenre[selectedGenre] || [] : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text
              style={[
                styles.genreText,
                selectedGenre === item.id.toString() &&
                  styles.selectedGenreText,
              ]}
              onPress={() => handleGenreSelect(item.id.toString())}
            >
              {item.name}
            </Text>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreListContent}
        />
      </View>
      <View style={styles.movieListContainer}>
        <FlatList
          data={movieData}
          numColumns={3}
          renderItem={({ item }) => (
            <CardMovies data={item} onPress={() => handleMovieSelect(item)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.movieListContent}
        />
        {loading && <ActivityIndicator size={50} color="#0296e5" />}
      </View>
      <Modal isVisible={selectedMovie !== null}>
        <View style={styles.movieDetailsModal}>
          {selectedMovie && (
            <>
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
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

import {ActivityIndicator, FlatList, Image, ScrollView, Text, View, Pressable} from "react-native";
import {useRouter} from "expo-router"
import {useFocusEffect} from "@react-navigation/native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {fetchMovies, testTMDBConnection} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {getTrendingMovies} from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import {useEffect, useState, useCallback} from "react";

export default function Index() {
    const router = useRouter();
    
    // Manual state management instead of useFetch
    const [trendingMovies, setTrendingMovies] = useState<any[] | null>(null);
    const [trendingLoading, setTrendingLoading] = useState(true);
    const [trendingError, setTrendingError] = useState<Error | null>(null);
    
    const [movies, setMovies] = useState<any[] | null>(null);
    const [moviesLoading, setMoviesLoading] = useState(true);
    const [moviesError, setMoviesError] = useState<Error | null>(null);

    // Function to refresh trending movies
    const refreshTrendingMovies = useCallback(async () => {
        try {
            setTrendingLoading(true);
            const trendingData = await getTrendingMovies();
            setTrendingMovies(trendingData || []);
        } catch (error) {
            setTrendingError(error as Error);
        } finally {
            setTrendingLoading(false);
        }
    }, []);

    // Refresh trending movies when tab becomes focused
    useFocusEffect(
        useCallback(() => {
            refreshTrendingMovies();
        }, [refreshTrendingMovies])
    );

    // Test API connection and fetch initial data on component mount
    useEffect(() => {
        const loadInitialData = async () => {
            // Test TMDB connection
            const isConnected = await testTMDBConnection();
            
            if (isConnected) {
                // Fetch movies (only once on mount)
                try {
                    setMoviesLoading(true);
                    const moviesData = await fetchMovies({ query: '' });
                    setMovies(moviesData);
                } catch (error) {
                    setMoviesError(error as Error);
                } finally {
                    setMoviesLoading(false);
                }
            } else {
                setMoviesError(new Error('API connection failed'));
                setMoviesLoading(false);
            }
        };
        
        loadInitialData();
    }, []);

    return (
        <View className="flex-1 bg-primary">
            <Image 
                source={images.bg} 
                className="absolute w-full h-full z-0 bg-image-mobile" 
                resizeMode="cover"
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <ScrollView className="flex-1 px-5"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ minHeight: "100%", paddingBottom: 20 }}>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

            {moviesLoading || trendingLoading ? (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="mt-10 self-center"
                />
            ) : moviesError || trendingError ? (
                <View className="mt-10">
                    <Text className="text-red-500 text-center mb-2">
                        Error loading data:
                    </Text>
                    {moviesError && (
                        <Text className="text-red-400 text-center mb-2">
                            Movies: {moviesError.message}
                        </Text>
                    )}
                    {trendingError && (
                        <Text className="text-red-400 text-center mb-2">
                            Trending: {trendingError.message}
                        </Text>
                    )}
                </View>
            ) : (
                <View className="flex-1 mt-5">
                    <SearchBar
                        onFocus={() => router.push("/search")}
                        onPress={() => router.push("/search")}
                        placeholder="Search for a movie"
                    />

                    {trendingMovies && trendingMovies.length > 0 ? (
                        <View className="mt-10">
                            <Text className="text-lg text-white font-bold mb-3">
                                Trending Movies ({trendingMovies.length})
                            </Text>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() =>
                                    <View className="w-4" />}
                                className="mb-4 mt-3"
                                data={trendingMovies}
                                renderItem={({ item, index }) => (
                                    <TrendingCard movie={item} index={index} />
                                )}
                                keyExtractor={(item, index) => item.$id || `trending-${index}-${item.movie_id}`}
                            />
                        </View>
                    ) : (
                        <View className="mt-10 mb-5">
                            <Text className="text-yellow-400 text-center mb-3 text-sm">
                                {trendingLoading ? 'Loading trending movies...' : 
                                 trendingError ? `Error: ${String(trendingError)}` :
                                 Array.isArray(trendingMovies) && trendingMovies.length === 0 ? 'No trending movies found (Search for movies to create trends)' :
                                 'Database not accessible - please check your connection'}
                            </Text>
                            {!trendingLoading && !trendingError && Array.isArray(trendingMovies) && trendingMovies.length === 0 && (
                                <View className="items-center">
                                    <Text className="text-gray-400 text-center text-xs">
                                        Search for movies to populate trending data
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}

                    <Text className="text-lg text-white font-bold mt-5 mb-3">
                        Latest Movies ({movies?.length || 0})
                    </Text>
                    <FlatList
                        data={movies}
                        renderItem={({ item }) => (
                            <MovieCard
                                {... item}
                            />
                        )}
                        keyExtractor={(item, index) => `movie-${item.id}-${index}`}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent: 'flex-start',
                            gap: 20,
                            paddingRight: 5,
                            marginBottom: 10
                        }}
                        className="mt-2 pb-32"
                        scrollEnabled={false}
                    />
                </View>
            )}
        </ScrollView>
    </View>
  );
}


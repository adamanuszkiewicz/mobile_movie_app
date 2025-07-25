import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from "react-native";
import {useRouter} from "expo-router"
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {getTrendingMovies} from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
    const router = useRouter();

    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError
    } = useFetch(getTrendingMovies);

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch(() => fetchMovies({
        query: ''
    }))

    // Debug logging
    console.log('Trending Movies Debug:', {
        trendingMovies,
        trendingLoading,
        trendingError: trendingError?.message,
        arrayLength: trendingMovies?.length
    });

  return (
    <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0 "/>
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
                                <Text className="text-gray-400 text-center text-xs">
                                    Tip: Search for movies to populate trending data
                                </Text>
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


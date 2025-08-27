import {View, Text, Image, FlatList, ActivityIndicator} from "react-native"
import React, {useEffect, useState} from 'react'
import {images} from "@/constants/images";
import {fetchMovies, testTMDBConnection} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {updateSearchCount} from "@/services/appwrite";

const Search = () => {
    const [searchQuery , setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    
    // Manual state management instead of useFetch
    const [movies, setMovies] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Ensure component is mounted before running effects
    useEffect(() => {
        setMounted(true);
    }, []);

    // Test API connection on component mount
    useEffect(() => {
        testTMDBConnection();
    }, []);

    const loadMovies = async () => {
        try {
            setLoading(true);
            setError(null);
            const moviesData = await fetchMovies({ query: searchQuery });
            setMovies(moviesData || []);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setMovies(null);
        setLoading(false);
        setError(null);
    };

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset()
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        // Only run after component is mounted and for searches with 3+ characters
        if (mounted && movies && movies.length > 0 && movies[0] && searchQuery.trim().length >= 3) {
            const timeoutId = setTimeout(() => {
                updateSearchCount(searchQuery, movies[0]).catch(error => {
                    console.error('Failed to update search count:', error);
                });
            }, 500);
            
            return () => clearTimeout(timeoutId);
        }
    }, [mounted, movies, searchQuery]);

    return (
        <View className="flex-1 bg-primary">
            <Image 
                source={images.bg} 
                className="absolute w-full h-full z-0 bg-image-mobile" 
                resizeMode="cover"
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard { ... item} />}
                keyExtractor={(item, index) => `search-${item.id}-${index}`}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                  <>
                      <View className="w-full flex-row justify-center mt-20 items-center">
                          <Image source={icons.logo} className="w-12 h-10" />
                      </View>

                      <View className="my-5">
                          <SearchBar
                              placeholder="Search Movies ..."
                              value={searchQuery}
                              onChangeText={(text: string) => setSearchQuery(text)}
                          />
                      </View>

                      {loading && (
                          <ActivityIndicator size="large" color="#0000ff" className="my-3" />
                      )}

                      {error && (
                          <Text className="text-red-500 px-5 my-3">
                            Error: {error.message}
                          </Text>
                      )}

                      {!loading && !error && searchQuery.trim() && movies && movies.length > 0 && (
                          <Text className="text-xl text-white font-bold">
                              Search Results for {' '}
                              <Text className="text-accent">
                                  {searchQuery}
                              </Text>
                          </Text>
                      )}
                  </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500" >
                                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
}

export default Search

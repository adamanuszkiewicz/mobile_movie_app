import { Platform } from "react-native";

// Import both SDKs
let Client, Databases, Query, ID;

// Use platform-specific SDK
if (Platform.OS === 'web') {
    const webSdk = require('appwrite');
    Client = webSdk.Client;
    Databases = webSdk.Databases;
    Query = webSdk.Query;
    ID = webSdk.ID;
} else {
    const nativeSdk = require('react-native-appwrite');
    Client = nativeSdk.Client;
    Databases = nativeSdk.Databases;
    Query = nativeSdk.Query;
    ID = nativeSdk.ID;
}

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const getTrendingMovies = async () => {
    try {
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc('count'),
            Query.limit(20)
        ]);
        return response.documents;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
};

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        // Check if this movie title already exists in trending (to prevent duplicates)
        const existingMovie = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('title', movie.title)
        ]);

        if (existingMovie.documents.length > 0) {
            // Update existing movie entry (increment count regardless of search query)
            const doc = existingMovie.documents[0];
            const movieId = Math.floor(Number(movie.id));
            
            const updateResult = await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
                searchTerm: query,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_id: movieId
            });
            return updateResult;
        } else {
            // Create new movie entry
            const movieId = Math.floor(Number(movie.id));
            
            const createResult = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                count: 1,
                searchTerm: query,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_id: movieId
            });
            return createResult;
        }
    } catch (error) {
        console.error('Error updating search count:', error);
        throw error;
    }
};

// Interface for movie data
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
}

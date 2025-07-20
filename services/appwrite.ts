// track the searches made by a user

import {Client, Databases, Query, ID} from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ])

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

    // check if a record of that search has already been stored
    // if a document is found, increment the searchCount field
    // if no document id found, create a new document in Appwrite database. Initialize its count to 1
}

export const getTrendingMovies = async(): Promise<TrendingMovie[] | undefined> => {
    try {
        console.log('Fetching trending movies from Appwrite...');
        console.log('Database ID:', DATABASE_ID);
        console.log('Collection ID:', COLLECTION_ID);
        
        // Check if Appwrite client is properly initialized
        if (!database) {
            console.error('Appwrite database client not initialized');
            return [];
        }
        
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        console.log('Appwrite result:', {
            total: result.total,
            documentsLength: result.documents.length,
            documents: result.documents
        });

        // Return empty array if no documents found, instead of undefined
        if (!result.documents || result.documents.length === 0) {
            console.log('No trending movies found in database');
            return [];
        }

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log('Error fetching trending movies:', error);
        
        // More detailed error logging
        if (error instanceof Error) {
            console.log('Error name:', error.name);
            console.log('Error message:', error.message);
            console.log('Error stack:', error.stack);
        }
        
        // Return empty array instead of undefined on error
        return [];
    }
}
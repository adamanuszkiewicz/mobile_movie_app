import {useEffect, useState} from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null)
            
            console.log('useFetch: Starting fetch operation');
            const result = await fetchFunction();
            console.log('useFetch: Fetch completed successfully', result);

            setData(result);
        }   catch (err) {
            console.log('useFetch: Fetch error', err);
            //@ts-ignore
            setError(err instanceof Error ? err : new Error('An error occurred'));
        }   finally {
            setLoading(false)
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        console.log('useFetch: useEffect triggered, autoFetch:', autoFetch);
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch]);
    
    return { data, error, loading, refetch: fetchData, reset };
}

export default useFetch
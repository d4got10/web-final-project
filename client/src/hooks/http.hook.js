import {useState, useCallback} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [forcedLogout, setForcedLogout] = useState(false);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        setForcedLogout(false);
        try{
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if(!response.ok){
                if(data.logout)
                    setForcedLogout(true);

                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false);

            return data;
        } catch (e){
            setLoading(false);
            if(e.message.includes('E11000')){
                setError('Такая запись уже существует');
            }else{
                setError(e.message);
            }
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError, forcedLogout}
}
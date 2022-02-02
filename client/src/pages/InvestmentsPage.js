import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {InvestmentsList} from "../components/InvestmentsList";

export const InvestmentPage = () => {
    const [investments, setInvestments] = useState(null);
    const {loading, request, forcedLogout} = useHttp();
    const {token, logout} = useContext(AuthContext);

    const fetchInvestments = useCallback(async () => {
        try{
            const fetched = await request('api/investment/all', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setInvestments([...fetched]);
        }catch (e){
            console.log(e.message);
        }
    }, [token, request, setInvestments])


    useEffect(() => {
        fetchInvestments();
    }, [fetchInvestments])


    useEffect(() => {
        if(forcedLogout)
            logout();
    }, [forcedLogout, logout])


    if(loading){
        return <Loader/>
    }

    return (
        <>
            {!loading && <InvestmentsList investments={investments}/>}
        </>
    )
}
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {InvestmentCard} from "../components/InvestmentCard";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {Loader} from "../components/Loader";
import {useParams} from "react-router-dom";

export const DetailPage = () => {
    const auth = useContext(AuthContext);
    const {token, logout} = auth;
    const {loading, request, error, clearError, forcedLogout} = useHttp(auth);
    const message = useMessage();
    const id = useParams().id;
    const [investment, setInvestment] = useState(null);


    const fetchInvestment = useCallback(async () => {
        const data = await request(`/api/investment/${id}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        });
        setInvestment(data);
    }, [id, request, setInvestment, token]);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    useEffect(() => {
        if(forcedLogout)
            logout();
    }, [forcedLogout, logout])

    useEffect(() => {
        fetchInvestment();
    }, [fetchInvestment])

    const onDeleteHandler = async () => {
        const data = await request(`/api/investment/${id}`, 'DELETE', null, {
            Authorization: `Bearer ${token}`
        });
    }

    if(loading){
        return <Loader/>
    }

    return (
        <div>
            {!loading && <InvestmentCard investment={investment} onDeleteHandler={onDeleteHandler}/>}
        </div>
    )
}
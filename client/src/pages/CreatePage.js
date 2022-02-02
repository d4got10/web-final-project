import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import {InputRow} from "../components/InputRow";


export const CreatePage = () => {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError, forcedLogout} = useHttp(auth);
    const message = useMessage();
    const [form, setForm] = useState({
        itemUrl: '',
        amount: 1,
        averageBuyPrice: 0.01,
        purchaseDate: Date.now()
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const createHandler = async () => {
        try{
            const data = await request('/api/investment/', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            });
            message(data.message);
        }catch (e) {}
    }

    useEffect(() => {
        if(forcedLogout)
            auth.logout();
    }, [forcedLogout, auth])

    return (
        <>
            <div className="card" style={{marginTop: '10px'}}>
                <InputRow
                    id={"itemUrl"}
                    name={"Ссылка на предмет"}
                    type={"text"}
                    placeholder={"Вставьте ссылку на предмет"}
                    changeHandler={changeHandler}
                />
                <InputRow
                    id={"amount"}
                    name={"Количество"}
                    type={"number"}
                    placeholder={"Введите количество"}
                    changeHandler={changeHandler}
                />
                <InputRow
                    id={"averageBuyPrice"}
                    name={"Средняя цена покупки"}
                    type={"number"}
                    placeholder={"Введите среднюю цену покупки"}
                    changeHandler={changeHandler}
                />
                <InputRow
                    id={"purchaseDate"}
                    name={"Дата покупки"}
                    type={"date"}
                    placeholder={"Выберите дату покупки"}
                    changeHandler={changeHandler}
                />
                <div className="row">
                    <div className="col s2 offset-s5 mb-10">
                        <button
                            className="btn yellow darken-4"
                            onClick={createHandler}
                            disabled={loading}
                        >
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
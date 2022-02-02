import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const InputRow = ({id, name, type, placeholder, changeHandler}) => (
    <div className="row">
        <div className="col s8 offset-s2">
            <div className="input-field">
                <input
                    placeholder={placeholder}
                    id={id}
                    type={type}
                    name={id}
                    onChange={changeHandler}
                />
                <label htmlFor={id}>{name}</label>
            </div>
        </div>
    </div>
);

export const ItemsPage = () => {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError, forcedLogout} = useHttp(auth);
    const message = useMessage();
    const [form, setForm] = useState({
        name: '',
        imageUrl: ''
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
            const data = await request('/api/item/', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            });
            console.log('Data', data);
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
                    id={"name"}
                    name={"Название"}
                    type={"text"}
                    placeholder={"Введите название предмета"}
                    changeHandler={changeHandler}
                />
                <InputRow
                    id={"imageUrl"}
                    name={"Ссылка на картинку предмета"}
                    type={"text"}
                    placeholder={"Введите ссылку на картинку предмета"}
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
import React from "react";

export const InputRow = ({id, name, type, placeholder, changeHandler}) => (
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
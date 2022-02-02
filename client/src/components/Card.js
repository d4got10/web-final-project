import React from 'react'

export const Card = ({title, text, link}) => {
    return(
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <span className="card-title">{title}</span>
                <p>{text}</p>
            </div>
            <div className="card-action">
                <a href={link}>This is a link</a>
            </div>
        </div>
    )
}
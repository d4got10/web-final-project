import React from 'react';

export const InvestmentCard = ({investment, onDeleteHandler}) => {
    if(!investment)
        return <p>Данные удалены</p>;

    const getImageForItem = (image) => {
        return `data:image/png;base64, ${image}`;
    }

    let rounded = function(number){
        return +number.toFixed(2);
    }

    const profit = rounded(investment.amount * (investment.item.currentPrice - investment.averageBuyPrice));
    const worth = rounded(investment.amount * investment.item.currentPrice);

    return(
        <div className="card grey lighten-4">
            <div className="card-content black-text">
                <div className="row">
                    <div className="col s6 center-align">
                        <span className="card-title light-blue-text card-title-text">{investment.item.name}</span>
                        <img src={investment.item.imageUrl}/>
                    </div>
                    <div className="col s6">
                        <div className="center-align">
                            <div>Количество предметов: {investment.amount}</div>
                            <div>Средняя цена покупки: {investment.averageBuyPrice}$</div>
                            <div>Текущая цена предмета: {investment.item.currentPrice}$</div>
                            <div>Всего вложено: {worth}$</div>
                            <div>Текущая бумажная прибыль: <span className={profit > 0 ? 'green-text' : 'red-text'}>{profit}$</span></div>
                        </div>
                        <div className="right-align">
                            <a className="waves-effect red btn" onClick={onDeleteHandler} href="/investments">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
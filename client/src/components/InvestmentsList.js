import React from "react";

export const InvestmentsList = ({investments}) => {
    console.log(investments);

    if(!investments || !investments.length){
        return <p className="center">Нет записей</p>
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }

    let rounded = function(number){
        return +number.toFixed(2);
    }

    return (
        <table className="striped">
            <thead>
            <tr>
                <th>Owner</th>
                <th>Item</th>
                <th>Worth</th>
                <th>Profit</th>
                <th>Purchase Date</th>
            </tr>
            </thead>
            <tbody>
            { investments.map(investment => {
                const profit = rounded(investment.amount * (investment.item.currentPrice - investment.averageBuyPrice));
                const worth = rounded(investment.amount * investment.item.currentPrice);
                return (
                    <tr key={investment._id}>
                        <td><img className="responsive-img" width={"75px"} src={investment.item.imageUrl} alt="item img"/></td>
                        <td>{investment.item.name}</td>
                        <td>{worth}</td>
                        <td className={profit > 0 ? 'green-text' : 'red-text'}>{profit}</td>
                        <td>{formatDate(new Date(investment.purchaseDate))}</td>
                        <td><a href={`/detail/${investment._id}`}>Подробнее</a></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}
import React, { useState } from 'react';

function Square({index, number, ticked, clickable, rowNumber, colours, onSquareClick}) {
    const boxSize = 34;
    const padding = 20;
    let onClick = clickable ? (() => onSquareClick(index)) : null;

    let shouldHighlight = clickable && !ticked;
    let style = shouldHighlight
        ? {backgroundColor: colours.background}
        : {backgroundColor: '#ccc'};
    style.color = colours.foreground;
    style.borderColor = colours.border;

    return <>
        <button
            className="square"
            onClick={onClick}
            style={style}
        >
            {number}
        </button>
    </>
}

function Cross({index, number, ticked, clickable, rowNumber, colours, onSquareClick}) {
    const boxSize = 34;
    const padding = 20;
    let onClick = clickable ? (() => onSquareClick(index)) : null;

    let shouldHighlight = clickable && !ticked;
    let style = shouldHighlight
        ? {backgroundColor: colours.background}
        : {backgroundColor: '#ccc'};
    style.color = colours.foreground;
    style.borderColor = colours.border;

    return <>
        <svg
            width={boxSize}
            height={boxSize}
            xmlns="http://www.w3.org/2000/svg"
            style={{
                "position": "relative",
                "left": -1,
                "top": -40,
                "margin-right": -2,
            }}
            visibility={ticked ? "visible" : "hidden"}
            onClick={onClick}
        >
            <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="black" />
            <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="black" />
        </svg>
    </>
}

function Row({rowNumber, numbers, colours}) {
    function toggleSquare(index) {
        console.assert(canClick(index))
        const nextSquares = squares.slice();
        nextSquares[index] = !nextSquares[index];
        setSquares(nextSquares);
    }

    function canClick(index) {
        if (index === squares.length - 1) {
            return squares.filter((x) => x).length >= 5;
        }

        return !squares.slice(index + 1).some((x) => x)
    }

    const [squares, setSquares] = useState(numbers.slice().fill(false));

    let squareJsx = squares.map((ticked, index) => (
        <Square
            index={index}
            number={numbers[index]}
            ticked={ticked}
            clickable={canClick(index)}
            rowNumber={rowNumber}
            colours={colours}
            onSquareClick={toggleSquare}
        />
    ));
    let crossJsx = squares.map((ticked, index) => (
        <Cross
            index={index}
            number={numbers[index]}
            ticked={ticked}
            clickable={canClick(index)}
            rowNumber={rowNumber}
            colours={colours}
            onSquareClick={toggleSquare}
        />
    ));
    return <>
        <div
            style={{backgroundColor: colours.border}}
            className="board-row"
        >
            {squareJsx}
        </div>
        <div className="board-row" style={{height: 0, margin: 0}}>
            {crossJsx}
        </div>
    </>;
}

export default function Board() {
    let rowValues = [
        {
            numbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            colours: {
                border: '#9a2d39',
                background: '#fbe0e5',
                foreground: '#e03c52',
            },
        },
        {
            numbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            colours: {
                border: '#dca35d',
                background: '#fafafa',
                foreground: '#ffe462',
            },
        },
        {
            numbers: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
            colours: {
                border: '#347d55',
                background: '#eaf3f1',
                foreground: '#29a060',
            },
        },
        {
            numbers: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
            colours: {
                border: '#2d2e49',
                background: '#e4e0f1',
                foreground: '#3a4a87',
            },
        },
    ];
    return <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1>Quixx</h1>
        {
            rowValues.map(
                (row, rowNumber)=>
                    <Row
                        rowNumber={rowNumber}
                        numbers={row.numbers}
                        colours={row.colours}
                    />
            )
        }
    </div>
}

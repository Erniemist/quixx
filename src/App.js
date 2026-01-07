import React, {useState} from 'react';

function Square({number, ticked, clickable, colours, onSquareClick}) {
    return <>
        <button
            className="square"
            onClick={onSquareClick}
            style={{
                backgroundColor: ((clickable && !ticked) ?  colours.squareBackground : '#ccc'),
                color: colours.foreground,
                borderColor: colours.border,
            }}
        >
            {number}
        </button>
    </>
}

function Cross({ticked}) {
    const boxSize = 34;

    return <>
        <svg
            width={boxSize}
            height={boxSize}
            xmlns="http://www.w3.org/2000/svg"
            style={{
                position: "relative",
                left: 1,
                top: -35,
                marginRight: -2,
                pointerEvents: "none",
            }}
            visibility={ticked ? "visible" : "hidden"}
        >
            <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="black" />
            <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="black" />
        </svg>
    </>
}

function Row({numbers, colours}) {
    function toggleSquare(index) {
        console.assert(canClick(index))
        const nextSquares = squares.slice();
        nextSquares[index] = !nextSquares[index];
        setSquares(nextSquares);
    }

    function getOnClick(index) {
        return canClick(index) ? (() => toggleSquare(index)) : null;
    }

    function canClick(index) {
        if (index === squares.length - 1) {
            return squares.filter((x) => x).length >= 5;
        }

        return !squares.slice(index + 1).some((x) => x)
    }

    const [squares, setSquares] = useState(numbers.slice().fill(false));

    function makeSquaresJsx() {
        return squares.map((ticked, index) => (
            <Square
                number={numbers[index]}
                ticked={ticked}
                clickable={canClick(index)}
                colours={colours}
                onSquareClick={getOnClick(index)}
            />
        ));
    }

    return <>
        <div style={{backgroundColor: colours.rowBackground, marginBottom: 3}}>
            <div
                style={{backgroundColor: colours.border, margin: 2, marginBottom: 0}}
                className="board-row"
            >
                {makeSquaresJsx()}
            </div>
            <div className="board-row" style={{height: 0, margin: 0}}>
                {squares.map((ticked) => (<Cross ticked={ticked}/>))}
            </div>
        </div>
    </>;
}

export default function Board() {
    let rowValues = [
        {
            numbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            colours: {
                rowBackground: '#e03a50',
                border: '#9a2d39',
                squareBackground: '#fbe0e5',
                foreground: '#e03c52',
            },
        },
        {
            numbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            colours: {
                rowBackground: '#ffe462',
                border: '#dca35d',
                squareBackground: '#fafafa',
                foreground: '#ffe462',
            },
        },
        {
            numbers: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
            colours: {
                rowBackground: '#29a060',
                border: '#347d55',
                squareBackground: '#eaf3f1',
                foreground: '#29a060',
            },
        },
        {
            numbers: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
            colours: {
                rowBackground: '#384987',
                border: '#2d2e49',
                squareBackground: '#e4e0f1',
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

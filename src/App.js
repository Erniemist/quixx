import React, {useEffect, useState} from 'react';

function Square({number, ticked, clickable, colours, size, borderWidth, onSquareClick}) {
    let value = number;
    if (ticked) {
        value = 'X';
    } else if (!clickable) {
        value = '';
    }
    return <>
        <button
            className="square"
            onClick={onSquareClick}
            style={{
                width: size,
                height: size,
                fontSize: size * 0.7,
                borderWidth: borderWidth,
                borderStyle: 'solid',
                borderRadius: size * 0.15,
                textAlign: 'center center',
                backgroundColor: ((clickable && !ticked) ?  colours.squareBackground : '#ccc'),
                color: ticked ? '#000' : colours.foreground,
                borderColor: colours.border,
            }}
        >
            {value}
        </button>
    </>
}


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {width, height};
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
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

    function makeSquaresJsx(squareSize, borderWidth) {
        return squares.map((ticked, index) => (
            <Square
                number={numbers[index]}
                ticked={ticked}
                clickable={canClick(index)}
                colours={colours}
                size={squareSize}
                borderWidth={borderWidth}
                onSquareClick={getOnClick(index)}
            />
        ));
    }

    let width = 1000;
    let squareSize = width / squares.length;
    let borderWidth = squareSize * 0.05;

    return <>
        <div style={{backgroundColor: colours.rowBackground, margin: squareSize * 0.06, width: width}}>
            <div
                style={{backgroundColor: colours.border, margin: borderWidth}}
                className="board-row"
            >
                {makeSquaresJsx(squareSize, borderWidth)}
            </div>
        </div>
    </>;
}

export default function Board() {
    let rowValues = [
        {
            numbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "🔓"],
            colours: {
                rowBackground: '#e03a50',
                border: '#9a2d39',
                squareBackground: '#fbe0e5',
                foreground: '#e03c52',
            },
        },
        {
            numbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "🔓"],
            colours: {
                rowBackground: '#ffe462',
                border: '#dca35d',
                squareBackground: '#fafafa',
                foreground: '#ffe462',
            },
        },
        {
            numbers: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "🔓"],
            colours: {
                rowBackground: '#29a060',
                border: '#347d55',
                squareBackground: '#eaf3f1',
                foreground: '#29a060',
            },
        },
        {
            numbers: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "🔓"],
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
            rowValues.map((
                row,
                rowNumber
            ) => <Row
                rowNumber={rowNumber}
                numbers={row.numbers}
                colours={row.colours}
            />)
        }
    </div>
}

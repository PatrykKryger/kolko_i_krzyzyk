import "./App.css";
import {useEffect, useRef, useState} from "react";

const calculateWinner = (cells) => {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(
            cells[a].innerText &&
            cells[a].innerText === cells[b].innerText &&
            cells[a].innerText === cells[c].innerText
        ){
            return cells[a].innerText;
        }
    }

    return null;
};

function App(){
    const board = useRef(null);
    const infoBox = useRef(null);
    const [player, setPlayer] = useState("X");
    const [moves, setMoves] = useState(0);
    const [winner, setWinner] = useState(null);

    const nextPlayer = () => {
        setPlayer(player === "X" ? "O" : "X");
        setMoves(moves + 1);
    };

    useEffect(() => {
        const cells = board.current.querySelectorAll(".cell");
        const winner = calculateWinner(cells);
        if (winner){
            setWinner(winner);
            infoBox.current.innerText = `WYGRAŁ GRACZ: ${winner}`;
        }else if (moves === 9){
            infoBox.current.innerText = `REMIS`;
        }else{
            infoBox.current.innerText = `NASTĘPNY GRACZ: ${player}`;
        }
    }, [moves, player]);

    const onClick = (e) => {
        if(winner || e.target.innerText){
            return;
        }
        e.target.innerText = player;
        nextPlayer();
    };

    return(
        <>
            <div ref={board} id={"board"}>
                <div className={"cell"} onClick={onClick}/>
                <div className={"cell"} onClick={onClick}/>
                <div className={"cell"} onClick={onClick}/>
                <div className={"cell"} onClick={onClick}/>
                <div className={"cell"} onClick={onClick}/>
                <div className={"cell"} onClick={onClick}/>
                <div className={"cell"} onClick={onClick}/>
                <div className={"cell"} onClick={onClick}/>
                <div className={"cell"} onClick={onClick}/>
            </div>
            <div id={"info"}>
                <p ref={infoBox}>{winner? `WYGRAŁ: ${winner}` : `NASTĘPNY GRACZ: ${player}`}</p>
            </div>
        </>

    );
}

export default App;

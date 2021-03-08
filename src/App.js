import React, { useState, useEffect, useCallback } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import styled from "@emotion/styled";
import img0 from "./img/0.png";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import img4 from "./img/4.png";
import img5 from "./img/5.png";
import img6 from "./img/6.png";
import img7 from "./img/7.png";

const img = [img0, img1, img2, img3, img4, img5, img6, img7];

function App() {
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [display, setDisplay] = useState("");
  const [guessed, setGuessed] = useState([]);
  const [word, setWord] = useState([]);
  // const [wordList, setWordList] = useState([]);
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [tries, setTries] = useState(7);
  const [started, setStarted] = useState(false);

  const wordList = [
    "array",
    "object",
    "character",
    "cry",
    "thy",
    "dry",
    "sky",
    "scythe",
  ].map((word) => word.toUpperCase());

  // useEffect(() => {
  //   (async () => {
  //     await getWordList();
  //   })();
  // });

  function getWord() {
    console.log("getWord");
    let x = Math.floor(Math.random() * wordList.length);
    return wordList[x].split("");
  }

  // async function getWordList() {
  //   console.log("getWordList");
  //   const reader = await new FileReader();
  //   reader.onload = async (e) => {
  //     e.preventDefault();
  //     console.log("reader onload");
  //     const words = e.target.result;
  //     console.log("words :>> ", words);
  //     setWordList(words);
  //   };
  // }

  useEffect(() => {}, [display, guessed]);

  const showWord = () => {
    setDisplay(
      word
        .map((char) =>
          Array.from(guessed).includes(char) ? `${char}  ` : "__ "
        )
        .join("")
    );
  };

  const check = (guesse, wor) => wor.every((v) => guesse.includes(v));
  //
  useEffect(showWord, [guessed]);

  const handleNewGame = () => {
    setGuessed([]);
    setWord(getWord());
    showWord();
    setStarted(true);
    setHasWon(false);
    setHasLost(false);
    setTries(7);
  };

  return (
    <div className="App">
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0 20px 10px 0;
          border: 1px solid black;
        `}
      >
        <h1
          css={css`
            padding: 0 15px;
          `}
        >
          HANGMAN
        </h1>
        <button
          css={css`
            font-size: 20px;
          `}
          type="text"
          onClick={handleNewGame}
        >
          <strong>NEW GAME</strong>
        </button>
      </div>

      <body
        css={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          text-align: center;
          margin: 20px 0 0 0;
          height: 300px;
        `}
      >
        <div>
          <img
            src={img[tries]}
            alt=""
            css={css`
              height: 250px;
              margin: 30px 0 0 0;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
          `}
        >
          <div
            css={css`
              font-size: 20px;
            `}
          >
            {display}
          </div>
          <div
            css={css`
              width: 350px;
              text-align: center;
            `}
          >
            {!hasWon &&
              !hasLost &&
              started &&
              alphabet.map((letter) => {
                if (check(guessed, word)) setHasWon(true);
                if (tries === 0) setHasLost(true);
                return !guessed.includes(letter) ? (
                  <button
                    type="text"
                    css={css`
                      width: 50px;
                      height: 30px;
                      text-align: center;
                      font-size: 20px;
                    `}
                    onClick={() => {
                      let temp = new Set(guessed).add(letter);
                      setGuessed(Array.from(temp));

                      if (word.includes(letter) === false) setTries(tries - 1);
                      if (check(guessed, word)) setHasWon(true);
                      if (tries === 0) setHasLost(true);
                    }}
                  >
                    {letter}
                  </button>
                ) : (
                  <button
                    disabled
                    type="text"
                    css={css`
                      width: 50px;
                      height: 30px;
                      text-align: center;
                      font-size: 20px;
                      background-color: white;
                    `}
                  >
                    {letter}
                  </button>
                );
              })}
            {hasLost && (
              <div>
                <h1>YOU LOST </h1>
                <h3>THE ANSWER IS: {word.join("")}</h3>
              </div>
            )}
            {hasWon && <h1>YOU WON</h1>}
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import { useSelector } from "react-redux";
import generateCard from "../libs/generateCard";
import HHmmss from "../utils/HHmmss";
import { GameService, LeaderboardService } from "../service";
import { withRedux } from "../redux";

let timerId: number = 0;

function App() {
  const [game, setGame] = useState(null);
  const [gameState, setGameState] = useState("INITIALIZE");
  const user = useSelector((state: any) => state.user);
  const [timer, setTimer] = useState(0);
  const [isProcessing, setProcessing] = useState(true);
  const [previousCard, setPreviousCard] = useState(null);
  const [numberOfClick, setNumberOfClick] = useState(0);
  const [numberOfOpennedCard, setNumberOfOpennedCard] = useState(0);
  const [cards, setCards] = useState([]);
  const [topScore, setTopScore] = useState(0)

  useEffect(() => {
    newGame();
    getTopScore()
  }, []);

  async function newGame() {
    try {
      clearInterval(timerId);
      const {
        data: { game },
      } = await GameService.create();
      setGame(game);
      setGameState("INITIALIZE");
      setProcessing(true);

      // generate card
      const newCards = generateCard();
      setCards(newCards);

      setTimer(0);
      setNumberOfClick(0);
      setNumberOfOpennedCard(0);
      setPreviousCard(null);
      window.setTimeout(() => {
        setGameState("WAITING_FOR_START");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTopScore() {
    try {
      const { data: { game } } = await LeaderboardService.get({ params: { limit: 1 } })
      if (game.length) {
        setTopScore(game[0].score)
      }
    } catch (error) {
      
    }
  }

  function startGame() {
    setGameState("PREPARING");
    window.setTimeout(() => {
      setGameState("START_GAME");
      setProcessing(false);
      startTimer();
    }, 4000);
  }

  function startTimer() {
    timerId = window.setInterval(() => {
      setTimer((prevState) => {
        return prevState + 1;
      });
    }, 1000);
  }

  function resetGame() {
    const tmp = cards.map((x) => ({
      ...x,
      isOpen: false,
    }));
    setProcessing(false);
    setPreviousCard(null);
    setNumberOfOpennedCard(0);
    setCards(tmp);
  }

  function setDefault() {
    setProcessing(false);
    setPreviousCard(null);
    setNumberOfOpennedCard(0);
    setTimer(0);
    setNumberOfClick(0);
  }

  function openCard(card: any): void {
    let isNeedReset = false;
    let nextCard = card;
    if (isProcessing) return;
    if (card.isOpen) return;
    setProcessing(true);

    // check need reset or not
    if (
      previousCard &&
      previousCard.value !== 0 &&
      card.value !== previousCard.value
    ) {
      isNeedReset = true;
    }
    if (
      previousCard &&
      previousCard.value !== 0 &&
      card.value === previousCard.value
    ) {
      nextCard = null;
    }
    const tmpCards = cards.map((x) => {
      if (card.id === x.id) {
        return { ...x, isOpen: true };
      }
      return x;
    });
    setNumberOfOpennedCard((prevState) => prevState + 1);

    // set previous card value for checking
    setPreviousCard(nextCard);

    // set card
    const totalNumberOfClick: number = numberOfClick + 1
    setNumberOfClick(totalNumberOfClick);
    setCards(tmpCards);

    setTimeout(() => {
      if (isNeedReset) {
        resetGame();
      } else {
        setProcessing(false);
      }
    }, 500);

    if (numberOfOpennedCard >= 11) {
      clearInterval(timerId);
      window.setTimeout(() => {
        setGameState("COMPLETED");
      }, 1000);
      window.setTimeout(() => {
        finishGame(totalNumberOfClick);
      }, 5000);
    }
  }

  async function finishGame(totalNumberOfClick: number) {
    try {
      setGameState("SAVING");
      const res = await GameService.update(game?.id, {
        score: totalNumberOfClick,
        time: timer,
      });
      setGameState("");
    } catch (error) {
      console.log(error);
    }
  }

  function renderOverlayText(gameState: string): string {
    switch (gameState) {
      case "PREPARING":
        return "Preparing";
      case "COMPLETED":
        return "Congratulation!";
      case "SAVING":
        return "Congratulation!";
      default:
        return "Initializing...";
    }
  }

  return (
    <div className="layout layout--main">
      {gameState === "COMPLETED" && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      )}
      {(gameState === "INITIALIZE" ||
        gameState === "PREPARING" ||
        gameState === "COMPLETED") && (
        <div className="overlay__container">
          <div className="overlay__content">
            <div className="text text--xxl">{renderOverlayText(gameState)}</div>
          </div>
        </div>
      )}
      <div>
        <p className="text text--extra-large">Hi, {user?.username} </p>
        <p className="text text--extra-large">Time: {HHmmss(timer)}</p>
        <p className="text text--extra-large">Click: {numberOfClick}</p>
        <p className="text text--extra-large">
          Your Best: {user?.score ?? "-"}
        </p>
        <p className="text text--extra-large">World Best: {topScore || "-"}</p>
        <p>
          {gameState === "WAITING_FOR_START" ? (
            <button className="button button--extra-large" onClick={startGame}>
              Start Game
            </button>
          ) : (
            <button className="button button--extra-large" onClick={newGame}>
              New Game
            </button>
          )}
        </p>
        <p>
          <Link href="/leaderboard" as="/leaderboard">
            <a>
              <button className="button button--extra-large">
                Leaderboard
              </button>
            </a>
          </Link>
        </p>
      </div>
      <div className="card__list">
        {cards.map((x, i) => (
          <div
            key={`card-${x}-${i}`}
            className={cn("card", { "card--open": x.isOpen })}
            onClick={() => openCard(x)}
          >
            <div className="content">
              <div className="front">{x.value}</div>
              <div className="back">{x.isOpen && x.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRedux(App);

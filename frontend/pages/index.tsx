import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Spinner } from "../components";
import generateCard from "../libs/generateCard";
import { withRedux } from "../redux";
import { ApplicationState } from "../redux/store";
import { GameService, LeaderboardService } from "../service";
import { ICard, IGame } from "../types";
import HHmmss from "../utils/HHmmss";

let timerId: number = 0;

function App() {
  const user = useSelector((state: ApplicationState) => state.user);
  const [game, setGame] = useState<IGame | null | undefined>(null);
  const [gameState, setGameState] = useState<string>("INITIALIZE");
  const [timer, setTimer] = useState<number>(0);
  const [isProcessing, setProcessing] = useState<boolean>(true);
  const [previousCard, setPreviousCard] = useState<ICard | null>(null);
  const [numberOfClick, setNumberOfClick] = useState<number>(0);
  const [numberOfOpennedCard, setNumberOfOpennedCard] = useState<number>(0);
  const [cards, setCards] = useState<ICard[]>([]);
  const [topScore, setTopScore] = useState<number>(0);

  useEffect(() => {
    newGame();
    getTopScore();
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
      const {
        data: { game },
      } = await LeaderboardService.get({ params: { limit: 1 } });
      if (game.length) {
        setTopScore(game[0].score);
      }
    } catch (error) {}
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
    const tmpCards = cards.map((x: ICard) => {
      if (card.id === x.id) {
        return { ...x, isOpen: true };
      }
      return x;
    });
    setNumberOfOpennedCard((prevState: number) => prevState + 1);

    // set previous card value for checking
    setPreviousCard(nextCard);

    // set card
    const totalNumberOfClick: number = numberOfClick + 1;
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
      if (!game) return
      setGameState("SAVING");
      await GameService.update(game.id, {
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
          <Spinner message={renderOverlayText(gameState)} />
      )}
      <div>
        <p className="text text--extra-large">Hi, {user?.username} </p>
        <p className="text text--extra-large">Time: {HHmmss(timer)}</p>
        <p className="text text--extra-large">Click: {numberOfClick}</p>
        <p className="text text--extra-large">
          Your Best: {user?.best_score ?? "-"}
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
        {cards.map((x: ICard, i: number) => (
          <Card
            key={`card-${x}-${i}`}
            isOpen={x.isOpen}
            value={x.value}
            openCard={() => openCard(x)}
          />
        ))}
      </div>
    </div>
  );
}

export default withRedux(App);

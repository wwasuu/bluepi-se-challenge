import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LeaderboardService } from "../service";
import { HHmmss } from "../utils";
import { IGame } from "../types"

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<IGame[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const {
        data: { game },
      } = await LeaderboardService.get({ params: { limit: 10 } });
      setLeaderboard(game);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="layout layout--main">
      <div>
        <Link href="/" as="/">
          <a>
            <button className="button button--extra-large">Back</button>
          </a>
        </Link>
      </div>
      <div className="leaderboard__container">
        <table className="leaderboard__table border--pixel">
          <thead>
            <tr>
              <td>Rank</td>
              <td>Player</td>
              <td>Score</td>
              <td>Time</td>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length ? (
              leaderboard.map((x: IGame, i: number) => (
                <tr key={`leaderboard-${i + 1}`}>
                  <td>{i + 1}</td>
                  <td>{x.user.username}</td>
                  <td>{x.score}</td>
                  <td>{HHmmss(x.time)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No Record</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

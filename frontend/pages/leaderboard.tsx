import { useEffect, useState } from "react";
import Link from "next/link";
import { LeaderboardService } from "../service";
import { HHmmss } from "../utils";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const {
        data: { game },
      } = await LeaderboardService.get();
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
      <div>
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
            {leaderboard.map((x, i) => (
              <tr key={`leaderboard-${i + 1}`}>
                <td>{i + 1}</td>
                <td>{x.user.username}</td>
                <td>{x.score}</td>
                <td>{HHmmss(x.time)}</td>
              </tr>
            ))}
            {
              <tr>
                <td colSpan={4}>No Record</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;

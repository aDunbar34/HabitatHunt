import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient.ts";
import "../css/components.css";
import { useNavigate } from "react-router-dom";

interface Player {
  id: number;
  streak: number;
  nickname: string;
}

function Scoreboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the player data
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from("scoreboard")
        .select("*")
        .order("streak", { ascending: false }); // SQL Query essentially

      if (error) {
        console.error("Error fetching data:", error); // Throw error if no data is found
      } else {
        console.log("Fetched Players:", data); // display on console the data
        setPlayers(data || []); // fill our data variable with the data retrieved
      }
      setLoading(false);
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return <p>...Loading...</p>;
  }

  const handleNav = () => {
    navigate("/");
  };

  return (
    <div className="scoreboard">
      <h1>/-/-/Scoreboard\-\-\</h1>
      <table className="scoreboardTable">
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.nickname}</td>
              <td>{player.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="returnButton">
        <button onClick={handleNav}>HOME</button>
      </div>
    </div>
  );
}

export default Scoreboard;

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
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from("scoreboard")
        .select("*")
        .order("streak", { ascending: false });

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Fetched Players:", data); // Debugging line
        setPlayers(data || []);
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

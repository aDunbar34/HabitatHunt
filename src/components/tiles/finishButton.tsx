import "../css/components.css";
import { useNavigate } from "react-router-dom";

const finishButton = ({ streak }: { streak: number }) => {
    const navigate = useNavigate();
    function handleNavigate() {
        navigate(`/`);
    }
    const handleBack = (streak : number) => {
        console.log(streak);
        handleNavigate();
    }

    return (
      <div className="finishButton">
        <button onClick={() => handleBack(streak)}>End Run</button>
      </div>
    );
  };

export default finishButton;
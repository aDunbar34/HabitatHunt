import "../css/components.css";

const StreakKeeper = ({ streak }: { streak: number }) => {
  return (
    <div className="streakKeeper">
      <h1>Streak: {streak}</h1>
    </div>
  );
};

export default StreakKeeper;

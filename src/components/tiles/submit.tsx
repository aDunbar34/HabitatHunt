import "../css/components.css";

interface SubmitProps {
  highlightedCountries: string[];
  onSubmit: () => void;
}

function Submit({ onSubmit }: SubmitProps) {
  return (
    <div
      className="SubmitButton"
      style={{ marginTop: "10px", textAlign: "center" }}
    >
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default Submit;

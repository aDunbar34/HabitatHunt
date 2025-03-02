import "../css/components.css";

interface SubmitProps {
  highlightedCountries: string[]; // Array of strings
  onSubmit: () => void; // Function with no arguments and no return value
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

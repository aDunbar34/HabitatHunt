interface SubmitProps {
  highlightedCountries: string[]; // Array of strings
  onSubmit: () => void; // Function with no arguments and no return value
}

function Submit({ onSubmit }: SubmitProps) {
  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button
        onClick={onSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1b3a4b",
          color: "#3490c2",
          border: "3px solid #3490c2",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1.2rem",
          textTransform: "uppercase",
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Submit;

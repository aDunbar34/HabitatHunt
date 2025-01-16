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
          backgroundColor: "#cafcfb",
          color: "black",
          border: "3px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Submit;

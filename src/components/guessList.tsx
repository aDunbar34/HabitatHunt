function GuessList({
  highlightedCountries,
}: {
  highlightedCountries: string[];
}) {
  return (
    <div
      style={{
        width: "21vw",
        color: "#3490c2",
        padding: "0.7rem",
        background: "#1b3a4b",
        border: "5px solid #3490c2",
        borderRadius: "50px",
        overflowY: "auto",
        height: "30vh",
        fontSize: "1.2rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.4rem",
        }}
      >
        Highlighted Countries:
      </h2>
      <ul>
        {highlightedCountries.length > 0 ? (
          highlightedCountries.map((country) => (
            <li
              key={country}
              style={{
                fontSize: "1rem",
              }}
            >
              {country}
            </li>
          ))
        ) : (
          <p>No countries selected</p>
        )}
      </ul>
    </div>
  );
}

export default GuessList;

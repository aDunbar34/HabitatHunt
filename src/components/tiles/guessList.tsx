import "../css/components.css";

function GuessList({
  highlightedCountries,
}: {
  highlightedCountries: string[];
}) {
  return (
    <div className="guess-list">
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

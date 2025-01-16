function GuessList({
  highlightedCountries,
}: {
  highlightedCountries: string[];
}) {
  return (
    <div
      style={{
        width: "21vw",
        padding: "0.7rem",
        background: "#cafcfb",
        border: "3px solid #ccc",
        borderRadius: "50px",
        overflowY: "auto",
        height: "30vh",
      }}
    >
      <h2
        style={{
          textDecoration: "underline  2px",
          fontSize: "1.5rem",
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

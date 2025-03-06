import "leaflet/dist/leaflet.css";

interface LoadAnimalProps {
  randomAnimal: string;
}

function LoadAnimal({ randomAnimal }: LoadAnimalProps) {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div>
        <div>
          {randomAnimal}
          <img
            src={"../src/assets/images/" + randomAnimal + ".jpeg"}
            alt="Image"
            style={{
              width: "20vw",
              height: "30vh",
              border: "5px solid #3490c2",
              borderRadius: "50px",
              marginBottom: "10px",
              float: "left",
            }}
          />
          <h2
            style={{
              fontSize: "2rem",
              color: "#3490c2",
              textTransform: "uppercase",
            }}
          >
            {randomAnimal}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default LoadAnimal;

import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

interface LoadAnimalProps {
  randomAnimal: string;
}

function LoadAnimal({ randomAnimal }: LoadAnimalProps) {
  const [animalImage, setAnimalImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const accessKey = "lP487A8e6ZobMk73U5Onqk2Yw4NsXbmSeGSqEs9viSY";

  useEffect(() => {
    if (!randomAnimal) return;

    // Fetch the image from Unsplash API
    setLoading(true);
    fetch(
      `https://api.unsplash.com/search/photos?query=${randomAnimal}&client_id=${accessKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const photo = data.results[0]; // Take the first image result
        if (photo) {
          setAnimalImage(photo.urls.regular); // Set the image URL
        }
      })
      .catch((error) => {
        console.error("Error fetching image from Unsplash", error);
        setAnimalImage(null);
      })
      .finally(() => {
        setLoading(false); // Finished loading
      });
  }, [randomAnimal]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {animalImage ? (
            <div>
              <img
                src={animalImage}
                alt={randomAnimal}
                style={{
                  width: "24rem",
                  height: "24rem",
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
          ) : (
            <p>No image available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LoadAnimal;

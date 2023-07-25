import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const UserImage = ({ image, size = "60px" }) => {
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    if (image) {
      fetch(`${BASE_URL}/assets/${image}`)
      // fetch(`http://localhost:3001/assets/${image}`)
        .then((response) => {
          if (!response.ok) throw new Error("Image Not Found");
          return response.blob();
        })
        .then((blob) => {
          let img = URL.createObjectURL(blob);
          setImageURL(img);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        src={imageURL}
        alt="NA"
      ></img>
    </Box>
  );
};

export default UserImage;

import { useState, useEffect } from "react";
import { getUserImg, uploadUserImg } from "@/app/api/user/userAPI";
import "@/styles/user/userImg.css";

const HOST = process.env.NEXT_PUBLIC_API_SERVER_HOST;
const PORT = process.env.NEXT_PUBLIC_API_SERVER_PORT;
const BASE_URL = `${HOST}:${PORT}`;

export default function UserImg({ userId }) {
  // const [userId, setUserId] = useState(params.userId);
  const [userImg, setUserImg] = useState(null);

  useEffect(() => {
    const fetchUserImg = async () => {
      try {
        // const response = await getUserImg("674c891f888407b88e8fec47");

        console.log("userId", userId);

        const response = await getUserImg(userId);
        let imgPath = response.profileImage;
        imgPath = imgPath.replace(/\\\\/g, "/");
        const imgUrl = `${BASE_URL}/${imgPath}`;
        console.log("Fetched image url:", imgUrl);
        setUserImg(imgUrl);
      } catch (error) {
        console.error("Failed to fetch user img:", error);
      }
    };
    fetchUserImg();
  }, []);

  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("file", file);

      const formData = new FormData();
      formData.append("img", file);

      try {
        await uploadUserImg(userId, formData);
        console.log("Image uploaded successfully");

        window.location.reload();

        // const response = await getUserImg(userId);
        // let imgPath = response.profileImage;
        // imgPath = imgPath.replace(/\\\\/g, "/");
        // const imgUrl = `${BASE_URL}/${imgPath}`;
        // setUserImg(imgUrl);
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  return (
    <>
      <div className="userImg-container">
        <div className="userImg-box">
          {userImg ? <img src={userImg} alt="User Image" /> : <p>Loading...</p>}
          <div className="camera-box">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=photo_camera"
            />
            <span
              className="material-symbols-outlined camera-icon"
              onClick={handleIconClick}
            >
              photo_camera
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

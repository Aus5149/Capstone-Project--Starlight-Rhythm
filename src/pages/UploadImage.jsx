import React, { useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const UploadImage = () => {
  const [file, setFile] = useState();
  const [imgUrl, setImgUrl] = useState();
  const currentUser = useContext(AuthContext);
  const [error, setError] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const uploadImage = async () => {
    try {
      setLoading(true);
      // 1. We want to define where are we saving?
      // Reference Point to the storage
      const savePoint = ref(storage, `posts/${currentUser.uid}/${file.name}`);
      // 2. Upload the file to the point we want to save.
      const response = await uploadBytes(savePoint, file);
      // 3. Get the download url after uploading
      const imageUrl = await getDownloadURL(response.ref);
      setImgUrl(imageUrl);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-52">
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        className="w-full h-10 rounded bg-gray-200"
      />
      <button
        disabled={isLoading}
        className="bg-blue-300 px-3 py-1.5 rounded text-sm"
        onClick={uploadImage}
      >
        Upload
      </button>
      {isLoading && <p>The image is loading, please don't click anything</p>}
      <img style={{minWidth: "50vh", maxWidth:"70vh", minHeight:"50vh", maxHeight: "70vh"}} src={imgUrl} />
    </div>
  );
};

export default UploadImage;
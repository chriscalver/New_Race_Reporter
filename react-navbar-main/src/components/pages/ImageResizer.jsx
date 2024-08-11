// https://dev.to/wchr/compress-images-in-react-browser-image-compression-libary-3cja
import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import prettyBytes from "pretty-bytes";
import Axios from "axios";

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
function ImageResizer({ title, description, file }) {
  const [newImage, setNewImage] = useState();

  

  const handleImage = (image) => {
    setNewImage(image);
  };

  useEffect(() => {
    if (file) {
      console.log("File received", file);

      try {
        Resizer.imageFileResizer(
          file,
          1500,
          1500,
          "JPEG",
          50,
          0,
          (blob) => {
            handleImage({
              url: URL.createObjectURL(blob),
              size: blob.size,
              type: blob.type,
            });
          },
          "blob",
          400,
          400
        );
      } catch (err) {
        console.log(err);
      }
      

      console.log(file); // resized new image uri

      

    }   
  }, [file]);

  if (!newImage) {
    return null;
  }
  console.log(newImage); // resized new image uri
  const formData = new FormData();
      formData.append("productName", makeid(10));
      formData.append("ImageFile", file);
      // formData.append("url", newImage.url);
      // formData.append("size", newImage.size);
      // formData.append("type", newImage.type);

  
      Axios.post(
        "https://www.chriscalver.com/reporterapi/api/products",
        formData
      ).then((response) => {
        console.log(response);
       // setImageSelected();
        // document.getElementById("image-uploader").value = null;
       // setLoaded(0);
        // blah.src = placeholder;
      });

  return (
    <>
      <figure>{`${prettyBytes(newImage.size)} ${newImage.type}`}</figure>

      <img src={newImage.url} alt="" style={{ maxWidth: "100%" }} />
    </>
  );
}

export default ImageResizer;

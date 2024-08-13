import React, { useState, useEffect } from "react";
import Axios from "axios";
import placeholder from "./placeholder.jpg";

import reactLogo2 from "./thatdamhill.png";
import Compressor from 'compressorjs';

var tempImage = placeholder;
  
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

function upLoadImage() {

  new Compressor(tempImage, {
    quality: 0.9,
    maxWidth: 1000,

    // The compression process is asynchronous,
    // which means you have to access the `result` in the `success` hook function.
    success(result) {
      const formData = new FormData();
      // The third parameter is required for server
      // formData.append('file', result, result.name);
      formData.append("ImageFile", result, result.name);
      formData.append("productName", makeid(10));

      // Send the compressed image file to server with XMLHttpRequest.
      Axios.post('https://www.chriscalver.com/reporterapi/api/products', formData).then(() => {
        console.log('Upload success');
        document.getElementById("file").value = null;
        document.getElementById("img").src = placeholder;
        // setImageSelected(placeholder);
      });
    },
    error(err) {
      console.log(err.message);
    },
 
  });

}

// console.log(makeid(5));

export const Blog = () => {
  const [imageSelected, setImageSelected] = useState(placeholder);
  // const [tempImg, setTempImg] = useState();

  

  const handleFileChange = (event) => {
   // setTempImg(event.target.files[0]);
     tempImage = event.target.files[0];
    setImageSelected(URL.createObjectURL(event.target.files[0]));
    
    console.log(tempImage);
    if (!tempImage) {
      return;
    }
    // document.getElementById("img").src = imageSelected;
  };



      
  
  
  


  useEffect(() => {});

  return (
    <div>
      <section className="content_section">
        <div className="container2">
          <div className="item item-1"></div>
          <div className="item item-2">
            <img src={reactLogo2} className="mainlogo" />
          </div>
          <div className="item item-3"></div>
          <div className="item item-4">
            
            <h1 className="header" style={{ marginBottom: "20px" }}>Image Uploader</h1>
            <center>
              <table className="table3" border="0">
                <tbody>
                  <tr>
                    <td> <input type="file" id="file" onChange={handleFileChange} accept="image/*" style={{ marginLeft: "50px" }}></input></td>
                  </tr>
                  <tr>
                    <td align="center"> <img src={imageSelected} alt="" name="img" id="img" style={{ maxWidth: "100%" }} /> </td>
                  </tr>
                  <tr>
                    <td align="center">
                    <button onClick={upLoadImage}>Upload Image</button>
                   
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>

           
          </div>
          <div className="item item-5" id="chart"></div>
        </div>
      </section>
    </div>
  );
};

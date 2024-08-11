import React, { useState, useEffect } from "react";
import Axios from "axios";
import Resizer from "react-image-file-resizer";
import reactLogo2 from "./thatdamhill.png";
import Marquee from "react-fast-marquee";
import chatIcon from "./chatIcon.png";
import placeholder from "./placeholder.jpg";
import ImageResizer from "./ImageResizer";


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

// console.log(makeid(5));

export const Blog = () => {
  const [imageSelected, setImageSelected] = useState(12);
  const [loaded, setLoaded] = useState(0);

  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
    setLoaded(1);
  };



  // const resizeFile2 = (file) =>
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       300,
  //       300,
  //       "JPEG",
  //       100,
  //       0,
  //       (uri) => {
  //         resolve(uri);
  //       },
  //       "blob"
  //     );
  //   });

  const resizeFile = (file) =>
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        setImageSelected(uri);
        console.log(uri);

      },
      "blob"
    );
  // console.log(imageSelected);

  // const resizeFile = (file) => {
  //   Resizer.imageFileResizer(
  //     file,
  //     300, // new image max width
  //     300, // new image max height
  //     "JPEG", // default type
  //     100, // new image quality
  //     0, // rotation degree
  //     (uri) => {
  //       setImageSelected(uri);
  //       console.log(uri); // resized new image uri
  //     },
  //     "base64" // output type
  //   );
  // //  setImageSelected(uri);
  // };

  const upLoadImage = () => {
    if (loaded != 0) {
      console.log(file); // resized new image uri

      const formData = new FormData();
      formData.append("productName", makeid(10));
      formData.append("ImageFile", file);

      Axios.post(
        "https://www.chriscalver.com/reporterapi/api/products",
        formData
      ).then((response) => {
        console.log(response);
        setImageSelected();
        // document.getElementById("image-uploader").value = null;
        setLoaded(0);
        // blah.src = placeholder;
      });
    }
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
            <table className="table2">
              <tbody>
                <tr>
                  <td width="35%"></td>

                  <td width="">
                    <Marquee
                      delay={2}
                      gradient="true"
                      gradientWidth={50}
                      direction="left"
                      speed={30}
                      className=""
                    >
                      ...................
                      <img width="20" src={chatIcon} />
                      Come back for hourly update with pictures, videos, and a
                      full pain report
                    </Marquee>
                  </td>

                  <td width="30%"></td>
                </tr>
              </tbody>
            </table>
            <h1 className="header">Blog</h1>
            <center>
              <table className="table3" border="0">
                <tbody>
                  <tr>
                    <td>


                    <input type="file" onChange={handleFileChange} accept="image/*" />




                      {/* <input
                        style={{ marginLeft: 70 }}
                        id="image-uploader"
                        type="file"
                        onChange={(event) => {
                          // const file = event.target.files[0];
                          // const image = await resizeFile(file);
                          // resizeFile(event.target.files[0]);
                          const image = resizeFile(event.target.files[0]);
                          setImageSelected(image);
                          // console.log(image);
                          setLoaded(1);
                          if (event.target.files[0]) {
                            blah.src = URL.createObjectURL(
                              event.target.files[0]
                            );
                          }
                        }}
                      /> */}

                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                    <ImageResizer file={file}/>
                      {/* <img
                        id="blah"
                        src={placeholder}
                        width="150"
                        alt="your image"
                      /> */}
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <button onClick={upLoadImage}>Upload Image</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>

            <div></div>
            <div></div>
          </div>
          <div className="item item-5" id="chart"></div>
        </div>
      </section>
    </div>
  );
};

//  <div>
//               <label for="avatar">Choose image:</label>
//               <input
//                 type="file"
//                 id="avatar"
//                 name="avatar"
//                 accept="image/png, image/jpeg"
//               />
//             </div>
//             <div>
//               <label for="name">Name the image:</label>
//               <input
//               value={name}
//                 type="text"
//                 id="name"
//                 name="name"
//                 required
//                 minlength="4"
//                 maxlength="8"
//                 size="10"
//               />
//             </div>

// async function upLoadImage() {
//   const request = await fetch(
//     "https://www.chriscalver.com/reporterapi/api/products",
//     {
//       method: "POST",
//       body: {
//         "ImageFile": "ppp",
//         "productName": "pppppp"
//       },
//     }
//   );
//   const response = await request.json();
//   console.log(response);
// }

// async function getImages() {
//   const request = await fetch(
//     "https://www.chriscalver.com/reporterapi/api/products",
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "Application/json",
//       },
//     }
//   );
//   const response = await request.json();
//   console.log(response);
// }

// async function Delete() {
//   const request = await fetch(
//     "https://www.chriscalver.com/reporterapi/api/products/12",
//     {
//       method: "DELETE",
//     }
//   );
//   const response = await request;
//   console.log(response);
// }
{
  /* <form onSubmit={handleSubmit}>
              <label>
                Name Image:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <input type="submit" />
            </form>

            <div></div>
            <did>
              <button onClick={() => upLoadImage()}>Upload Image</button>
            </did> */
}

// Delete();
// async function getCode() {
//   const request = await fetch(
//     "https://www.chriscalver.com/reporterapi/api/products",
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "Application/json",
//       },
//     }
//   );
//   const response = await request.json();
//   console.log(response);
// }

// const handleSubmit = (event) => {
//   event.preventDefault();
//   alert(`The name you entered was: ${name}`);
// }















//  <div>
//               <label for="avatar">Choose image:</label>
//               <input
//                 type="file"
//                 id="avatar"
//                 name="avatar"
//                 accept="image/png, image/jpeg"
//               />
//             </div>
//             <div>
//               <label for="name">Name the image:</label>
//               <input
//               value={name}
//                 type="text"
//                 id="name"
//                 name="name"
//                 required
//                 minlength="4"
//                 maxlength="8"
//                 size="10"
//               />
//             </div>

// async function upLoadImage() {
//   const request = await fetch(
//     "https://www.chriscalver.com/reporterapi/api/products",
//     {
//       method: "POST",
//       body: {
//         "ImageFile": "ppp",
//         "productName": "pppppp"
//       },
//     }
//   );
//   const response = await request.json();
//   console.log(response);
// }

// async function getImages() {
//   const request = await fetch(
//     "https://www.chriscalver.com/reporterapi/api/products",
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "Application/json",
//       },
//     }
//   );
//   const response = await request.json();
//   console.log(response);
// }

// async function Delete() {
//   const request = await fetch(
//     "https://www.chriscalver.com/reporterapi/api/products/12",
//     {
//       method: "DELETE",
//     }
//   );
//   const response = await request;
//   console.log(response);
// }
{
    /* <form onSubmit={handleSubmit}>
                <label>
                  Name Image:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
  
                <input type="submit" />
              </form>
  
              <div></div>
              <did>
                <button onClick={() => upLoadImage()}>Upload Image</button>
              </did> */
  }
  
  // Delete();
  // async function getCode() {
  //   const request = await fetch(
  //     "https://www.chriscalver.com/reporterapi/api/products",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "Application/json",
  //       },
  //     }
  //   );
  //   const response = await request.json();
  //   console.log(response);
  // }
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(`The name you entered was: ${name}`);
  // }
  
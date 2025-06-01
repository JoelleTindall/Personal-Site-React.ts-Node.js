import React from 'react';
import ImageUploading, { type ImageListType } from 'react-images-uploading';
 import "./Upload.css";
interface Props {
  images: ImageListType;
  setImages: (imageList: ImageListType) => void;
}

const ImageUploader: React.FC<Props> = ({ images, setImages }) => {
  return (
    <ImageUploading
      value={images}
      onChange={setImages}
      dataURLKey="data_url"
    >
      {({ imageList, onImageUpload }) => (
        <div>
          <button type="button" onClick={onImageUpload}>Upload Image</button>
          {imageList.map((image, index) => (
            <img key={index} src={image.data_url} alt="" width="100" />
          ))}
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUploader;

// import React, { useState } from 'react';

// import ImageUploading, { ImageListType } from 'react-images-uploading';

// import "./Upload.css";

// interface Props {
//   images: ImageListType;
//   setImages: (imageList: ImageListType) => void;
// }

// const Uploader:React.FC<Props> = ({images,setImages}) => {
//   // const [images, setImages] = useState([]);
//   const maxNumber = 69;

//   const onChange = (imageList, addUpdateIndex) => {
//     // data for submit
//     // console.log(imageList, addUpdateIndex);
//     setImages(imageList);
//     setImage(images);
//   };

//   return (
//     <div className="App">
//       <ImageUploading
//         multiple
//         value={images}
//         onChange={onChange}
//         maxNumber={maxNumber}
//         dataURLKey="data_url"
//       >
//         {({
//           imageList,
//           onImageUpload,
       
//           onImageUpdate,
//           onImageRemove,
//           isDragging,
//           dragProps,
//         }) => (
//           // write your building UI
//           <div className="upload__image-wrapper">

//             { imageList.length==0 ?
//             <button type="button" className='uploadbtn'
//               style={isDragging ? { color: 'red' } : undefined}
//               onClick={onImageUpload}
//               {...dragProps}
//             >
//               Click or Drop here
//             </button>
//             // &nbsp;
//            :<>
//             {imageList.map((image, index) => (
//               <div key={index} className="image-item">
//                 <img src={image['data_url']} alt="" width="100" />
//                 <div className="image-item__btn-wrapper">
//                   <button onClick={() => onImageUpdate(index)}>Change</button>
//                   <button onClick={() => onImageRemove(index)}>Remove</button>
//                 </div>
//               </div>
             
//             ))} </>}
//         </div>
//         )}
//       </ImageUploading>
//     </div>
//   );
// };

// export default Uploader;
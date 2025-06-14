import React from 'react';
import ImageUploading, { type ImageListType } from 'react-images-uploading';
 import "./upload.css";
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
      {({ imageList, onImageUpload,onImageUpdate,onImageRemove, isDragging,dragProps }) => (
        <div className="upload__image-wrapper">
                     { imageList.length==0 ?
            <button type="button" className='uploadbtn'
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            // &nbsp;
           :<>
          {/* <button type="button" className='uploadbtn' onClick={onImageUpload}>Upload Image</button> */}
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
               <img key={index} src={image.data_url} alt="" width="100" />
       
                <div className="image-item__btn-wrapper">
                  <button type="button" onClick={() => onImageUpdate(index)}>Change</button>
                  <button type="button" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
                </div>
          ))} </>}
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUploader;

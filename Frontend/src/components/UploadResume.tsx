import axios from "axios";
import { useState } from "react";
import DownloadButton from "./DownloadResume";

const UploadResume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<
    'initial' | 'uploading' | 'success' | 'fail'
  >('initial');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setStatus('initial');
    }
  };

  const handleUpload = async () => {
    if (file) {
      setStatus('uploading');

      const formData = new FormData();
      formData.append('file', file);

    try {
      await axios.post("http://localhost:8000/api/upresume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus('success');
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('fail');
    }
    }
  }; 

return (
  <div className="formholder resume">
    {status !== "success" && (
      <>
        <div className="input-group">
          <input id="file" type="file" onChange={handleFileChange} />
        </div>

        {file && (
          <section>
            File details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        )}

        {file && (
          <button onClick={handleUpload} className="submit">
            Upload a file
          </button>
        )}
      </>
    )}

    <Result status={status} />
    <DownloadButton />
  </div>
);
};

const Result = ({ status }: { status: string }) => {
  if (status === 'success') {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ File upload failed!</p>;
  } else if (status === 'uploading') {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default UploadResume;

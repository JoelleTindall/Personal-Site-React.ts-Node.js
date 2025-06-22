import axios from "axios";

interface Props {
  caption?: string;
}

const DownloadButton: React.FC<Props> = ({caption}) => {
  const downloadFile = async () => {
    try {
      const response = await axios.get("/api/downresume", {
        responseType: "blob",
      });

      const fileBlob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(fileBlob);

      // Create a temporary <a> element to trigger the download
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", `Resume_Joelle_Tindall.pdf`); // Set the desired filename for the downloaded file

      // Append the <a> element to the body and click it to trigger the download
      document.body.appendChild(tempLink);
      tempLink.click();

      // Clean up the temporary elements and URL
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error download.. ", error);
    }
  };

  return (
    <>
      <a onClick={downloadFile}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="24"
          height="24"
          viewBox="75 -875 800 800"
        >
          <path d="M160-80v-80h640v80zm320-160L200-600h160v-280h240v280h160zm0-130 116-150h-76v-280h-80v280h-76zm0-150" />
        <title>Download Resume</title>
        </svg>
        <figcaption>{caption}</figcaption>
      </a>
    </>
  );
};

export default DownloadButton;

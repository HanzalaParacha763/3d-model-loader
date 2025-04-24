import { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  const fileExtension = selectedFile?.name.split('.').pop().toLowerCase();
  
  // Check if the file extension is .glb
  if (fileExtension === 'glb') {
    setFile(selectedFile);
    onFileUpload(selectedFile);
  } else {
    alert('Please upload a valid GLB file!');
  }
};


  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-40 p-4 border-2 border-dashed rounded-2xl cursor-pointer bg-white hover:bg-gray-50 transition duration-300 ease-in-out shadow-sm"
      >
        <svg
          className="w-10 h-10 mb-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-8m0 0l-3 3m3-3l3 3m4 4v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5"
          />
        </svg>
        <span className="text-gray-500 text-lg font-medium">
          Click to upload your `.glb` file
        </span>
        <span className="text-sm text-gray-400">(Only .glb files are accepted)</span>
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".glb"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>

  );
};

export default FileUpload;

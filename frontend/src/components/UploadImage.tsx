import { useState } from "react";
import { X } from "lucide-react";

const UploadImage = ({
  handleChange,
  closeTab,
}: {
  handleChange: (file: File | null) => void;
  closeTab: () => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Handles file selection from local system
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  // Handles drag-and-drop of files or network images
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      processFile(file);
    } else {
      // Handle dragging an image from a website
      const imageUrl = e.dataTransfer.getData("text/plain");
      if (imageUrl) await fetchAndConvertImage(imageUrl);
    }
  };

  // Handles pasting images from clipboard
  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        if (file) processFile(file);
      }
    }
  };

  // Fetches an image from a URL and converts it to a File
  const fetchAndConvertImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "downloaded-image.jpg", { type: blob.type });
      processFile(file);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  // Processes the selected file and updates the preview
  const processFile = (file: File) => {
    handleChange(file);
    setPreview(URL.createObjectURL(file));
  };

  // Clears the selected image
  const clearImage = () => {
    setPreview(null);
    handleChange(null);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
    
    >
      <div
        className="relative w-4/5 h-4/5 flex flex-col items-center justify-center 
        border-2 border-dashed cursor-pointer p-6 rounded-lg transition-all duration-200 
        bg-gray-50 dark:bg-gray-800 border-gray-400 dark:border-gray-600 
        hover:border-blue-500 hover:border-solid hover:bg-gray-100 dark:hover:bg-gray-700 shadow-2xl"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onPaste={handlePaste}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 hover:bg-red-500 transition"
          onClick={closeTab}
        >
          <X size={24} />
        </button>

        {preview ? (
          <img src={preview} alt="Uploaded" className="max-w-full max-h-96 rounded-lg shadow-md" />
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Drag & drop an image, click to select, or paste from clipboard
          </p>
        )}

        <button
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          Upload from Device
        </button>
        <button
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => clearImage()}
        >
          clearImage
        </button>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
};

export default UploadImage;

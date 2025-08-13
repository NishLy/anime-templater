// components/ImagePickerModal.tsx
import Image from "next/image";
import React, { useState } from "react";

interface ImagePickerProps {
  onSelect: (src: string) => void;
}

const ImagePickerModal: React.FC<ImagePickerProps> = ({ onSelect }) => {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (preview) {
      onSelect(preview);
    } else if (url.trim()) {
      onSelect(url.trim());
    }
  };

  return (
    <div className="space-y-4">
      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setPreview(e.target.value || undefined);
          }}
          placeholder="https://example.com/image.jpg"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload File</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain border rounded-lg"
          />
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={!preview && !url.trim()}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default ImagePickerModal;

"use client";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => Promise<void>;
}

export default function ImageUpload({ onUploadSuccess }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  return (
    <div>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={async (result: any) => {
          try {
            setUploading(true);
            await onUploadSuccess(result.info.secure_url);
            toast.success("Profile picture updated!");
          } catch (error) {
            console.error("Error updating profile picture:", error);
            toast.error("Failed to update profile picture");
          } finally {
            setUploading(false);
          }
        }}
        onError={(error: any) => {
          console.error("Upload error:", error);
          toast.error("Upload failed");
          setUploading(false);
        }}
        options={{
          maxFiles: 1,
          resourceType: "image",
          folder: "profile_pictures",
          clientAllowedFormats: ["png", "jpeg", "jpg"],
          maxFileSize: 5242880, // 5MB
        }}
      >
        {uploading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <span>Uploading...</span>
          </div>
        ) : (
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Upload Profile Picture
          </button>
        )}
      </CldUploadButton>
    </div>
  );
}

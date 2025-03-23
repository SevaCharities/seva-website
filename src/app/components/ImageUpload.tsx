"use client";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => Promise<void>;
}

export default function ImageUpload({ onUploadSuccess }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={async (result: any) => {
          try {
            setUploading(true);
            await onUploadSuccess(result.info.secure_url);
            setImageUrl(result.info.secure_url);
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
          maxFileSize: 10485760, // 10MB
        }}
      >
        {uploading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
            <span>Uploading...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Profile"
                width={100}
                height={100}
                sizes="(max-width: 100px) 100vw, 100px" // Add sizes prop
                className="rounded-lg object-cover"
              />
            )}
            <div className="px-4 py-2  bg-orange-2 text-white rounded-lg hover:bg-orange-1 transition-colors">
              Change Profile Picture
            </div>
          </div>
        )}
      </CldUploadButton>
    </div>
  );
}

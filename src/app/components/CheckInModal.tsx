import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface CheckInModalProps {
  onClose: () => void;
  onSubmit: (imageUrl: string) => Promise<void>;
  loading: boolean;
}

export default function CheckInModal({
  onClose,
  onSubmit,
  loading,
}: CheckInModalProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleUpload = (result: any) => {
    setUploadedImage(result.info.secure_url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Check In Photo</h2>

        <div className="mb-4">
          {uploadedImage ? (
            <div className="relative w-full h-64">
              <Image
                src={uploadedImage}
                alt="Check-in photo"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_GENERAL_PRESET}
                onSuccess={handleUpload}
                options={{
                  maxFiles: 1,
                  resourceType: "image",
                  folder: "profile_pictures",

                  maxFileSize: 10485760, // 10MB
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Upload Photo
              </CldUploadButton>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={() => uploadedImage && onSubmit(uploadedImage)}
            disabled={!uploadedImage || loading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Check-in"}
          </button>
        </div>
      </div>
    </div>
  );
}

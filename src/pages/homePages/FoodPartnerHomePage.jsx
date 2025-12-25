import axios from "axios";
import { useEffect, useRef, useState } from "react";

const FoodPartnerHomePage = () => {
  const initialFormData = {
    title: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Handle text inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle video upload
  const handleUploadVideo = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setVideo(file);
    const preview = URL.createObjectURL(file);
    setVideoUrl(preview);
  };

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  // Reset page to initial state
  const resetPage = () => {
    setFormData(initialFormData);
    setVideo(null);
    setVideoUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // API : http://localhost:3200/api/food/
  const handleSubmit = async () => {
    setError("");
    const { title, description } = formData;
    if (!video) {
      setError("Please select a video file.");
      return;
    }
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", title);
      form.append("description", description);
      form.append("video", video);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || ""}/api/food/`,
        form,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200 || response.status === 201) {
        resetPage();
      }
    } catch (err) {
      let msg = "Something went wrong. Please try again.";
      if (err.response) {
        if (err.response.status === 401) {
          msg =
            err.response.data?.message ||
            "Unauthorized. Please login as a food partner.";
        } else if (err.response.status === 400) {
          msg =
            err.response.data?.message ||
            "Bad request. Please check your input.";
        } else if (err.response.data?.message) {
          msg = err.response.data.message;
        }
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#ffffff] dark:bg-[#030712] text-black dark:text-white overflow-hidden">
      <div className="w-120 p-8 rounded-lg shadow-lg border border-[#282b35] bg-[#f9fafb] dark:bg-[#11131e] text-black dark:text-white max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Upload Video</h1>
          <p className="text-sm mt-1 text-gray-400">
            Add a short reel video with title and description.
          </p>
        </header>
        {error && (
          <div className="text-red-700 rounded text-center text-sm">
            {error}
          </div>
        )}
        <form className="grid grid-cols-1 gap-4">
          {/* Video Upload */}
          <label className="block">
            <span className="text-sm font-medium">Video</span>

            <div className="mt-2 rounded-md border border-[#282b35] bg-gray-200 dark:bg-[#1d1f29] p-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <svg
                  className="h-10 w-10 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12a2 2 0 002 2h12"
                  />
                </svg>

                <p className="text-sm text-gray-400">Drop your video here or</p>

                {!loading ? (
                  <label className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-[#1d1f29] text-sm font-medium border rounded cursor-pointer hover:bg-[#2a2d3a]">
                    Choose File
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      className="sr-only"
                      onChange={handleUploadVideo}
                    />
                  </label>
                ) : (
                  <h3>Uploading.....</h3>
                )}

                <span className="text-xs text-gray-400">
                  MP4, MOV — max 200MB
                </span>

                {video && (
                  <p className="text-xs text-green-400 mt-1">✔ {video.name}</p>
                )}
              </div>
            </div>
          </label>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="E.g. Spicy Tacos"
              className="mt-2 w-full bg-gray-200 dark:bg-[#1d1f29] rounded-md text-gray-400 p-2
                         focus:outline-none focus:ring-0
                         border border-transparent focus:border-[#6366F1]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description about the food/video"
              className="mt-2 w-full bg-gray-200 dark:bg-[#1d1f29] rounded-md text-gray-400 p-2
                         resize-none focus:outline-none focus:ring-0
                         border border-transparent focus:border-[#6366F1]
                         overflow-y-auto"
            />
          </div>

          {/* Reel Preview */}
          <div>
            <label className="block text-sm font-medium">Preview</label>

            <div className="mt-3 flex justify-center">
              <div className="relative w-[180px] aspect-[9/16] bg-gray-200 dark:bg-black rounded-lg overflow-hidden border border-[#282b35]">
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    controls
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                    Reel preview
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            className={`w-full mt-4 p-2 rounded-md font-semibold text-white
              ${
                !loading
                  ? "bg-[#6366F1] hover:bg-[#4F46E5]"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            onClick={handleSubmit}
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerHomePage;

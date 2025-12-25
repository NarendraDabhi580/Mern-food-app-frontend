import axios from "axios";
import { useEffect, useRef, useState } from "react";

const UserHomePage = () => {
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);
  const [foodsData, setFoodsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // FETCH REELS DATA
  // =========================
  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL || ""}/api/food`, {
          withCredentials: true,
        });
        setFoodsData(response.data);
      } catch (err) {
        let msg = "Failed to load food reels.";
        if (err.response?.data?.message) msg = err.response.data.message;
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, []);

  const { foodItems = [] } = foodsData ?? {};

  // =========================
  // FIXED AUTOPLAY LOGIC
  // =========================
  useEffect(() => {
    if (!containerRef.current || foodItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.dataset.id;
          const videoEl = videoRefs.current.get(videoId);

          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // When a reel is more than 50% visible, play it
            videoEl?.play().catch(() => {});
            setPlayingId(videoId);
          } else {
            // When it leaves, pause it
            videoEl?.pause();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when half of the reel is visible
        root: containerRef.current,
      }
    );

    const sections = containerRef.current.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [foodItems]);

  // =========================
  // TAP TO PLAY / PAUSE
  // =========================
  const togglePlay = (id) => {
    const video = videoRefs.current.get(id);
    if (!video) return;

    if (video.paused) {
      // Pause all other videos before playing the selected one
      videoRefs.current.forEach((v, key) => {
        if (key !== id) v.pause();
      });
      video.play().catch(() => {});
      setPlayingId(id);
    } else {
      video.pause();
      setPlayingId(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#ffffff] dark:bg-[#030712] text-white overflow-hidden">
      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 p-2 bg-red-700/60 text-red-200 rounded text-center text-sm max-w-[90vw]">
          {error}
        </div>
      )}
      {loading && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-50 text-blue-400 text-lg">
          Loading reels...
        </div>
      )}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* MAIN CONTAINER: Matches Upload Section (w-120, max-h-90vh) */}
      <main
        ref={containerRef}
        className="w-120 max-h-[90vh] overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-[#f9fafb] dark:bg-[#11131e] rounded-lg shadow-lg border border-[#282b35] relative mx-4"
      >
        {/* HEADER */}
        <header className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none">
          <h1 className="text-lg font-semibold text-white drop-shadow-md">
            Foods Reels
          </h1>
        </header>

        {foodItems.map((food) => (
          <section
            key={food._id}
            data-id={food._id}
            className="snap-start h-[90vh] w-full relative bg-black text-white"
          >
            {/* VIDEO */}
            <video
              ref={(el) => el && videoRefs.current.set(food._id, el)}
              src={food.video}
              className="w-full h-full object-cover"
              playsInline
              muted
              loop
              preload="auto"
              onClick={() => togglePlay(food._id)}
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

            {/* PLAY / PAUSE INDICATOR */}
            {playingId !== food._id && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/40 p-3 rounded-full">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 3v18l15-9L5 3z" />
                  </svg>
                </div>
              </div>
            )}

            {/* CONTENT */}
            <div className="absolute bottom-6 left-4 right-4 space-y-3 pointer-events-none">
              <div>
                <h2 className="text-xl font-bold">{food.name}</h2>
                <p className="text-sm opacity-90">{food.description}</p>
              </div>
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md font-semibold text-white pointer-events-auto">
                Order Now
              </button>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default UserHomePage;

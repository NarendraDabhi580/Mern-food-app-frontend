const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#ffffff] dark:bg-[#030712] text-black dark:text-white">
      <div className="dark:bg-[#11131e] bg-[#f9fafb] rounded-lg p-10 border border-[#282b35] shadow-lg flex flex-col items-center max-w-lg w-full mx-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to MERN Food App
        </h1>
        <p className="text-lg dark:text-gray-300 text-gray-600 text-center mb-6">
          Discover delicious food, order from your favorite food partners, and
          enjoy a seamless experience.
        </p>
        <div className="flex gap-4 mt-4">

          <a href="/user/login" className="auth-btn">
            User Login
          </a>
          <a href="/food-partner/login" className="auth-btn">
            Partner Login
          </a>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

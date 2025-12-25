const AuthForm = ({ metadata, handleSubmit, handleChange, error, loading }) => {
  const { title = "", buttonLable = "", inputs = [] } = metadata ?? {};

  // Determine current form type from metadata or title
  const formType = (title || "").toLowerCase();

  console.log(formType, "formType");

  // Links for switching between forms
  const switchLinks = (
    <div className="flex flex-col gap-2 mt-6 text-center text-sm text-gray-400">
      {formType.includes("login user") && (
        <>
          <span>
            New user?{" "}
            <a href="/user/register" className="text-[#6366F1] hover:underline">
              Register
            </a>
          </span>
          <span>
            Are you a food partner?{" "}
            <a
              href="/food-partner/login"
              className="text-[#6366F1] hover:underline"
            >
              Food Partner Login
            </a>
          </span>
          <span>
            Not a partner?{" "}
            <a
              href="/food-partner/register"
              className="text-[#6366F1] hover:underline"
            >
              Register as Food Partner
            </a>
          </span>
        </>
      )}
      {formType.includes("register user") && (
        <>
          <span>
            Already have an account?{" "}
            <a href="/user/login" className="text-[#6366F1] hover:underline">
              Login
            </a>
          </span>
          <span>
            Are you a food partner?{" "}
            <a
              href="/food-partner/login"
              className="text-[#6366F1] hover:underline"
            >
              Food Partner Login
            </a>
          </span>
          <span>
            Not a partner?{" "}
            <a
              href="/food-partner/register"
              className="text-[#6366F1] hover:underline"
            >
              Register as Food Partner
            </a>
          </span>
        </>
      )}
      {formType.includes("login food partner") && (
        <>
          <span>
            New food partner?{" "}
            <a
              href="/food-partner/register"
              className="text-[#6366F1] hover:underline"
            >
              Register
            </a>
          </span>
          <span>
            Are you a user?{" "}
            <a href="/user/login" className="text-[#6366F1] hover:underline">
              User Login
            </a>
          </span>
          <span>
            Not registered?{" "}
            <a href="/user/register" className="text-[#6366F1] hover:underline">
              User Register
            </a>
          </span>
        </>
      )}
      {formType.includes("register food partner") && (
        <>
          <span>
            Already a partner?{" "}
            <a
              href="/food-partner/login"
              className="text-[#6366F1] hover:underline"
            >
              Login
            </a>
          </span>
          <span>
            Are you a user?{" "}
            <a href="/user/login" className="text-[#6366F1] hover:underline">
              User Login
            </a>
          </span>
          <span>
            Not registered?{" "}
            <a href="/user/register" className="text-[#6366F1] hover:underline">
              User Register
            </a>
          </span>
        </>
      )}
    </div>
  );

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{title}</h1>
        {error && (
          <div className="text-red-700 rounded text-center text-sm">
            {error}
          </div>
        )}
        <form className="auth-form" onSubmit={handleSubmit}>
          {inputs?.map(({ id, type, name, placeholder }) => (
            <input
              key={id}
              className="auth-input"
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
            />
          ))}
          <button className="auth-btn">{buttonLable}</button>
        </form>
        {loading && (
          <div className="mt-4 text-center text-blue-400">Logging in...</div>
        )}
        {switchLinks}
      </div>
    </div>
  );
};

export default AuthForm;

const Topbar = ({ hospitalName }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {hospitalName} - Admin Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;

export default function DispenseButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-3 px-4 py-2 rounded shadow text-white ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
      }`}
    >
      Mark as Dispensed
    </button>
  );
}

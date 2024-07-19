const widthMap = {
  full: "w-full",
};

export default function Input({
  placeholder,
  type = "text",
  error,
  width = "full",
  name,
  onChange,
  value,
  widthStyle,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-3 py-1 ${
          widthMap[width]
        } border border-secondary rounded-full focus:outline-none focus:ring-green-800 focus:ring-1 ${
          error
            ? "border-red-600 focus:ring-red-300"
            : "border-gray-300 focus:border-gray-500 focus:ring-blue-300"
        }
      `}
        name={name}
        onChange={onChange}
        value={value}
        style={{ width: widthStyle }}
      />
      {error ? <small className="text-red-500">{error}</small> : null}
    </>
  );
}

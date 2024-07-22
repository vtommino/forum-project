const bgMap = {
  green: "bg-green-800 hover:bg-green-900",
  blue: "bg-blue-500 hover:bg-blue-600",
  red: "bg-red-500 hover:bg-red-600",
  gray: "bg-gray-200 hover:bg-gray-300",
  yellow: "bg-yellow-700 hover:bg-yellow-800",
  white: "bg-white hover:bg-gray-100 shadow",
};

const colorMap = {
  white: "text-white",
  black: "text-black",
  drkgreen: "text-green-700 font-semibold hover:text-green-900",
};

const widthMap = {
  full: "w-full",
  20: "w-20",
};

export default function Button({
  children,
  bg = "green",
  color = "white",
  width = "w-full",
  onClick,
}) {
  return (
    <>
      <button
        className={`px-6 py-1.5 rounded-3xl ${bgMap[bg]} ${colorMap[color]} ${widthMap[width]}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}

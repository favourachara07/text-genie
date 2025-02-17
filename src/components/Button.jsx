export default function Button({ title, tyoe ,onClick}) {
  return (
    <button
      type={tyoe}
      onClick={onClick}
      className="text-white bg-[#40ffaa]  focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 "
    >
      {title}
    </button>
  );
}

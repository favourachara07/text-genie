export default function Button({ title, tyoe }) {
  return (
    <button
      type={tyoe}
      className="text-white bg-[#40ffaa]  focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 "
    >
      {title}
    </button>
  );
}

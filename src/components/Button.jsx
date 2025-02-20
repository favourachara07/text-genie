export default function Button({ title, type ,onClick,children, otherClass}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={type==='feature' ? ` relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800`:`text-white bg-[#40ffaa]  focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5  text-center md:mb-2 ${otherClass} `}
    >
      {children}
      {title}
    </button>
  );
}

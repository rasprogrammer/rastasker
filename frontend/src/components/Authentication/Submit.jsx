export default function Submit({ type = "submit", label = "Submit" }) {
  return (
    <>
      <div>
        <button
          type={type}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs cursor-pointer hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {label}
        </button>
      </div>
    </>
  );
}

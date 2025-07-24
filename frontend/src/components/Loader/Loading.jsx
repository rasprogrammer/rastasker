export default function Loading({ isLoad = false, children }) {
  return (
    <>
      <div className="relative">
        {children}

        {isLoad && (
          <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center">
            <div className="text-white text-sm animate-pulse">Loading...</div>
          </div>
        )}
      </div>
    </>
  );
}

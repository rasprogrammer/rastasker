const PrimaryButton = ({ onClick, children, ...props }) => {
  return (
    <>
      <button
        onClick={onClick}
        {...props}
        className="text-white bg-blue-700 cursor-pointer d-flex items-center hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
      >
        {children}
      </button>
    </>
  );
};

export default PrimaryButton;

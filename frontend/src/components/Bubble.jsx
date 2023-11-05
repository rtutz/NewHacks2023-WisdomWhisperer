function Bubble({ message, isUser }) {
  if (isUser) {
    return (
      <>
        <div className="p-4 max-w-xs mx-auto bg-black dark:bg-gray-800 rounded-xl shadow-lg space-y-2">
          <p className="text-white dark:text-white">{message}</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="p-4 max-w-xs mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-2">
          <p className="text-gray-700 dark:text-white">
            {message}
          </p>
        </div>
      </>
    );
  }
}

export default Bubble;

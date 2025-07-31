import { useState } from "react";

export default function MyComponent() {
  const [count, setCount] = useState(0);

  console.log(" ..... ");

  return (
    <>
      <h2>Count : {count}</h2>
      <div>
        {console.log("re-rendering...")}
        <button
          type="button"
          className="p-5 m-5 bg-gray-100"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
        <button
          type="button"
          className="p-5 m-5 bg-gray-100"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
      </div>
    </>
  );
}

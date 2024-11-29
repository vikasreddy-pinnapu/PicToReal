import { useState } from "react";

export default function OutputContainer({ heading, content }) {
  const [copyButtonFlag, setCopyButtonFlag] = useState(true);
  function copyCode() {
    let document: Document;
    const codeBlock = content;
    navigator.clipboard
      .writeText(codeBlock)
      .then(() => {
        setCopyButtonFlag(false);
        setTimeout(() => {
          setCopyButtonFlag(true);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  }
  return (
    <>
      <div className="bg-gray-900 flex justify-between items-center text-gray-300 rounded-t-lg">
        <p className=" py-3 px-4 font-sans text-xs">{heading} :</p>
        {copyButtonFlag ? (
          <button
            className="flex items-center gap-1 mr-2 h-5 px-2 rounded-md sticky text-xs hover:bg-gray-700 active:bg-gray-600 focus:outline-none"
            onClick={() => copyCode()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H5a2 2 0 01-2-2V5a2 2 0 012-2h9a2 2 0 012 2v3M16 16h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3m-6 0h6m0 0v8m0-8H9m3 8h-3a2 2 0 01-2-2v-3m0 6h6"
              />
            </svg>
            Copy code
          </button>
        ) : (
          <button className="flex items-center gap-1 mr-2 h-5 px-2 rounded-md sticky text-xs focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Copied!
          </button>
        )}
      </div>

      <div className="bg-black text-white rounded-b-lg p-3 text-sm">
        <code className="whitespace-pre-wrap break-words">{content}</code>
        {/* {JSON.stringify(aiResponse, undefined, 2)} */}
      </div>
    </>
  );
}

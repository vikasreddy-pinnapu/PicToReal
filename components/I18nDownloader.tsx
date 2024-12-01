import React from "react";
import { FaDownload } from "react-icons/fa"; // Importing download icon from react-icons

const i18nData = {
  en: {
    messages: {},
    formats: {
      date: "MMM d, y",
      time: "h:mm:ss a",
      currency: "USD",
    },
    files: {
      angular: "en",
      fullCalendar: null,
      moment: null,
    },
    prefabMessages: {},
  },
  ar: {
    messages: {},
    formats: {
      date: "dd‏/MM‏/y",
      time: "h:mm:ss a",
      currency: "USD",
    },
    files: {
      angular: "ar",
      fullCalendar: "ar",
      moment: "ar",
    },
    prefabMessages: {},
  },
};

const I18nDownloader = ({ i18nData }) => {
  const handleDownload = (language) => {
    const languageData = i18nData[language];
    const blob = new Blob([JSON.stringify(languageData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${language}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#2c2c2c] shadow-lg p-8 w-full relative rounded-lg h-screen font-sans">
      <div className="flex flex-col justify-around w-10/12 m-auto">
        <h1 className="text-2xl font-semibold text-white mb-4 text-center">
          Download Language JSON Files
        </h1>

        <ul className="bg-gray-800 p-4 rounded-lg shadow-md">
          {Object.keys(i18nData).map((language) => (
            <li
              key={language}
              className="flex justify-between items-center p-2 border-b border-gray-700 last:border-none"
            >
              <span className="text-white capitalize">
                {language.toUpperCase()}
              </span>
              <button
                onClick={() => handleDownload(language)}
                className="text-white hover:bg-gray-900 p-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <FaDownload />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default I18nDownloader;

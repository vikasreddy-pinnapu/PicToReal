import Lottie from "lottie-react";
import React, { ChangeEvent, useState } from "react";
import initialAnimation from "../assets/Animation - 1717665713549.json";
import finalAnimation from "../assets/circleSpinner.json";
import OutputContainer from "./OutputContainer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function DesignUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [aiResponse, setaiResponse] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const languages_i18n = [
    { language: "English", code: "en" },
    { language: "Arabic", code: "ar" },
    { language: "Spanish", code: "es" },
    { language: "French", code: "fr" },
    { language: "German", code: "de" },
    { language: "Italian", code: "it" },
    { language: "Chinese", code: "zh" },
    { language: "Japanese", code: "ja" },
    { language: "Russian", code: "ru" },
    { language: "Hindi", code: "hi" },
  ];

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );

    // Handle adding/removing items from the selectedLanguages array
    const updatedLanguages = selectedOptions.reduce((acc, code) => {
      // If the language is already selected, add it; otherwise, remove it
      if (!acc.includes(code)) {
        acc.push(code);
      }
      return acc;
    }, []);

    setSelectedLanguages(updatedLanguages);
    console.log(updatedLanguages); // Log the updated state
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log("fiole", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  function handleRemoveImage() {
    setSelectedImage(null);
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  const handleUpload = async () => {
    console.log("sele ctedimae", selectedImage);
    setIsUploading(true);
    // setTimeout(() => {
    //   alert("Image uploaded successfully!");
    //   setIsUploading(false);
    //   setSelectedImage(null);
    // }, 3000); // Simulate API call
    if (!selectedImage) {
      alert("Please find a file to upload");
      return;
    }

    // const formData = new FormData();
    // formData.append("image", selectedImage);

    try {
      // const response = await fetch('/api/process-image', {
      //     method: 'POST',
      //     body: formData
      // })

      const responseData = {
        wmMarkup: `<wm-composite name="composite4" show="false">
                <wm-label class="col-xs-4 control-label" name="label5"></wm-label>
                <wm-container class="col-xs-8" name="container4">
                    <wm-slider name="slider3" on-change="slider3Change($event, widget, newVal, oldVal)"></wm-slider>
                </wm-container>
            </wm-composite>
            <wm-composite name="composite2" show="false">
                <wm-label class="col-xs-4 control-label" name="label3"></wm-label>
                <wm-container class="col-xs-8" name="container2">
                    <wm-slider name="slider1" range="true" on-change="slider1Change($event, widget, newVal, oldVal)" datatype="dataset" dataset="bind:Variables.staticVariable1.dataSet" datafield="dataValue" displayfield="name"></wm-slider>
                </wm-container>
            </wm-composite>`,
        styles: `.app-dialog{
    width: 100%;
    max-height: 100%;
    height: 100%;
    border-radius: 0;
    padding: 0;
}
.app-dialogcontent{
    max-height: 100%;
   padding: 0;
}

.app-carousel-content{
    height: 100vh;
}

.app-carousel-slide{
    padding:0;
}

.app-picture{
    height: 100%;
}
.app-tabbar{
    height: 0
}`,
      };
      // if (!response.ok) {
      //   throw new Error("Failed to upload image");
      // }
      setTimeout(() => {
        setaiResponse(responseData as any);
        setIsUploading(false);
      }, 2000);
      // const imageBlob = await response.blob();
      // const imageUrl = URL.createObjectURL(imageBlob);
    } catch (error) {
      console.log("Error uploading files:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Spinner overlay */}
      {isUploading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
          <Lottie
            animationData={finalAnimation}
            loop={true}
            autoplay={true}
            className="w-48 h-48"
          />
        </div>
      )}
      {!aiResponse ? (
        // <div className="bg-white shadow-lg p-8 w-full max-w-md relative">
        //   <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        //     Upload an Image
        //   </h1>

        //   <label
        //     htmlFor="image-upload"
        //     className="flex flex-col items-center cursor-pointer"
        //   >
        //     <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 hover:bg-blue-200">
        //       <svg
        //         xmlns="http://www.w3.org/2000/svg"
        //         fill="none"
        //         viewBox="0 0 24 24"
        //         strokeWidth={2}
        //         stroke="currentColor"
        //         className="w-8 h-8 text-blue-500"
        //       >
        //         <path
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //           d="M12 4v16m8-8H4"
        //         />
        //       </svg>
        //     </div>
        //     <span className="text-blue-600">Choose an image</span>
        //     <input
        //       type="file"
        //       id="image-upload"
        //       className="hidden"
        //       accept="image/*"
        //       onChange={handleImageChange}
        //     />
        //   </label>

        //   <div className="mt-6">
        //     <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center bg-gray-50">
        //       {selectedImage ? (
        //         <img
        //           src={selectedImage}
        //           alt="Preview"
        //           className="max-h-full max-w-full rounded-md"
        //         />
        //       ) : (
        //         <span className="text-gray-500">No Image Selected</span>
        //       )}
        //     </div>
        //   </div>

        //   <button
        //     className={`mt-6 w-full py-2 rounded-md text-white transition-colors ${
        //       !selectedImage || isUploading
        //         ? "bg-blue-300 cursor-not-allowed"
        //         : "bg-blue-500 hover:bg-blue-600"
        //     }`}
        //     onClick={handleUpload}
        //     disabled={!selectedImage || isUploading}
        //   >
        //     {isUploading ? "Uploading..." : "Upload"}
        //   </button>
        // </div>
        <div className="bg-[#2c2c2c] shadow-lg p-8 w-full relative rounded-lg h-screen font-sans">
          <div className="flex flex-col justify-around w-9/12 m-auto ">
            <h1 className="text-2xl font-semibold text-white mb-4 text-center">
              Upload your design
            </h1>

            {/* Image Upload Zone */}
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div
                className={`w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center ${
                  selectedImage ? "border-green-500" : "border-gray-500"
                } hover:border-blue-500 bg-gray-800`}
              >
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-md"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400">Drop or Choose an Image</span>
                )}
              </div>
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <div className="flex justify-between mt-5">
              <label htmlFor="languages" className="text-white">
                Localisation (optional):
              </label>

              <select
                name="languages"
                id="languages"
                multiple
                onChange={handleSelectChange}
                className="bg-gray-800 text-white border border-gray-500 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages_i18n.map((item) => (
                  <option
                    key={item.code}
                    value={item.code}
                    className="bg-gray-800 text-white hover:bg-gray-700"
                  >
                    {item.language}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Button */}
            <button
              className={`mt-6 w-full py-2 rounded-md text-white transition-colors ${
                !selectedImage || isUploading
                  ? "bg-blue-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={handleUpload}
              disabled={!selectedImage || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#2c2c2c] shadow-lg p-8 w-full h-screen font-sans overflow-scroll">
          <Tabs>
            <TabList>
              <Tab>Markup</Tab>
              <Tab>Styles</Tab>
              <Tab>i18n</Tab>
            </TabList>

            <TabPanel>
              <OutputContainer
                heading={"Markup"}
                content={aiResponse.wmMarkup}
              />
            </TabPanel>
            <TabPanel>
              <OutputContainer heading={"Styles"} content={aiResponse.styles} />
            </TabPanel>
            <TabPanel>
              <div> json</div>
            </TabPanel>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default DesignUpload;

import Lottie from "lottie-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import initialAnimation from "../assets/Animation - 1717665713549.json";
import finalAnimation from "../assets/circleSpinner.json";
import imageScanAnimation from "../assets/Animation - 1733058871795.json";
import OutputContainer from "./OutputContainer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { parseServerResponse } from "./utils/parsing";
import I18nDownloader from "./I18nDownloader";
import PicToReal from "../public/assets/PicToRealLogoHighResDarkBG.png";

function DesignUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [aiResponse, setaiResponse] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const logoPath = "./";
  const [isFileExist, setIsFileExist] = useState<boolean>(false);

  const getData = async () => {
    try{
      const response = await fetch('api/check-file-exist/', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(response.status === 200){
        setIsFileExist(true);
        const jsonRes = await response.json();
        const data = JSON.parse(jsonRes.jsonData);
        setaiResponse(data as any);
        return;
      }

      setIsFileExist(false);
    }catch(error: any){
      console.log("error is: ", error)
      setIsFileExist(false)
    }
  }

  useEffect(()=> {
    getData();
  }, [])

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

  const handleReUploadClick = async () =>{
    try{
      const response = await fetch('api/delete-file', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        }
      });
      if(response.status === 200) {
        setIsFileExist(false);
        setaiResponse("");
      }
    } catch(error) {
      console.log("error is: ", error)
    }
  }

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

    if (!selectedImage) {
      alert("Please find a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
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
        i18n: {
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
        },
      };

      setTimeout(() => {
        setaiResponse(responseData as any);
        setIsUploading(false);
      }, 2000);

      await fetch('api/create-file', {
        method: 'post',
        body: JSON.stringify({
          data: responseData
        }),
        headers: {
          'Content-type': 'application.json'
        }
      })

      // const response = await axios.post("/api/process-image", formData);
      // if (response.status !== 200) {
      //   throw new Error("Failed to upload image");
      // }
      // const { markup, styles } = parseServerResponse(response);

      // console.log("markup,styles are ==>", markup, typeof markup);

      // setTimeout(() => {
      //   setaiResponse({ markup: `${markup}`,styles: `${styles}`  } as any);
      //   setIsUploading(false);
      // }, 2000);
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
            animationData={imageScanAnimation}
            loop={true}
            autoplay={true}
            className="w-48 h-48"
          />
        </div>
      )}
      {!aiResponse && !isFileExist ? (
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
                  <span className="text-gray-400 font-bold">
                    Select or Drop a Design
                  </span>
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
              {aiResponse.i18n && <Tab>i18n</Tab>}
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
              <div>
                <I18nDownloader i18nData={aiResponse.i18n} />
              </div>
            </TabPanel>
          </Tabs>
          <button
            className={`mt-6 w-full py-2 rounded-md text-white transition-colors ${
              !selectedImage || isUploading
                ? "bg-blue-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleReUploadClick}
          >Re upload</button>
        </div>
      )}
    </div>
  );
}

export default DesignUpload;

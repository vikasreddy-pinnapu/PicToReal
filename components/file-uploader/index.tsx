
import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image'

import './index.css'

function FileUploader() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [uploadResult, setUploadResult] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if(file) {
            setSelectedFile(file)

            const reader = new FileReader()
            reader.onload = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file) 
        }
    }

    const handleFileUpload = async () => {
        if(!selectedFile) {
            alert("Please find a file to upload")
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('/api/process-image', {
                method: 'POST',
                body: formData
            })

            if(!response.ok) {
                throw new Error('Failed to upload image')
            }

            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setUploadResult(imageUrl);
        }
        catch(error) {
            console.log("Error uploading files:", error);
        }
    }

    return (
        <div className='container'>
            <div className='upload-area'>
                <input className='file-input' type='file' onChange={handleFileChange} accept='image/*'/>
                <Image
                  className='upload-img'
                  src="/assets/upload.png"
                  width={100}
                  height={100}
                  alt="Picture of the author"
                  />
            </div>
            <button onClick={handleFileUpload} className="upload-button">Upload Image</button>
        </div>
    )
}

export default FileUploader;

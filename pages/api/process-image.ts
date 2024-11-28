import sharp from 'sharp';
import { toPng } from 'html-to-image';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import * as formidable from 'formidable';

export const config = {
    api: {
      bodyParser: false, // Disable default body parser
    },
};


const parseForm = async (req: NextApiRequest): Promise<{ fields: formidable.Fields, files: formidable.Files }> => {
    const form = new formidable.IncomingForm();

    return new Promise((resolve, reject) => {
        form.parse(req, (err: Error, fields: formidable.Fields, files: formidable.Files) => {
            if (err) reject(err);
            else resolve({ fields, files });
          });      
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        try {
            const { files } = await parseForm(req);
            const image = files.image as File;

            console.log("Image for this is ==>", image);

            if(!image) {
                return res.status(400).json({ error: "Image files are require" })
            }
            res.status(200).json({ message: "File uploaded successfully", file: image })
        }
        catch(error) {
            console.log("<== error occured ==>", error)
        }
    }
}
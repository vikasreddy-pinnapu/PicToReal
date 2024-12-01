import * as formidable from 'formidable';
import { NextApiRequest } from "next";

export const parseForm = async (req: NextApiRequest): Promise<{ fields: formidable.Fields,  files: formidable.Files}> => {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
      form.parse(req, (err: Error, fields: formidable.Fields, files: formidable.Files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });      
  })
}
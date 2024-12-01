import fs from "node:fs";

const createFile = (content: any) => {
    try{
        fs.writeFileSync('./assets/data.json', JSON.stringify(content));
        return true;
    }catch(e: any) {
        console.log('error on file creating', e)
        return false;
    }
}

const handler = (req: any, res: any) => {
    // might need to change this line depending upon response
    const { data } = JSON.parse(req.body); 

    const isFileCreated = createFile(data);
    if(isFileCreated){
        return res.status(200).send("file created successfully")
    }
    return res.status(404).send("Unable to create the file");
}

export default handler;

import fs from "node:fs";

const deleteFile = () => {
    try{
        fs.unlinkSync('./assets/data.json');
        return true;
    }catch(error){
        console.log("error is:", error);
        return false
    }
}

const handler = (req: any, res: any) => {
    const isFileRemoved = deleteFile();
    if(isFileRemoved){
        res.status(200).send("Successfully removed file")
    }else res.status(404).send("Unable to remove file")
}

export default handler;

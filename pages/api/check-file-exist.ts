import fs from 'node:fs';

const checkIfExist = () => {
    try{
        if(fs.readFileSync('./assets/data.json')){
            const data = fs.readFileSync('./assets/data.json')
            const jsonData = JSON.stringify(JSON.parse(data as any));
            return [true, jsonData];
        }
        return [false, null]
    }catch(e: any) {
        return [false, null]
    }
};

const handler = (req: any, res: any) => {
    const [isFilePresent, data] = checkIfExist();
    if(isFilePresent){
        res.status(200).json({jsonData: data});
    }
    return res.status(404).send("file does not exist");
}

export default handler;

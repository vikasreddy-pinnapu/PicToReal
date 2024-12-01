import fs from 'node:fs';

export const checkIfExist = () => {
    try{
        if(fs.readFileSync('./data.json')){
            return true;
        }
        return false
    }catch(e: any) {
        return false
    }
};

export const createFile = (content: any) => {
    try{
        fs.writeFileSync('./data.json', content);
    }catch(e: any) {
        console.log('error on file creating', e)
    }
}

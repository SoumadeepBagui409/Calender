const fs = require('fs');
const loadFile = ()=>{
    try{
        const dataFile = fs.readFileSync('events.txt');
        const parseDataFile = dataFile.toString();
        
        return JSON.parse(parseDataFile);
    }catch(e){
        return [];
    }
}


module.exports = {
    loadFile: loadFile  
}

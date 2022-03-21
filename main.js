let inputArr = process.argv.slice(2);
let command = inputArr[0];
let fs = require("fs");
const { type } = require("os");
let path = require("path");

let types = {
    media:      ["mp4","mkv","mp3"],
    archives:   ["zip","rar","7z","tar","iso","xz"],
    documents:   ["docx","doc","pdf","xlsx","txt","pptx"],
    app:        ["exe","deb","pkg","dmg","msi"],
    images:     ["jpg", "jpeg", "tif", "png", "bmp"]
}

switch(command){
    case "tree":
        treeFn(inputArr[1]);
        console.log("Tree command implemented for ", inputArr[1]);
        break;
    case "help":
        helpFn( );
        console.log("Help command implemented for ", inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        console.log("Oragnize command implemented for ", inputArr[1]);
        break;
    default:
        console.log("Command is not valid");
        break;
     

}

function treeFn(dirPath) {
    
}

function helpFn( ){
    console.log("List of commands: ");
    console.log("            |______________________________________help");
    console.log("            |______________________________________tree");
    console.log("            |______________________________________organize");
}



function organizeFn(dirPath){
    if(dirPath == undefined){
        console.log("No path specified! ");
    }else{
        doesExist = fs.existsSync(dirPath);
        if(doesExist){
            desPath =  path.join(dirPath,"organized_files");
            if(fs.existsSync(desPath)==false){
                fs.mkdirSync(desPath);    
            }
            isFILE(dirPath);
        }else{
            console.log("No such path or directory found!");
        }

    } 
 }


function isFILE(dirPath){
    filesList = fs.readdirSync(dirPath);
    //console.log(filesList);
    let count;
    for(let i=0;i<filesList.length;i++){
        fileAdd = path.join(dirPath,filesList[i]); 
        file = fs.lstatSync(fileAdd).isFile();
        if(file ){
            let category = FileCat(filesList[i]);
            //console.log("Category of ", filesList[i]," is----------------------------------------------------------------------------------->", category );
            
            let count = MainOrganize(fileAdd,desPath,category,i+1);
            }
        }
   // console.log("SUCCESSFULLY ORGANIZED", count," files")    
}            

function FileCat(name){
    
           // console.log("list of files are:",fileAdd);
            let ext = path.extname(name);
            ext = ext.slice(1);
            for(let type in types){
                let catArr = types[type] ;
                for(let j  =0; j<catArr.length;j++){
                    if(ext == catArr[j]){
                        return type;
                    }
                }
            }
            return "others"
    }

function MainOrganize(fileAdd,desPath, category,iterate){
    let categoryPath = path.join(desPath,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    baseFile = path.basename(fileAdd);
    let desFileAdd = path.join(categoryPath,baseFile);
    console.log("Successfully organized file",iterate);
    fs.copyFileSync(fileAdd,desFileAdd);
    return iterate;
}
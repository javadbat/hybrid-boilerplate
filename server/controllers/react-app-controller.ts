import express from'npm:express';
import path from 'node:path';
class ReactAppController{
    router = express.Router();
    #viewFolderName:string;
    constructor(viewFolderName:string){
        this.router.get(['/','/*'], this.appRoot.bind(this));
        this.#viewFolderName = viewFolderName;
    }
    appRoot(req:any, res:any) {
        const hbsData = {
        };
        res.render(path.join(this.#viewFolderName, 'index.hbs'), hbsData);
    }


}
export default ReactAppController;
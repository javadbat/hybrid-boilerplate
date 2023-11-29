import express from'express';
import path from 'path';
class ReactAppController{
    constructor(viewFolderName){
        this.router = express.Router();
        this.router.get(['/','/*'], this.appRoot.bind(this));
        this.viewFolderName = viewFolderName;
    }
    appRoot(req, res) {
        const hbsData = {
        };
        res.render(path.join(this.viewFolderName, 'index.hbs'), hbsData);
    }


}
export default ReactAppController;
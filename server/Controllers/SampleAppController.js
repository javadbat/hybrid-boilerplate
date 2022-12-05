import express from'express';
import path from 'path';
class SampleAppController{
    constructor(){
        this.router = express.Router();
        this.router.get(['/','/*'], this.SampleApp.bind(this));
    }
    SampleApp(req, res) {
        const hbsData = {
        };
        res.render(path.join('SampleApp', 'index.hbs'), hbsData);
    }


}
export default SampleAppController;
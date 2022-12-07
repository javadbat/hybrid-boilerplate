import webpackAnalyzer from 'webpack-bundle-analyzer/lib/viewer.js';
import fs from 'fs';
import path from 'path';
import { generalConfigServer } from '../../config/general-config-server.js';
fs.readFile( path.join(generalConfigServer.basePath, 'app','dist','react-apps','webpack-bundle-analysis.json'),'utf-8',(err, jsonString)=>{
    if(!err){
        const analysisData = JSON.parse(jsonString);
        webpackAnalyzer.start(analysisData);
    }else{
        console.error(err);
    }
});
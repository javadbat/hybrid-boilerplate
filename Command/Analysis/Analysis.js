import webpackAnalyzer from 'webpack-bundle-analyzer/lib/viewer.js';
import fs from 'fs';
import path from 'path';
import generalConfig from '../../Config/GeneralConfigServer.js';
fs.readFile( path.join(generalConfig.basePath, 'App','dist','ReactApps','webpack-bundle-analysis.json'),'utf-8',(err, jsonString)=>{
    if(!err){
        const analysisData = JSON.parse(jsonString);
        webpackAnalyzer.start(analysisData);
    }else{
        console.error(err);
    }
});
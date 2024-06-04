import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import listObject from "./data.js";

import logoImageFEFU from "./img/intc.png";
import logoImageINTC from "./img/fefu.png";
import imageMap from "./img/intc_map.png";

import imageIPC from './img/Group 7.png'
import imageINTC from './img/Group 38.png'

import Body from './reactComponents/body.js'
import Head from './reactComponents/head.js'
import Footer from './reactComponents/footer.js'




const logoList = [logoImageFEFU, logoImageINTC];
const imgList = [imageIPC, imageINTC];


const root = ReactDOM.createRoot(document.getElementById("root"));









function Content() {
    return (
        <>
            <Head logoList= {logoList} />
            <Body objects={listObject} map={imageMap} images={imgList}/>
			<Footer />
        </>
    );
}

root.render(<Content />);

import arr from "./data.js";
import info from './info.js'

import Head from './reactComponents/head.js'
import Body from './reactComponents/body.js'
import Footer from './reactComponents/footer.js'


import logoImageINTC from "./img/intc.png";
import logoImageFEFU from "./img/fefu.png";
import imageMap from "./img/intc_map.png";


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";


const logoList = [logoImageINTC, logoImageFEFU]

const listObject = arr[0];
const listImages = arr[1];
const listTitles = arr[2];

console.log(listImages)

const root = ReactDOM.createRoot(document.getElementById("root"));


function Content() {
    return (
        <>
            <Head logoList={logoList} />
            <Body objects={listObject} map={imageMap} listImages={listImages} listTitles={listTitles} tableData={info}/>
            <Footer />
        </>
    );
}

root.render(<Content />);

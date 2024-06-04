import arr from "./data.js";

import Head from './reactComponents/head.js'
import Body from './reactComponents/body.js'
import Footer from './reactComponents/footer.js'


import logoImageFEFU from "./img/intc.png";
import logoImageINTC from "./img/fefu.png";
import imageMap from "./img/intc_map.png";


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";


const logoList = [logoImageFEFU, logoImageINTC]

const listObject = arr[0];
const listImages = arr[1];

console.log(listImages)

const root = ReactDOM.createRoot(document.getElementById("root"));


function Content() {
    return (
        <>
            <Head logoList= {logoList} />
            <Body objects={listObject} map={imageMap} listImages={listImages}/>
			<Footer />
        </>
    );
}

root.render(<Content />);

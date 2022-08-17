import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
    listAll,
    getMetadata,
} from 'firebase/storage';

import { authConfig } from "./config"


interface fileType {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
}

export class Upfile {
    constructor() { }
    async upfile(file: fileType[]) {

        const app = initializeApp(authConfig.firebaseConfig);
        const storage = getStorage(app);

        let resultLinks: Object[] = [];
        for (let i = 0; i < file.length; i++) {
            const e = file[i];
            const storageRef = ref(storage, e.originalname);
            const metadata = {
                contentType: e.mimetype,
            };
            const uploadTask = await uploadBytes(storageRef, e.buffer, metadata);
            const linkFile = await getDownloadURL(uploadTask.ref);
            resultLinks.push({ [e.originalname]: linkFile })
        }
        return resultLinks;
    }
    // async downFile() {
    //     try {
    //         const app = initializeApp(authConfig.firebaseConfig);
    //         const storage = getStorage(app);
    //         getDownloadURL(ref(storage, '1234.jpg'))
    //             .then((url) => {
    //                 // `url` is the download URL for 'images/stars.jpg'

    //                 // This can be downloaded directly:
    //                 var solicitud = new XMLHttpRequest();
    //                 const a = solicitud.open('GET', url, true);
    //                 console.log(solicitud)
    //                 solicitud.onload = () => {
    //                     const blob = solicitud.response;
    //                     console.log(blob)
    //                 };
    //                 solicitud.send();

    //             })
    //     }
    //     catch (err) {
    //         throw err
    //     }
    // }
    async downFile() {
        const jszip = new JSZip();
        const app = initializeApp(authConfig.firebaseConfig);
        const storage = getStorage(app);
        const folderRef = ref(
            storage,
            '11/2FImage_created_with_a_mobile_phone.png'
        );
        const folder = await listAll(folderRef);
        console.log(folderRef)
        console.log(folder)
        const promises = folder.items
            .map(async (item) => {
                const file = await getMetadata(item);
                const fileRef = ref(storage, item.fullPath);
                const fileBlob = await getDownloadURL(fileRef).then((url) => {
                    return fetch(url).then((response) => response.blob());
                });
                jszip.file(file.name, fileBlob);
            })
            .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());
        await promises;
        const blob = await jszip.generateAsync({ type: 'blob' });
        saveAs(blob, 'download.zip');
    };
}

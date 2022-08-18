import { initializeApp } from "firebase/app";
import { getBlob, getBytes, getDownloadURL, getStorage, getStream, ref, uploadBytes } from "firebase/storage";
import fetch from 'node-fetch';
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

    async downFile() {
        const jszip = new JSZip();
        const app = initializeApp(authConfig.firebaseConfig);
        const storage = getStorage(app);
        const folderRef = ref(
            storage,
            '11'
        );
        const folder = await listAll(folderRef);

        const promiseGetBytes = folder.items
            .map(async (item) => {
                const file = await getMetadata(item);
                const fileRef = ref(storage, file.fullPath);
                return getBytes(fileRef);
            })
        const afterGetImage = await Promise.all(promiseGetBytes);

        for (let i = 0; i < folder.items.length; i++) {
            jszip.file(folder.items[i].name, afterGetImage[i]);
        }

        const blob = await jszip.generateAsync({ type: 'arraybuffer' });

        const metadata = {
            contentType: 'application/zip',
        };

        const zipFileRef = ref(storage, `zip/${Date.now()}.zip`);
        const uploadTask = await uploadBytes(zipFileRef, blob, metadata);
        const linkFile = await getDownloadURL(uploadTask.ref);
        return linkFile
    };
}

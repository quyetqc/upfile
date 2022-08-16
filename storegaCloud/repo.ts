import { NextFunction } from "express";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

}


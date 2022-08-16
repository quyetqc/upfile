import { NextFunction } from "express";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, uploadString } from "firebase/storage";
import { authConfig } from "./config"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase
export class Upfile {
    constructor() { }
    async upfile() {
        const app = initializeApp(authConfig.firebaseConfig);
        // Initialize Cloud Storage and get a reference to the service
        const storage = getStorage(app);
        const file = new File([""], "1234.jpg", {})
        const metadata = {
            contentType: 'image/jpeg'
        };

        // Create a child reference
        const imagesRef = ref(storage, 'images/1234.jpg');
        // const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
        // const a = await uploadString(imagesRef, message4, 'data_url')
        const uploadTask = await uploadBytesResumable(imagesRef, file, metadata);
        return uploadTask
    }
}

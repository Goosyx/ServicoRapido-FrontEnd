import { FirebaseApp, initializeApp } from "firebase/app";
import { config } from "../../config/config";
import { getStorage } from "firebase/storage";

const firebaseConfig = config.firebase;

class Firebase {
  app: FirebaseApp | null = null;

  initializeApp() {
    this.app = initializeApp(firebaseConfig);
  }

  startStorageListener() {
    if (this.app) {
      const storage = getStorage(this.app);
      return storage;
    }
  }
}

export default Firebase;

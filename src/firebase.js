import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCT2B94sVhuC941SUw3ysU5FDokGv64VEo",
  authDomain: "henon-news.firebaseapp.com",
  projectId: "henon-news",
  storageBucket: "henon-news.firebasestorage.app",
  messagingSenderId: "614257705035",
  appId: "1:614257705035:web:3e6f43dc12d041f2108dce"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
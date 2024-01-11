// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwqCa1Jz-NqZwWki2Jet-vAS2pnBRiDrE",
  authDomain: "pixabay-project-modun-2.firebaseapp.com",
  projectId: "pixabay-project-modun-2",
  storageBucket: "pixabay-project-modun-2.appspot.com",
  messagingSenderId: "1066065823779",
  appId: "1:1066065823779:web:da88ebb032c55ff0d78996",
  measurementId: "G-19G2QGJRRM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
// Nhận tham chiếu đến dịch vụ lưu trữ, được sử dụng để tạo tham chiếu trong bộ chứa lưu trữ của bạn
export const storage = getStorage(app);

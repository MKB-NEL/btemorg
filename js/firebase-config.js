// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBBSNRSIEooqL1FZe-MQTzx2AntRvfJ85o",
    authDomain: "joefootball-15e7a.firebaseapp.com",
    databaseURL: "https://joefootball-15e7a-default-rtdb.firebaseio.com",
    projectId: "joefootball-15e7a",
    storageBucket: "joefootball-15e7a.firebasestorage.app",
    messagingSenderId: "976347287101",
    appId: "1:976347287101:web:5026e12d6d960c58986454",
    measurementId: "G-PQ44W4HM93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// ImgBB API Key
const IMGBB_API_KEY = '15acc1b15d87de413ad23ab86fb6d6c1';

// Upload image to ImgBB
async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);

    try {
        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            return data.data.url;
        } else {
            throw new Error('Image upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

// Predefined accent colors (12 colors as requested)
const PREDEFINED_COLORS = [
    '#4361ee', '#3a0ca3', '#7209b7', '#f72585',
    '#4cc9f0', '#4895ef', '#560bad', '#b5179e',
    '#f15bb5', '#9b5de5', '#00bbf9', '#00f5d4'
];

// Lighten color function for user count display
function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
        .toString(16)
        .slice(1)}`;
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Export everything
export { 
    db, 
    auth,
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    onSnapshot,
    signInWithEmailAndPassword,
    signOut,
    uploadImage,
    PREDEFINED_COLORS,
    lightenColor,
    formatNumber
};

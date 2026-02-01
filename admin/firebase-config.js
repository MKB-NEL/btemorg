// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBBSNRSIEooqL1FZe-MQTzx2AntRvfJ85o",
    authDomain: "joefootball-15e7a.firebaseapp.com",
    projectId: "joefootball-15e7a",
    storageBucket: "joefootball-15e7a.firebasestorage.app",
    appId: "1:976347287101:web:5026e12d6d960c58986454"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ImgBB API
const IMGBB_API_KEY = '15acc1b15d87de413ad23ab86fb6d6c1';

async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);

    const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
    });
    
    const data = await response.json();
    return data.success ? data.data.url : null;
}

// Predefined colors (Professional palette)
const PREDEFINED_COLORS = [
    '#0066FF', '#00D4AA', '#7B61FF', '#FF6B82',
    '#00C6FF', '#8B46FF', '#FF8F2D', '#2DD4BF',
    '#6366F1', '#EC4899', '#10B981', '#3B82F6'
];

// Color utilities
function lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}

function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

export { 
    db, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot,
    query, where, orderBy, uploadImage, PREDEFINED_COLORS, lightenColor, formatNumber
};

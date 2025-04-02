// Firebase configuration - Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAGS-pJEzaczjKLJYzmH9SfTUdbA4Wog5s",
    authDomain: "attendence-a0f9f.firebaseapp.com",
    projectId: "attendence-a0f9f",
    storageBucket: "attendence-a0f9f.firebasestorage.app",
    messagingSenderId: "399592495310",
    appId: "1:399592495310:web:f9f2b70e4318486034d89f"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const qrSection = document.getElementById('qr-section');
const otpSection = document.getElementById('otp-section');

// Toggle between login and signup forms
function toggleForm(formType) {
    if (formType === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        qrSection.classList.add('hidden');
        otpSection.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        qrSection.classList.add('hidden');
        otpSection.classList.add('hidden');
    }
}

// Generate QR Code
function generateQRCode(email) {
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: email,
        width: 200,
        height: 200
    });
}

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        showQRCode(email);
    } catch (error) {
        alert('Login Error: ' + error.message);
    }
});

// Handle Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const name = document.getElementById('signupName').value;

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.auth().currentUser.updateProfile({
            displayName: name
        });
        showQRCode(email);
    } catch (error) {
        alert('Signup Error: ' + error.message);
    }
});

// Show QR Code
function showQRCode(email) {
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    qrSection.classList.remove('hidden');
    document.getElementById('qrcode').innerHTML = '';
    generateQRCode(email);
    
    // Simulate QR code scan (in real app, this would be triggered by actual scan)
    setTimeout(() => {
        const otp = generateOTP();
        // In a real application, send this OTP to user's email using Firebase Cloud Functions
        console.log('OTP:', otp);
        showOTPSection();
    }, 5000); // Simulate 5 second delay for QR scan
}

// Show OTP Section
function showOTPSection() {
    qrSection.classList.add('hidden');
    otpSection.classList.remove('hidden');
}

// Handle OTP Verification
document.getElementById('otpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredOTP = document.getElementById('otpInput').value;
    // In a real application, verify OTP with the one sent to email
    if (enteredOTP.length === 6) {
        alert('Authentication Successful!');
        // Redirect to dashboard or home page
    } else {
        alert('Invalid OTP. Please try again.');
    }
});

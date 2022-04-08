// =================================================================
// =======================  FIREBASE ================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyC1uwGn2ocXedWpgrQPMZrcLSemFxAj688",
    authDomain: "firestoretutorial-f54a8.firebaseapp.com",
    projectId: "firestoretutorial-f54a8",
    storageBucket: "firestoretutorial-f54a8.appspot.com",
    messagingSenderId: "979847911780",
    appId: "1:979847911780:web:8d65a7c0bd7e65acc7c271"
};

const app = initializeApp(firebaseConfig);

//---------------- Import Firestore Form Firebase libary ----------------------------------
import {
    getFirestore, doc, getDoc, onSnapshot, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

//   ========================== FIREBASE ===========================
// ================================================================

// สร้างตัวแปรเรียกใช้ Database
const db = getFirestore();
// Input
const username = document.getElementById('userInp');
const email = document.getElementById('emailInp');
const pass = document.getElementById('passInp');
// Button
const subBtn = document.getElementById('sub_btn');

// Function Authentication ตรวจสอบข้อมูล User
async function AuthenticateUser() {
    const ref = doc(db, "UsersList", username.value);
    // สร้างตัวแปร = ตัวแปรรับข้อมูลในฐานข้อมูล
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
   
               // console.log(docSnap.data().NameOfStd);
        // สร้างตัวแปร = function decPass .รหัสผ่าน
        let dbpass = decPass(docSnap.data().password);
        // ถ้ารหัสผ่านที่กรอกตรงกับ == dbPass
        if (dbpass == pass.value) {
            // ส่งข้อมูลทั้งหมด/ข้อมูลผู้ใช้ที่login ไปใน function
            //เรียกใช้ Function login(parameter 1 );
            login(docSnap.data());
    
            // alert("Nice!")
        
        }
        // console.log(docSnap.data().NameOfStd);
    } else {//ถ้าไม่เป็นจริง
        alert("ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง!");
    }
}

// -----Function encription การเข้ารหัสให้รหัสผ่าน---------
function decPass(dbpass) {//decrypt ถอดรหัส
    let pass12 = CryptoJS.AES.decrypt(dbpass, pass.value);
    return pass12.toString(CryptoJS.enc.Utf8);//Return ตัวเลข
}

// --------------- Function Login -----------------
async function login(user) {//user = รับ parameter ที่ส่งมา
await   Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'เข้าสู่ระบบสำเร็จ',
    showConfirmButton: false,
    timer: 1500
  })
    // สร้างตัวแปร อ้างอิงไปยัง id tag +เมื่อผู้ใช้ check switch
    let keepLoggedIn = document.getElementById('customSwitch1').checked;
    //  ถ้าไม่กด ckeck ส่งก้อนobject แบบ session  และไปยังหน้า home
    if (!keepLoggedIn) {
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location = "home.html";
    }
    //  ถ้ากด check
    else {
        // บันทึกข้อมูลผู้ใช้ที่ login ใน Localstorage ความจำbrowser
        localStorage.setItem('keepLoggedIn', 'yes');
        //  ส่งก้อนobject ของผู้ใช้
        localStorage.setItem('user', JSON.stringify(user));
        //  และไปยังหน้า home
        window.location = "home.html";
    }
    
}

// ------ เพิ่ม Event เมื่อกดปุ่ม ---Assign Event Button---------
subBtn.addEventListener('click', AuthenticateUser);
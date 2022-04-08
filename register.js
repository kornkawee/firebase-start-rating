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

// Function Check input ว่าง
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}
// Function------- ตรวจสอบตัวอักษรพิเศษ Validation-------------------------
function Validation() {

    // ตรวจสอบตัวอักษรพิเศษ E-mail
    let emailregex = /^[a-zA-z0-9]+@(gmail|yohoo|outlook)\.com$/;
    // ตรวจสอบตัวอักษรพิเศษ Username
    let userregex = /^[a-zA-Z0-9]{5,}$/;

    // ตรวจสอบการกรอก inout ไม่ครบ หรือ มีช่องว่าง
    // ถ้า username.value มีค่าว่าง หรือ  email.value มีค่าว่าง
    if (isEmptyOrSpaces(username.value) || isEmptyOrSpaces(email.value)
        //  หรือ pass.value มีค่าว่าง  
        || isEmptyOrSpaces(pass.value)) {
        // alert("กรุณากรอกข้อมูลให้ครบ");
        Swal.fire(
            {
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบ',
                text: 'You clicked the button!',
                confirmButtonText: 'Ok',
                confirmButtonColor: 'warning',
            },
        )
        return false;
    }
    // ถ้า Input email.value ไม่เท่ากับ ตัวแปร emailregex
    if (!emailregex.test(email.value)) {//แจ้งเตือนข้อความ
        alert("ใส่อีเมลที่ถูกต้อง! | enter a vaild email");
        return false;//ไม่ให้ Function ทำงานต่อ
    }
    // ถ้า Input username.value ไม่เท่ากับ ตัวแปร userregex
    if (!userregex.test(username.value)) {//แจ้งเตือนข้อความ
        // alert(".username can only be alphanumeric \n-username must be aleast 5 character\n-username cannot contain spaces");
        alert("ชื่อผู้ใช้ต้องเป็นตัวอักษรและตัวเลขเท่านั้น \nชื่อผู้ใช้ต้องมีอักขระอย่างน้อย 5 ตัว\nชื่อผู้ใช้ไม่สามารถมีช่องว่าง");
        return false;//ไม่ให้ Function ทำงานต่อ
    }
    // ถ้ากรอกข้อความถูกต้อง return จริง
    return true;
}

// Function Register UserTo Firebase
async function RegisterUser() {

    // เรียกใช้ Function ตรวจสอบตัวอักษรพิเศษ
    if (!Validation()) {//ถ้าไม่เท่ากับ function Validation
        return; //สิ้นสุดการทำงานของ function RegisterUser()
    }


    // get(child(dbRef, "UsersList/" + username.value))

    //  สร้างตัวแปร = db+"ชื่อ databse" + ชื่อแถวกำหนดเอง(primaryKey)
    const ref = doc(db, "UsersList", username.value);
    // สร้างตัวแปร = ตัวแปรรับข้อมูลในฐานข้อมูล
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        Swal.fire(
            {
                icon: 'warning',
                title: 'มีข้อมูลอยู่แล้ว',
                text: 'You clicked the button!',
                confirmButtonText: 'Ok',
                confirmButtonColor: 'warning',
            },
        )
        // console.log(docSnap.data().NameOfStd);
    }
    // ถ้าไม่มีข้อมูลผู้ใช้นี้อยู่ใน collection
    else {//ถ้าไม่เป็นจริง

        await setDoc(
            ref,{
                // นำข้อมูลจาก input ไปเพิ่ม collection Value:
                // Field Name: Value
                Username: username.value,
                Email: email.value,
                //   password: pass.value
                password: enPass()  //เข้ารหัสให้ รหัสผ่าน
            })
            //จากนั้น ถ้าเพิ่มข้อมูลสำเร็จ ส่งAlert
            .then(() => {//Arrow Function
                Swal.fire(
                    {
                        icon: 'success',
                        title: 'ลงทะเบียนสำเร็จ',
                        text: 'You clicked the button!',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: 'green',
                    },
                )
                username.value = "";
                email.value = "";
                pass.value = "";
            })
            // ถ้าเพิ่มข้อมูลสำเร็จ ส่งAlert
            .catch((error) => {//Arrow Function
                alert("error:" + error);
            });
    }
}


// Function เข้ารหัสให้รหัสผ่าน encription
function enPass() {  //encrypt เข้ารหัส
    let pass12 = CryptoJS.AES.encrypt(pass.value, pass.value);
    return pass12.toString();//Return เป็นชุดข้อมความแบบ string " "
}

// ------ เพิ่ม Event เมื่อกดปุ่ม ---Assign Event Button---------
subBtn.addEventListener('click', RegisterUser);
//==========================================================
//                    FireBase FireStore
//============================================================
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

//---------------- Import Firebase Storage Form Firebase libary ----------------------------------
import {
    getStorage, ref as sRef, uploadBytesResumable,
    deleteObject, getDownloadURL
}
    from "https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js"


//สร้างตัวแปร เรียกใช้งาน Function firebase
const db = getFirestore();
const storage = getStorage();
//==========================================================
//                    FireBase FireStore
//============================================================


// --------------------- สร้างตัวแปรอ้างอิงไปยัง id ---------------------------

const userlink = document.getElementById('userlink');
const signoutlink = document.getElementById('signoutlink');
const header = document.getElementById('hh');

const rate = document.getElementsByName('rate');
const message = document.getElementById('message');
const btnPost = document.getElementById('btnPost');
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const heading = document.getElementById('heading');
const textarea = document.querySelector('.textarea');
const formreview = document.getElementById('formreview');

let progress = document.getElementById('progress');
let progressbar = document.getElementById('progressbar');
let progessPercen = document.getElementById('progessPercen');

const addnewreview = document.querySelector(".edit");

const selectimg = document.getElementById('selectimg');
let myimg = document.getElementById('myimg');
let namebox = document.getElementById('namebox');
let extlab = document.getElementById('extlab');
const closeReview = document.getElementById('closeReview');


// ส้รางตัวแปร สร้าง tag Input
let input = document.createElement('input');

closeReview.style.display = "none";

let currentUser = null;
let banana = {
    email: "momo",
    nana: null
}


//------------- Function ดึงชื่อ User ดึงข้อมูล User --------------
function GetUsername() {
    // สร้างตัวแปร = ตรวจสอบการกด check ใน localStorage ความจำ browser
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");

    // ถ้าการกด check == มีการบันทึกไว้
    if (keepLoggedIn == "yes") {
        // นำข้อมูลของ user จาก localStorage ไปใส่ไว้ในตัวแปร
        currentUser = JSON.parse(localStorage.getItem('user'));
        console.log("localStorage", currentUser);
    }
    else {
        // ถ้าไม่ได้บันทึก นำข้อมูลของ user จาก sessionStorage(จากการLogin)ไปใส่ไว้ในตัวแปร
        currentUser = JSON.parse(sessionStorage.getItem('user'));
        // console.log("sessionStorage", currentUser);
        // console.log(currentUser);
    }

}
//------------- Function ออกจากระบบ--------------
async function Signout() {
    // ลบข่อมูล User จากการ login
    sessionStorage.removeItem('user');
    // ลบข้อมูล User ที่บันทึกไว้ใน localStorage
    localStorage.removeItem('user');
    // ลบข้อมูล การกด Check ที่บันทึกไว้ใน localStorage
    localStorage.removeItem('keepLoggedIn');
  await  Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'ออกจากระบบเรียบร้อย',
        showConfirmButton: false,
        timer: 1500
      })
    // ย้ายหน้าจอไปหน้า = ""
    window.location = "home.html";
}

// ------  - function เมื่อโหลดหน้าจอใหม่ --- - -  
window.onload = () => {//Arrow Function
    // เรียกใช้ function ดึงข้อมูล User
    GetUsername();

    // ถ้าข้อมูล user == ค่าว่าง
    if (currentUser == null) {
        // userlink tag แสดงชื่อ ผู้ใช้
        // แทนที่ข้อความใน userlink
        userlink.innerText = "Create New Account";
        // แทนที่ class="nav-link" ด้วย class="btn"
        userlink.classList.replace("nav-link", "btn");
        // เพิ่ม btn-primary ภายใน class="btn"
        userlink.classList.add("btn-primary");
        // เปลี่ยน link ให้ไปที่ login.html
        userlink.href = "register.html";

        // userlink tag แสดง Logout
        // แทนที่ข้อความใน userlink = ชื่อผู้ใช้
        signoutlink.innerText = "Log in";
        // แทนที่ class="btn" ด้วย class="nav-link"
        signoutlink.classList.replace("nav-link", "btn");
        // ลบ btn-primary ภายใน class="nav-link"
        signoutlink.classList.add("btn-success");
        signoutlink.classList.add("ms-1");
        // เปลี่ยน link ให้ไปที่ หน้าปัจจุบัน + function Logout
        signoutlink.href = "login.html";

   
        btnPost.style.display = "none";
        formreview.style.display = "none";
        widget.addEventListener('click', () => {
            Swal.fire(
                {
                    icon: 'warning',
                    title: 'คุณยังไม่ได้ เข้าสู่ระบบ',
                    text: 'กรุณาลงชื่อเพื่อเข้าสู้ระบบ',
                    confirmButtonText: 'เข้าสู่ระบบ',
                    confirmButtonColor: 'primary',
                    cancelButtonColor: '#e92e3d',
                    // showconfirmButton:true,
                    showCancelButton: true,
                    cancelButtonText:'ยกเลิก'
                },
            )
                .then((result) => {
                    if(result.isConfirmed){
                        window.location = "login.html";
                    }
                    else{
                        // window.location = "home.html";
                    }
               
                })

        });


    }
    else {
        // userlink tag แสดงชื่อ ผู้ใช้
        // แทนที่ข้อความใน userlink = ชื่อผู้ใช้
        userlink.innerText = `Welcome : ${currentUser.Username}`;
        // แทนที่ข้อความใน header = ""
        // header.innerText = `Welcome ${currentUser.Email}`;
        // แทนที่ class="btn" ด้วย class="nav-link"
        userlink.classList.replace("btn", "nav-link");
        signoutlink.classList.add("ms-1");
        // ลบ btn-primary ภายใน class="nav-link"
        userlink.classList.remove("btn-primary");
        // เปลี่ยน link ให้ไปที่ หน้าปัจจุบัน
        userlink.href = "#";

        // userlink tag แสดง Logout
        // แทนที่ข้อความใน userlink = ชื่อผู้ใช้
        signoutlink.innerText = "Sign Out";
        // แทนที่ class="btn" ด้วย class="nav-link"
        signoutlink.classList.replace("btn", "nav-link");
        // ลบ btn-primary ภายใน class="nav-link"
        signoutlink.classList.remove("btn-success");
        signoutlink.classList.add("btn-logout");
        // เปลี่ยน link ให้ไปที่ หน้าปัจจุบัน + function Logout
        signoutlink.addEventListener('click', () => {
            Signout();
        });
        

        btnPost.addEventListener('click', () => {
            UploadProcess()
              // ปิด widget เปลี่ยน style.display
              widget.style.display = "none";
              // แสดง post เปลี่ยน style.display
              post.style.display = "none";
              progress.style.display = "block";


        });
    }

    GetAllDataRealTime();

}

// addnewreview.addEventListener('click', () => {//Arrow Function
//     location.reload();
// });

// ========================================================
// ====================== Image Selected ==========================
// ===============================================================
// สร้าง ตัวแปร = Array = [ค่าว่าง];
let files = [];
//สร้างตัวแปร = function อ่าน file
let reader = new FileReader();

// เลือก input ประเภท ไฟล์
input.type = 'file';

// ซ่อน Input แสดงชื่อ Fileรูปเมื่อยังไม่เลือกรูป 
namebox.style.display = "none";
extlab.style.display = "none";
// progress.style.display = "none";

// เมื่อเลือกไฟล์ที่ต้องการ = ส่ง paramter
input.onchange = e => {


    // ตัวแปร Array = parameter(e).ชุดดข้อมูล.file
    files = e.target.files;

    // สร้างตัวแปร = เรียกใช้ function รับชื่อไฟล์ ส่ง array files ตำแหน่งที่ index
    let extention = GetFileExt(files[0]);

    // สร้างตัวแปร = เรียกใช้ function รับชื่อไฟล์ ส่ง array files ตำแหน่งที่ index 
    let name = GetFileName(files[0]);
    // ข้อมูลในช่อง namebox = ชื่อไฟล์

    namebox.value = name;
    // ข้อมูลในช่อง extlab.แทนที่ด้วย = ชื่อไฟล์  
    extlab.innerHTML = extention;

    //    อ่านชื่อไฟล์ แบบ URL(ส่ง array files ตำแหน่งที่ index )
    reader.readAsDataURL(files[0]);
}

// เมื่อโหลดรูปภาพจากเครื่อง
reader.onload = function () {
    // แสดงผลลัพชื่อ file. = ในidรูป.src
    myimg.src = reader.result;
    // แสดง Input แสดงชื่อ Fileรูปเมื่อโหลดรูปจากตัวเครื่องสำเร็จ 
    namebox.style.display = "block";
    extlab.style.display = "block";
        selectimg.style.display = "none";
}

// เมื่อคลิกปุ่ม select image
selectimg.addEventListener('click', () => {//ArrowFunction
    input.click();

    // ซ่อน Input เลือกรูป เมื่อยังไม่เลือกรูป 
    // selectimg.style.display = "none";
});

// สร้าง function(รับค่า parameter 1 ตัว) จาก file[0]
function GetFileExt(file) {
    // สร้างตัวแปร แบ่งชุดข้อความทั้งหมดด้วย จุด'.'
    let temp = file.name.split('.');
    // สร้างตัวแปร = เลือกเฉพาะชุดข้อความชุดสุดท้าย(.png)
    let ext = temp.slice((temp.length - 1), (temp.length));
    // รีเทินค่า จุด+ชุดข้อความชุดสุดท้าย ตำแหน่งที่index (.png)
    return '.' + ext[0];
}

// สร้าง function(รับค่า parameter 1 ตัว) จาก file[0]
function GetFileName(file) {
    // สร้างตัวแปร แบ่งชุดข้อความทั้งหมดด้วย จุด'.'
    let temp = file.name.split('.');
    // สร้างตัวแปร = นำข้อความชุดแรก 
    //เชื่อมด้วยจุด('.')
    //นำข้อความชุดสุดท้ายไปต่อ
    let fname = temp.slice(0, -1).join('.');
    // รีเทินชุดข้อความ
    return fname;
}
// ========================================================
// ====================== Image Selected ==========================
// ===============================================================
// ========================================================
// ====================== Upload Process ==========================
// ===============================================================

 function UploadProcess() {

    let ImgToUpload = files[0];

    let ImgName = namebox.value + extlab.innerHTML;

    const metaData = {
        contentType: ImgToUpload.type
    }

    const storageRef = sRef(storage, "ImageFirestore/" + ImgName);

    const UploadTask =  uploadBytesResumable(storageRef, ImgToUpload, metaData);

    UploadTask.on('state-changed', (snapshot) => {
        let progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // proglab.innerHTML = "Upload" + progess + "%";
        progressbar.style.width = progess + '%';
        progessPercen.innerHTML = progess + "%";
        // console.log(progess);
        // console.log(progressbar);
    },
        (error) => {
            alert("error: Image not Uploaded" + error);
        },
        () => {
            post.style.display = "block";
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURl) => {
                // console.log(downloadURl);
                // เมื่อ Upload รูปสำเร็จ เรียกใช้ function +  URLของรูปภาพที่อัปโหลดเสร็จแล้ว
                // ใส่ค่าไปยัง parameter
                SaveURLtoFirestore(downloadURl);
            });
        }
    );
}

// ====================== Star Selected && Comment ==========================

progress.style.display = "none";

// ============= Insert data For Firestore Database ================

// Function เพิ่ม URLlinkของ Imageที่อัปโหลดไปยัง storage แล้ว
//รับค่า parameter 1 ตัว เป็น URLของรูปภาพที่อัปโหลดเสร็จแล้ว
function SaveURLtoFirestore(url) {
    console.log(url);
    // ว/ด/ป ปัจจุบัน
    let today = new Date();
    // console.log(today);
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let seconds = today.getSeconds();
    let timetoday = {
        currentYear,
        currentMonth,
        currentDate,
        hour,
        minute,
        seconds
    }
    // console.log(timetoday);

    // สร้างตัวแปร = ข้อมูลในช่อง namebox ชื่อรูป
    let name = namebox.value;
    // สร้างตัวแปร = ข้อมูลในช่อง ext นามสกุลรูป
    let ext = extlab.innerHTML;
    // สร้างตัวแปรมารับค่า Star rating
    let countrate;
    // Star Rating
    rate.forEach(radio => {
        if (radio.checked) {
            // console.log(radio.value);
            countrate = radio.value;
            // console.log("Rating",countrate);
        }
    });
    // สร้างตัวแปรมารับค่า ข้อความรีวิว
    let textreview = message.value;
    // ImageRealTimeReview

    // Insert Auto Id
    let ref = collection(db, "ImageFirestoreReview");
    // ข้อมูลที่เพิ่มใน ref
   const docref =  addDoc(
       ref, {
        //ImageNameซ  ชื่อรูปภาพ+(.png)
        ImageName: (name + ext),
        // IMageURL: URLของรูปภาพที่อัปโหลดเสร็จแล้ว
        ImageURL: url,
        EmailUser: currentUser.Email,
        Rate: countrate,
        Review: textreview,
        TimeReview: timetoday
    })
        .then(() => {
            //   alert("Data Add Successfully!");
            Swal.fire(
                {
                    icon: 'success',
                    title: 'บันทึกข้อมูลสำเร็จ',
                    text: 'You clicked the button!',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green',
                },
            )
        })
        .catch((error) => {
            alert("Someting Wrong!:" + error);
        });
}
// ========================================================
// ====================== Upload Process ==========================
// ===============================================================
// ========================================================
// ====================== Delete Function ==========================
// ===============================================================

// Delete Data From Storage
async function DeleteDocument(id) {
    console.log("id Is = ", id);
    let ref = doc(db, "ImageFirestoreReview", id);

    const docSnap = await getDoc(ref);
    // ถ้ามีข้อมูล
    if (docSnap.exists()) {
        // console.log(docSnap.data().ImageName);
        const postImg = docSnap.data().ImageURL;
        const nameid = docSnap.data().ImageName;
        //ถ้า postImg ไม่เป็นค่าว่าง 
        if (postImg != null) {
            // console.log(postImg);
            const desertRef = sRef(storage, postImg);
            deleteObject(desertRef)
                .then(() => {
                    Swal.fire(
                        {
                            icon: 'success',
                            title: 'ลบข้อมูลสำเร็จ',
                            // text: 'You clicked the button!',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: 'green',
                        });
                    console.log(postImg, "Delete Image Successfully!");
                    // เรียกใช้ Function ส่ง param 1 ค่า id ของ fieldนี้ = name 
                    // DeleteFireStoreData(nameid);
                    DeleteFireStoreData(id);
                })
                .catch((error) => {
                    // Uh-oh, an error occurred!
                    console.log(error);
                });
        }
        //  DeleteFireStoreData(id);

    }
    else {//ถ้าเป็นเท็จ
        alert("No such Document!");
    }
}

// Delete Data From Firestore
async function DeleteFireStoreData(nameid) {

    console.log("id Is = ", nameid);
    const ref = await doc(db, "ImageFirestoreReview", nameid);
    deleteDoc(ref)
        .then(() => {


            // console.log(nameid, "Delete data From firestore Successfully!");
        })
        .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
        });

}

// ========================================================
// ====================== Delete Function ==========================
// ===============================================================


// ================ Gat Data to table ==========================
// สร้างตัวแปร ค่าเริ่มต้นที่ 0
let stdNo = 0;

// สร้างตัวแปรอ้างอิงไปยัง id="tbody1" ของ tag
let tbody = document.getElementById('tbody1');


// function เพิ่มข้อมูลใน Tag / แทนที่
// สร้าง function (ตัวแปรรับค่า parameter 4 ตัว)
function AddItemToTable(id, imagename, emailuser, imageurl, rate, review, timereview) {
    // console.log(emailuser);


    //     // สร้างตัวแปร +  สร้าง Element tr
    let trow = document.createElement('tr');
    trow.classList.add('shadow-sm')
    // สร้างตัวแปร + สร้าง Element td
    let td6 = document.createElement('td');
    // สร้างตัวแปร สร้างปุ่ม
    const btndel = document.createElement('button');
    let btnAdd = document.createElement('button');
    // สร้างตัวแปร = string
    const starTotal = 5;
    const starpercentage = (rate / starTotal) * 100;
    const starPercentageRounded = `${Math.round(starpercentage / 10) * 10}%`;
    // console.log("starPercentageRounded", starPercentageRounded);

    // ซ่อนปุ่ม เมื่อผู้ใช้ไม่ login / แสดงปุ่ม เมื่อผู้ใช้ login 
    if (currentUser == null) {
        currentUser = {
            username: 'null',
            email: 'null',
            password: 'null',
            userId: 'null',
        }
        btndel.setAttribute('class', 'btn btn-danger');
        btndel.style.display = 'none';
        // btndel.classList.replace("btn", "nav-link");
    } else {
        // console.log(currentUser);
        if (emailuser == currentUser.Email) {
            // alert("userid === currentUser.userId");
            btndel.setAttribute('class', 'btn btn-danger');
            btndel.innerHTML = `<i class="fas fa-trash-alt"></i>`;
            btndel.addEventListener('click', () => {
           
                Swal.fire({
                    title: 'คุณต้องการลบโพสนี้หรือไม่',
                    // text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'ยกเลิก',
                    confirmButtonText: 'ยืนยัน'
                  }).then((result) => {
                    if (result.isConfirmed) {
                             DeleteDocument(id);
                    }
                  })
            });
        }
        if (emailuser != currentUser.Email) {
            // btndel.setAttribute('class', 'btn btn-success');
            // btndel.innerHTML = `<i class="fas fa-trash-alt"></i>`;
            btndel.style.display = 'none';
        }
    }
    // // เซ็ต Id ให้ปุ่ม  + เก็บค่า Id ไว้ที่ปุ่ม
    // btndel.setAttribute('data-id', id)
    // // ใส่ข้อความให้ปุ่ม
    // // btndel.textContent = 'ลบข้อมูล';

    // // เมื่อมีการคลิกปุ่มลบข้อมูล

    trow.innerHTML = `
    <td colspan="6" >
    <div class="container maincontent py-2 ">
    <div class="row   ">
        <div class="col-lg-1 col-md-2 col-sm-3 b ms-lg-4">
            <!-- Image Icon -->
           <div class="container-img">
               <div class="image-container">
               <img class=" img-circle " src="assets/image/grape.png" alt="img">
               </div>
           </div>
        </div>
        <div class="col-lg-10 col-sm-9  ms-lg-3 ">
          <div id="contname" class="contname">
         <!-- <div >${imagename}:${emailuser}</div> -->
            <div >${emailuser}</div>
     
           
          </div>
         <div class="row starcont  mb-2">
             <div class="col-lg-2 col-md-3 col-sm-4 ">
                 <div class="stars-outer">
  <div class="stars-inner"  style="width: ${starPercentageRounded};"></div>
</div>
             </div>
             <div class="col-lg-1 col-md-3 col-sm-4 countrate">
                        ${rate}/5
         </div>
            <div class="datecont text-success mb-2">
          <div class="row">
          <div  class="col-lg-2 col-md-4 col-sm-12">
          วันที่ ${timereview.currentDate}:${timereview.currentMonth}:${timereview.currentYear}</div>  
          <div class="col-lg-2 col-md-4 col-sm-12">
          เวลา  ${timereview.hour}:${timereview.minute}:${timereview.seconds}</div>
          </div>
            </div>

            <div class="reviewcont mb-2">${review}</div>
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-6  ">
                 <img class=" image-review img-fluid" src="${imageurl}" alt="img">
                </div>
            </div>
        </div>

     </div>
     </td>
    `;
    //เพิ่ม tag btn เข้าไปใน tag td
    // td6.appendChild(btnAdd);
    // td7.appendChild(btnEdit);
    td6.appendChild(btndel);

    trow.appendChild(td6)
    // เพิ่ม Tag tr เข้าไปใน tag tbody = id="tbody1"
    tbody.appendChild(trow);

}

function AddAllItemsToTable(TheStudent) {
    // console.log(TheStudent);
    stdNo = 0;
    // tag tbody.แทนที่ข้อความด้วยค่าว่าง =""
    tbody.innerHTML = "";
    // Loop Parameter ที่รับเข้ามา
    TheStudent.forEach(element => {
        // เรียกใช้ Function AddItemToTable() 
        //+นำค่าที่ Loop ไปใส่ใน function AddItemToTable(4 ค่า) 
        AddItemToTable(
            element.id,
            element.data().ImageName,
            element.data().EmailUser,
            element.data().ImageURL,
            element.data().Rate,
            element.data().Review,
            element.data().TimeReview
        );
    });
}

// Function Get Data From database แบบ RealTime
async function GetAllDataRealTime() {

    // สร้างตัวแปร = อ้างอิงไปยัง ตารางใน db=firestore ,"ชื่อตาราง"
    const dbRef = await collection(db, "ImageFirestoreReview");

   // function  onSnapshot ส่งตัวแปร(รับค่า parameter 1 ตัว)
   onSnapshot(dbRef, (querySnapdhot) => {
    // สร้าง Array = [ค่าว่าง];
    let students = [];
    // นำค่าจาก parameter มา loop
    querySnapdhot.forEach(doc => {
        // ยำค่าที่ loopได้ ไปยัดใส่ array student
        // AddItemToTable(doc);
        students.push(doc);
        // console.log(doc.id);
        // AddAllItemsToTable(students);
    });
    // console.log(students);
    // เรียกใช้ function(ส่งค่าใน Array ไปยังfunction)
    AddAllItemsToTable(students);
});
}



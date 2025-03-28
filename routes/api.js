import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import path from "path";
import { Router } from "express";
import sharp from "sharp"; // For image compression
import authenticate from "../middlewares/authenticate.js";
import { file_storage } from "../middlewares/upload.js";
import * as userController from "../controllers/frontend/userApiController.js";
import * as patientController from "../controllers/frontend/patientApiController.js";

const router = Router();
const upload = multer({ storage: file_storage });

const patient_visitsimage = diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;

    if (file.fieldname === "pa_abdomen_image") {
      uploadPath = "./public/uploads/p_a_abdomen";
    } else if(file.fieldname === 'blood_report'){
      uploadPath = './public/uploads/blood_report';
    } else if(file.fieldname === 'xray_report'){
      uploadPath = './public/uploads/xray_report';
    } else if(file.fieldname === 'ct_scan_report'){
      uploadPath = './public/uploads/ct_scan_report';
    } else if(file.fieldname === 'ecg_report'){
      uploadPath = './public/uploads/ecg_report';
    } else if(file.fieldname === 'echocardiagram_report'){
      uploadPath = './public/uploads/echocardiagram_report';
    } else if(file.fieldname === 'misc_report'){
      uploadPath = './public/uploads/misc_report';
    }else if(file.fieldname === 'pr_rectum_image'){
      uploadPath = './public/uploads/pr_rectum_image';
    }else if(file.fieldname === 'doctor_note_image'){
      uploadPath = './public/uploads/doctor_note_image';
    }else {
      return cb(new Error("Invalid fieldname"), null);
    }

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
  },
});

const patient_visitsimageupload = multer({ storage: patient_visitsimage });


router.post("/usercreate", userController.create_user);
router.post("/login", userController.Login);
router.post("/addlocation", patientController.addLocation);
router.get("/getlocation", patientController.getAllLocations);
router.get("/getAllDocumentTypes", patientController.getAllDocumentTypes);
router.post(
  "/storepatient",
  patient_visitsimageupload.fields([
    { name: "pa_abdomen_image", maxCount: 20 },
    { name: "pr_rectum_image", maxCount: 20 },
    { name: "blood_report", maxCount: 20 },
    { name: "xray_report", maxCount: 20 },
    { name: "ct_scan_report", maxCount: 20 },
    { name: "ecg_report", maxCount: 20 },
    { name: "echocardiagram_report", maxCount: 20 },
    { name: "misc_report", maxCount: 20 },
    { name: "doctor_note_image", maxCount: 20 }
  ]),
  patientController.storepatient
);

router.post("/add_document_type", patientController.addDocumentType);

export default router;

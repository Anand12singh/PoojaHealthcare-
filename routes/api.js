import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import path from "path";
import { Router } from "express";
import sharp from "sharp"; // For image compression
import authenticate from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
import * as userController from "../controllers/frontend/userApiController.js";
import * as patientController from "../controllers/frontend/patientApiController.js";

const router = Router();

const patient_visitsimage = diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    console.log("fiile", file.fieldname);

    if (file.fieldname === "pa_image") {
      uploadPath = "./public/uploads/p_a_abdomen";
    } else if (
      file.fieldname === "pr_image1" ||
      file.fieldname === "pr_image2"
    ) {
      uploadPath = "./public/uploads/pr_image";
    } else {
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
router.post("/patients", patientController.getPatientById);
router.post("/login", userController.Login);
router.post("/addlocation", patientController.addLocation);
router.get("/getlocation", patientController.getAllLocations);
router.get("/getAllDocumentTypes", patientController.getAllDocumentTypes);
router.get("/get_allpatients", patientController.getAllPatients);

router.post(
  "/storepatient",
  upload.fields([
    { name: "documents", maxCount: 10 },
    { name: "pa_image", maxCount: 1 },
    { name: "pr_image1", maxCount: 1 },
    { name: "pr_image2", maxCount: 1 },
  ]),
  patientController.storepatient
);

router.post("/add_document_type", patientController.addDocumentType);

export default router;

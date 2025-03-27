import multer from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import moment from "moment";

const uploadBasePath = "./public/uploads/";

const folderMap = {
  "blood test report": "blood_reports",
  "x-ray report": "xray",
  ecg: "ecg",
  echocardio: "echocardio",
  ctscan: "ctscan",
  "doctor notes image": "doctor_notes",
};

const file_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let documentType = req.body.document_type || "others";
    documentType = documentType.toLowerCase();

    const uploadPath = uploadBasePath + (folderMap[documentType] || "others");

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const phid = req.body.phid || "000000";
    const formattedDate = moment().format("YYYYMMDD");
    const fileExtension = extname(file.originalname) || ".unknown";
    const serialNumber = Math.floor(1000 + Math.random() * 9000);

    const filename = `${phid}_${formattedDate}_${serialNumber}${fileExtension}`;
    cb(null, filename);
  },
});

export { file_storage };

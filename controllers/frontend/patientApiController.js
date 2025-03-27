import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import db from "../../config/db.js";
import sequelize from "../../config/database.js";
import { generateToken } from "../../helpers/jwt_helper.js";
import { body, validationResult } from "express-validator";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";
import Location from "../../db/models/location.js";
import DocumentTypes from "../../db/models/document_types.js";
import Patient from "../../db/models/patient.js";
import PatientVisit from "../../db/models/patient_visits.js";
import PatientDocument from "../../db/models/patient_docs.js";
import fs from "fs";
import { extname } from "path";
import moment from "moment";

import jwt from "jsonwebtoken";

const addLocation = async (req, res) => {
  try {
    const { location } = req.body;

    // Check if name is provided
    if (!location) {
      return res
        .status(400)
        .json({ success: false, message: "Location name is required!" });
    }

    // Check if location already exists
    let existingLocation = await Location.findOne({ where: { location } });
    if (existingLocation) {
      return res
        .status(400)
        .json({ success: false, message: "Location already exists!" });
    }

    // Create new location
    let newLocation = await Location.create({ location });

    res.status(201).json({
      success: true,
      message: "Location added successfully!",
      location: newLocation,
    });
  } catch (error) {
    console.error("Error adding location:", error);
    res
      .status(500)
      .json({ success: false, message: "Error adding location", error });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({
      attributes: ["id", "location", "status"], // Select required fields
      order: [["location", "ASC"]], // Sort alphabetically
    });

    res.status(200).json({
      success: true,
      message: "Locations fetched successfully!",
      locations,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching locations", error });
  }
};

// Add New Document Type
const addDocumentType = async (req, res) => {
  try {
    const { document_name, created_by } = req.body;

    // Validation: Check if document_name is provided
    if (!document_name) {
      return res
        .status(400)
        .json({ success: false, message: "Document name is required!" });
    }

    // Check if the document type already exists
    let existingDoc = await DocumentTypes.findOne({ where: { document_name } });
    if (existingDoc) {
      return res
        .status(400)
        .json({ success: false, message: "Document type already exists!" });
    }

    // Create a new document type
    const newDocumentType = await DocumentTypes.create({
      document_name,
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Document type added successfully!",
      documentType: newDocumentType,
    });
  } catch (error) {
    console.error("Error adding document type:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Get All Document Types
const getAllDocumentTypes = async (req, res) => {
  try {
    const documentTypes = await DocumentTypes.findAll({
      where: { status: "1" },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Document types fetched successfully!",
      documentTypes,
    });
  } catch (error) {
    console.error("Error fetching document types:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

//post patient data

async function generatePHID() {
  const lastPatient = await Patient.findOne({ order: [["id", "DESC"]] });

  let newPHID = "000001";
  if (lastPatient) {
    const lastPHID = parseInt(lastPatient.phid, 10);
    newPHID = String(lastPHID + 1).padStart(6, "0");
  }
  return newPHID;
}

const documentFolders = {
  "Blood Test Report": "blood_reports",
  "X-Ray Report": "xray",
  ECG: "ecg",
  Ctscan: "ctscan",
  Echocardio: "echocardio",
  "Doctore Notes image": "doctor_notes",
};

const storepatient = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      gender,
      mobile_no,
      alternative_no,
      address,
      date,
      referral_by,
      location,
      timestamp,
      age,
      height,
      weight,
      bmi,
      rbs,
      chief_complaints,
      dm,
      dm_since,
      hypertension,
      htn_since,
      any_other_illness,
      past_surgical_history,
      drug_allergy,
      temp,
      pulse,
      bp_systolic,
      bp_diastolic,
      pallor,
      icterus,
      oedema,
      oedema_text,
      lymphadenopathy,
      present_medication,
      rs,
      cvs,
      cns,
      pa,
      pa_image,
      pr,
      pr_image1,
      pr_image2,
      local_examination,
      clinical_diagnosis,
      comorbidities,
      plan,
      advise,
    } = req.body;

    // Ensure documents is an array by parsing
    const documents = JSON.parse(req.body.documents || "[]");

    // Check if patient exists
    let patient = await Patient.findOne({ where: { mobile_no } });
    let phid;
    if (!patient) {
      phid = await generatePHID();
      patient = await Patient.create({
        phid,
        first_name,
        last_name,
        gender,
        mobile_no,
        alternative_no,
        address,
        date,
        referral_by,
        location,
      });
    } else {
      phid = patient.phid;
    }
    const timestamp1 = moment(timestamp).format("YYYY-MM-DD HH:mm:ssZ");
    // Store new visit
    const newVisit = await PatientVisit.create({
      patient_id: patient.id,
      timestamp: timestamp1,
      age,
      height,
      weight,
      bmi,
      rbs,
      chief_complaints,
      dm,
      dm_since,
      hypertension,
      htn_since,
      any_other_illness,
      past_surgical_history,
      drug_allergy,
      temp,
      pulse,
      bp_systolic,
      bp_diastolic,
      pallor,
      icterus,
      oedema,
      oedema_text,
      lymphadenopathy,
      present_medication,
      rs,
      cvs,
      cns,
      pa,
      pa_image,
      pr,
      pr_image1,
      pr_image2,
      local_examination,
      clinical_diagnosis,
      comorbidities,
      plan,
      advise,
    });

    // Handle file uploads
    if (req.files && req.files.length > 0) {
      if (req.files.length !== documents.length) {
        return res.status(400).json({
          status: false,
          message: "Mismatch between uploaded files and document metadata.",
        });
      }

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const docInfo = documents[i];

        // Ensure document type exists
        if (!docInfo?.document_type) {
          return res
            .status(400)
            .json({ status: false, message: "Invalid document type." });
        }

        // Define folder path based on document type
        const folderName = documentFolders[docInfo.document_type] || "others";
        const folderPath = `./public/uploads/${folderName}`;

        // Ensure folder exists
        await fs.promises.mkdir(folderPath, { recursive: true });

        // Generate unique file name
        const fileExtension = extname(file.originalname);
        const timestamp = Date.now();
        const serialNumber = Math.floor(1000 + Math.random() * 9000);
        const newFileName = `${phid}_${timestamp}_${docInfo.document_type
          .replace(/\s+/g, "_")
          .toLowerCase()}_${serialNumber}${fileExtension}`;
        const newFilePath = `${folderPath}/${newFileName}`;

        // Move file to storage
        fs.renameSync(file.path, newFilePath);

        // Store document info in DB
        await PatientDocument.create({
          patient_id: patient.id,
          document_type: docInfo.document_type,
          file_url: newFilePath.replace("./public", ""),
          created_by: req.user?.id || null, // Handle undefined user ID
        });
      }
    }

    res.json({
      status: true,
      message: "Patient, first visit, and documents added successfully",
      patient,
      visit: newVisit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error", error });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.body;

    const patient = await Patient.findOne({
      where: { id },
      include: [
        {
          model: PatientVisit,
          as: "patient_visits",
          required: false,
        },
        {
          model: PatientDocument,
          as: "patient_documents",
          required: false,
        },
      ],
    });

    if (!patient) {
      return res
        .status(404)
        .json({ status: false, message: "Patient not found" });
    }

    res.json({ status: true, patient });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: [
        {
          model: PatientVisit,
          as: "patient_visits",
          required: false,
        },
        {
          model: PatientDocument,
          as: "patient_documents",
          required: false,
        },
      ],
    });

    res.json({
      status: true,
      message: "Patients fetched successfully",
      patients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export {
  addLocation,
  getAllLocations,
  addDocumentType,
  getAllDocumentTypes,
  storepatient,
  getPatientById,
  getAllPatients,
};

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
// import DocumentTypes from "../../db/models/document_types.js";
const BASE_URL = process.env.BASE_URL || 'http://localhost:3847';

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
      age,
      height,
      weight,
      bmi,
      rbs,
      chief_complaints,
      history_of_dm_status,
      history_of_dm_description,
      hypertension_status,
      hypertension_description,
      IHD_status,
      IHD_description,
      COPD_status,
      COPD_description,
      any_other_illness,
      past_surgical_history,
      drug_allergy,
      temp,
      pulse,
      bp_systolic,
      bp_diastolic,
      pallor,
      icterus,
      oedema_status,
      oedema_description,
      lymphadenopathy,
      HO_present_medication,
      respiratory_system,
      cardio_vascular_system,
      central_nervous_system,
      pa_abdomen,
      pr_rectum,
      doctor_note,
      local_examination,
      clinical_diagnosis,
      comorbidities,
      plan,
      advise,
      patientId,
      status,
    } = req.body;
    const files = req.files;

    // Check if patient exists
    let patient = await Patient.findOne({ where: { mobile_no } });
    let phid;

    //check status is 1 means store patient data and 2 means update patient data
    if (status == 1) {
      phid = await generatePHID();
      patient = await Patient.create({
        phid,
        first_name,
        last_name,
        gender:(gender) ? gender : null,
        mobile_no,
        alternative_no,
        address,
        date,
        referral_by,
        location:(location) ? location : null,
        doctor_note
      });
    }else{
      patient = await Patient.update({
        first_name:first_name,
        last_name:last_name,
        gender:(gender) ? gender : null,
        mobile_no:mobile_no,
        alternative_no:alternative_no,
        address:address,
        date:date,
        referral_by:referral_by,
        location:(location) ? location : null,
        doctor_note:doctor_note
      }, {where: {id:patientId}});
    }
    let result = 'added';
    if(status == 2){
      result = 'update';
      //update pervoius patient visit info - status set as 2 and new records update as status 1
      const updatePatientVisit = await db.query(`update patient_visits SET status =$1 where  patient_id = $2`,['0',patientId])
      //also update patient_docs table - patient pervious image status set as 2
      const updatePatientDocs = await db.query(`update patient_docs SET status = $1 where  patient_id = $2`, ['0',patientId])
    }
    //const timestamp1 = moment(timestamp).format("YYYY-MM-DD HH:mm:ssZ");
    // Store new visit
    const newVisit = await PatientVisit.create({
      patient_id: (status == 1) ? patient.id : patientId,
      //timestamp: timestamp1,
      age:(age) ? age : null,
      height,
      weight,
      bmi,
      rbs:(rbs) ? rbs : null,
      chief_complaints,
      history_of_dm_status:(history_of_dm_status) ? history_of_dm_status : null,
      history_of_dm_description,
      hypertension_status:(hypertension_status) ? hypertension_status : null,
      hypertension_description,
      IHD_status:(IHD_status) ? IHD_status : null,
      IHD_description,
      COPD_status:(COPD_status) ? COPD_status : null,
      COPD_description,
      any_other_illness,
      past_surgical_history,
      drug_allergy,
      temp:(temp) ? temp : null,
      pulse:(pulse) ? pulse : null,
      bp_systolic:(bp_systolic) ? bp_systolic : null,
      bp_diastolic:(bp_diastolic) ? bp_diastolic : null,
      pallor:(pallor) ? pallor : null,
      icterus:(icterus) ? icterus : null,
      lymphadenopathy,
      oedema_status:(oedema_status) ? oedema_status : null,
      oedema_description,
      lymphadenopathy,
      HO_present_medication,
      respiratory_system,
      cardio_vascular_system,
      central_nervous_system,
      pa_abdomen,
      pr_rectum,
      local_examination,
      clinical_diagnosis,
      comorbidities,
      plan,
      advise,
    });

  const docTypes = {
    blood_report: 1,
    xray_report: 2,
    ecg_report: 3,
    ct_scan_report: 4,
    echocardiagram_report: 5,
    misc_report: 6,
    pr_image:7,
    pa_abdomen_image:8,
    pr_rectum_image:9,
    doctor_note_image:10
  };

    //file store
   for (const [key, fileArray] of Object.entries(files)) {
    if (docTypes[key]) {
      for (const file of fileArray) {
        const mediaPath = file.path.replace(/\\/g, '/');
        const query = `INSERT INTO patient_docs (patient_id, visit_id, doc_type_id, media_path) VALUES ($1, $2, $3, $4)`;
        const checknewOroldpatientId = (status == 1) ? patient.id : patientId;
          await db.query(query, [checknewOroldpatientId, newVisit.id, docTypes[key], mediaPath]);
      }
    }
  }

    res.json({
      status: true,
      message: `Patient, first visit, and documents ${result} successfully`,
      // patient,
      // visit: newVisit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error", error });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.body;

    const patientInfo = await db.query(`select id,phid,first_name,last_name,gender,mobile_no,alternative_no,description,address,date,referral_by,
      location,doctor_note from patients where id = $1 and status = $2`,[1,"1"]);
    let PatientVisitInfo;
    let PatientDocumentInfo;
    if(patientInfo.rowCount > 0){
       PatientVisitInfo = await db.query(`select id,patient_id,age,height,weight,rbi,bmi,rbs,chief_complaints,history_of_dm_status,history_of_dm_description,hypertension_status,
        hypertension_description,"IHD_status","IHD_description","COPD_status","COPD_description",any_other_illness,past_surgical_history,
        drug_allergy,temp,pulse,bp_systolic,bp_diastolic,pallor,icterus,oedema_status,oedema_description,lymphadenopathy,"HO_present_medication",
        respiratory_system,cardio_vascular_system,central_nervous_system,pa_abdomen,pa_abdomen_image,pr_rectum,
        pr_rectum_image,local_examination,clinical_diagnosis,comorbidities,plan,advise from patient_visits where patient_id = $1 and status = $2`,[patientInfo.rows[0].id,"1"]);
       PatientDocumentInfo = await db.query(`select id,patient_id,visit_id,doc_type_id,media_path from patient_docs where patient_id = $1 and status = $2`,[patientInfo.rows[0].id,"1"]);
    }

    let groupedDocuments;
    if (PatientDocumentInfo.rowCount > 0) {
      // Map document data with media URLs
      const documentData = PatientDocumentInfo.rows.map(doc => ({
          id: doc.id,
          patient_id: doc.patient_id,
          visit_id: doc.visit_id,
          doc_type_id: doc.doc_type_id,
          media_url: `${BASE_URL}/${doc.media_path.replace('public/', '')}`
      }));

       groupedDocuments = documentData.reduce((result, doc) => {
          if (!result[doc.doc_type_id]) {
              result[doc.doc_type_id] = [];
          }
          result[doc.doc_type_id].push(doc);
          return result;
      }, {});
  }else{
     groupedDocuments = []
  }


    if (patientInfo.rowCount == 0) {
      return res
        .status(404)
        .json({ status: false, message: "Patient not found" });
    }

    res.json({
      status: true,
      message: "Patient  found",
      data: [{ patient: patientInfo.rows, PatientVisitInfo:(PatientVisitInfo) ? PatientVisitInfo.rows : [],PatientDocumentInfo:groupedDocuments }],
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

export {
  addLocation,
  getAllLocations,
  addDocumentType,
  getAllDocumentTypes,
  storepatient,
  getPatientById
};

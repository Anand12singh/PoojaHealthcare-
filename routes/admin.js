//import { userLogout } from "../controllers/apiController.js";
import authenticate from "../middlewares/authenticate.js";
import { Router } from "express";
import db from "../config/db.js";
// import * as adminController from "../controllers/admin/adminController.js";
import checkPermissionRoute from "../middlewares/check_access_route.js";
// import category from "../db/models/category.js";
import multer from "multer";
import path from "path";

const router = Router();

const project_name = process.env.APP_NAME;

const auth_layout = {
  project_name: project_name,
  layout: "admin/layout/auth-layout.ejs",
};

const page_layout = {
  project_name: project_name,
  layout: "admin/layout/pages-layout.ejs",
};

// /* Admin Auth Routes -------- */

// // Login Route
router.route("/").get((req, res) => {
  res.render("admin/pages/auth/sign-in", { ...auth_layout });
});

 export default router;

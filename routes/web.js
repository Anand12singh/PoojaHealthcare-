import { Router } from "express";
const router = Router();
import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import path from "path";
const project_name = process.env.APP_NAME;


const page_layout = {
  project_name: project_name,
  layout: "frontend/layout/pages-layout.ejs",
};

router.route("/").get((req, res) => {
  res.redirect("/admin");
  //res.render('frontend/pages/home', { ...page_layout });
});

export default router;

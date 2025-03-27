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

// /* Admin Routes ------- */

// // Dashboard Page Route
// router.route("/dashboard").get(authenticate, adminController.dashboard);

// // Categories Page Route
// router
//   .route("/categories")
//   .get([authenticate, checkPermissionRoute],adminController.categories);

//   // Masters Page Route
// router.route('/masters').get([authenticate,checkPermissionRoute], adminController.masters);

// // Plans Page Route
// router.route('/plans').get([authenticate,checkPermissionRoute], adminController.plans);
// router.get("/plans-list",authenticate, adminController.plans_list);
// router.get("/plan/:id?",authenticate, adminController.plan_add_edit);
// router.get("/plan-devices",authenticate, adminController.plan_devices);

// //user Page Route (User Management)
// router
//   .route("/users")
//   .get([authenticate, checkPermissionRoute], adminController.users);

// //Roles Page Route (User Management)
// router.route("/roles").get([authenticate, checkPermissionRoute], adminController.roles);

// //Permission Page Route (User Management)
// router
//   .route("/permissions")
//   .get([authenticate, checkPermissionRoute], adminController.permissions);

// // Blogs Page Route
// router.route("/blogs").get([authenticate,checkPermissionRoute], adminController.blogs);

// // Banners Page Route
// router.route("/banners").get([authenticate,checkPermissionRoute], adminController.banners);

// //Add Banners Page Routes
// router.route("/add-banner").get([authenticate], adminController.addEditBanner);

// // Update Blog Page Route
// router.route('/edit-banner/:id').get([authenticate], adminController.addEditBanner);

// // Add New Blog Page Route
// router.route('/add-blog').get([authenticate], adminController.addEditBlog);

// // Update Blog Page Route
// router.route('/edit-blog/:id').get([authenticate], adminController.addEditBlog);

// router.route("/profile").get([authenticate], adminController.profiles);

// // Customer list Page Route
// router.route('/customers').get([authenticate,checkPermissionRoute], adminController.customers);

// //customer view page Route
// router.route('/view-customer/:id').get([authenticate], adminController.viewCustomers);

// // Plans Page Route
// router.route('/plans').get([authenticate,checkPermissionRoute], adminController.plans);

// // Tags Page Route
// router
//   .route("/tags")
//   .get([authenticate, checkPermissionRoute],adminController.tags);

//   // FAQs Page Route
// router.route("/faqs")
// .get([authenticate, checkPermissionRoute],adminController.faqs);

// //Add FAQs Page Routes
// router.route("/add-faq").get([authenticate], adminController.addEditFaqs);

// // Update FAQs Page Route
// router.route('/edit-faq/:id').get([authenticate], adminController.addEditFaqs);

//  // Testimonials Page Route
//  router
//  .route("/testimonials")
//  .get([authenticate, checkPermissionRoute],adminController.testimonials);

//  // Update FAQs Page Route
//  router.route('/view-testimonials/:id').get([authenticate], adminController.viewTestimonials);

// // Sign Out Route
// router.route("/sign-out").get(authenticate, userLogout, adminController.sign_out);

// //router.get("/coursetopic/:id?",authenticate,adminController.course_topic);
// router.get("/course/:id?",authenticate, adminController.course_add_edit);
// router.get("/course-list", authenticate,adminController.course_list);
// router.get("/topic/:id?",authenticate, adminController.topic_add_edit);

// // carousel Page Route

// //craftschool-service
// router.get("/craftschool-services",authenticate, adminController.craftschool_services);

// router
// .route("/landing_carousel")
// .get([authenticate,checkPermissionRoute],adminController.landing_carousel);

// // News Letter Page Route
// router
//   .route("/news_letter")
//   .get([authenticate],adminController.newsLetter);

//   // Contact Us Page Route
// router
// .route("/contact_us")
// .get([authenticate],adminController.contact_us);

// router.get("/community_posts", authenticate, adminController.community_posts);
// router.get("/post_reports", authenticate, adminController.post_reports);

 export default router;

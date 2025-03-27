import { Router } from "express";
const router = Router();
import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import path from "path";
// import * as cutomerController from "../controllers/frontend/signInApiController.js";
// import * as landingApiController from "../controllers/frontend/landingApiController.js";
// import * as courseApiController from "../controllers/frontend/courseApiController.js";
// import * as masterApiController from "../controllers/frontend/masterApiController.js";
// import * as planApiController from "../controllers/frontend/planApiController.js";
// import * as settingApiController from "../controllers/frontend/settingApiController.js";
// import * as community_api from "../controllers/frontend/communityApiController.js";
// import authenticate from "../middlewares/customer_authenticate.js";
const project_name = process.env.APP_NAME;

// import sharp from "sharp";
// import passport from "passport";

const page_layout = {
  project_name: project_name,
  layout: "frontend/layout/pages-layout.ejs",
};

router.route("/").get((req, res) => {
  res.redirect("/admin");
  //res.render('frontend/pages/home', { ...page_layout });
});

// const file_storage = diskStorage({
//   destination: function (req, file, cb) {
//     let uploadPath;

//     if (file.fieldname === "media") {
//       uploadPath = "./public/uploads/posts";
//     }

//     if (!existsSync(uploadPath)) {
//       mkdirSync(uploadPath, { recursive: true });
//     }

//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: file_storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image files are allowed!"), false);
//     }
//   },
// });

// router.get(
//   "/get_all_community_post",
//   authenticate,
//   community_api.getAllCommunityPosts
// );

// router.post(
//   "/add_community_post",
//   authenticate,
//   upload.array("media", 3),
//   community_api.addCommunityPost
// );

// //router.route('/community_post').get(authenticate, community_api.getAllCommunityPosts);

// //post(authenticate, upload.array('media', 3), community_api.addCommunityPost);

// // router.route('/community_post/:id').get(authenticate, community_api.getCommunityPost).
// // patch(authenticate, upload.array('media', 3), community_api.updateCommunityPost).
// // delete(authenticate, community_api.deleteCommunityPost);

// // Get a specific community post by ID
// router.post(
//   "/get_community_post_details",
//   authenticate,
//   community_api.getCommunityPost
// );

// // Update a community post (with media upload)
// router.post(
//   "/update_community_post",
//   authenticate,
//   upload.array("media", 3),
//   community_api.updateCommunityPost
// );

// // Delete a community post by ID
// router.post(
//   "/delete_community_post",
//   authenticate,
//   community_api.deleteCommunityPost
// );

// router.get(
//   "/get_all_saved_community_post",
//   authenticate,
//   community_api.getSavedCommunityPosts
// );

// router.post(
//   "/save_community_post",
//   authenticate,
//   community_api.saveCommunityPost
// );

// router
//   .route("/unsave_community_post")
//   .post(authenticate, community_api.unsaveCommunityPost);

// router
//   .route("/report_community_post")
//   .post(authenticate, community_api.reportCommunityPost);

// router
//   .route("/community_post_comment")
//   .post(authenticate, community_api.addCommunityPostComment);

// router
//   .route("/like_community_post")
//   .post(authenticate, community_api.likeCommunityPost);

// router
//   .route("/dislike_community_post")
//   .post(authenticate, community_api.unlikeCommunityPost);

// router
//   .route("/delete_community_post_comment")
//   .post(authenticate, community_api.deleteCommunityPostComment);

// /*** Customer Section *********************************/

// //customer Sign Up API
// router.post("/sign_up", cutomerController.SignUp);
// router.post("/google_login", cutomerController.GoogleLogin);
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Google OAuth Callback
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     successRedirect: "/dashboard",
//   })
// );

// //customer Login API
// router.post("/login", cutomerController.Login);

// //customer Logout API
// router.post("/logout", authenticate, cutomerController.Logout);

// //forget password
// router.post("/forgetPassword", cutomerController.forgetPassword);

// //update password
// router.post("/updatePassword", cutomerController.updatePassword);
// /*** End Customer Section *********************************/

// /************************ Landing Page Api */

// //Silder Image (Carousel Section)
// router.get("/sliders", landingApiController.SliderImage);

// //Banner Image (Banner Section)
// router.post("/banner", landingApiController.BannerSection);

// //Master List (master Section)
// router.post("/master_list", masterApiController.MasterList);
// router.post("/MasterDetailBySlug", masterApiController.MasterDetailBySlug);

// //News Letter
// router.post("/news_letter", landingApiController.NewsLetter);

// //Contact Us
// router.post("/contact_us", landingApiController.Contact_Us);

// //Blogs (Blogs Section)
// router.post("/blogs", landingApiController.Blogs);

// //testimonials (Blogs Section)
// router.get("/testimonials", landingApiController.Testimonials);

// //faq (faq Section)
// router.get("/faq", landingApiController.faq);

// //categories list
// router.get("/categories", landingApiController.categories);

// /************************ End Landing Page Api */

// /* Course Api */
// router.get("/getAllCourses", courseApiController.getAllCourses);
// router.post("/everySkillYouNeed", courseApiController.everySkillYouNeed);
// router.post(
//   "/categorySlugWiseCourses",
//   courseApiController.categorySlugWiseCourses
// );
// router.post(
//   "/particularCourseDetailsBySlug",
//   courseApiController.particularCourseDetailsBySlug
// );
// router.post(
//   "/masterSlugWiseCourses",
//   courseApiController.masterSlugWiseCourses
// );
// router.post(
//   "/categoryIdsWiseCourses",
//   courseApiController.categoryIdsWiseCourses
// );

// router.get("/getAllPlans", planApiController.getAllPlans);
// router.get(
//   "/getCraftschoolServices",
//   landingApiController.getCraftschoolServices
// );

// /************ Setting *******************/

// router.post(
//   "/settingCustomerInfo",
//   authenticate,
//   settingApiController.settingCustomerInfo
// );

// router.post(
//   "/fetchCustomerInfo",
//   authenticate,
//   settingApiController.fetchCustomerInfo
// );
// router.post(
//   "/updatePersonalInfo",
//   authenticate,
//   settingApiController.updatePersonalInfo
// );

// router.post(
//   "/updateCustomerPassword",
//   authenticate,
//   settingApiController.updateCustomerPassword
// );

// /***************End Setting************************ */

export default router;

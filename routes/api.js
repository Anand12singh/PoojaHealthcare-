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

// import * as masterController from "../controllers/admin/masterController.js";
// import * as courseController from "../controllers/admin/courseController.js";
// import * as cmsController from "../controllers/admin/cmsController.js";
// import * as userManagementController from "../controllers/admin/userManagementController.js";
// import * as signInController from "../controllers/admin/signInController.js";
// import * as customerController from "../controllers/admin/customerController.js";
// import * as PlanController from "../controllers/admin/PlanController.js";
// import * as communityController from "../controllers/admin/communityController.js";

const router = Router();
const upload = multer({ storage: file_storage });

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

// const upload = multer({
//   storage: file_storage,
//   fileFilter: (req, file, cb) => {
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/webp','video/mp4','video/mov'];
//       if (allowedTypes.includes(file.mimetype)) {
//           cb(null, true);
//       } else {
//           cb(new Error('Only image files are allowed!'), false);
//       }
//   }
// });

// const coursestorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/uploads/course/"); // Files will be stored in 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
//     },
// });

// const upload_course = multer({ storage: coursestorage });

// //uploadCategory
// const categorytorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/uploads/category/"); // Files will be stored in 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
//     },
// });

// const upload_category = multer({ storage: categorytorage });

// const servicestorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/uploads/services/"); // Files will be stored in 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
//     },
// });

// const upload_service = multer({ storage: servicestorage });

// const compressImage = async (req, res, next) => {
//   if (req.file && req.file.mimetype.startsWith('image')) {
//       const outputFilePath = req.file.path.replace(extname(req.file.filename), '-compressed.jpg');
//       try {
//           await sharp(req.file.path)
//               .jpeg({ quality: 80 })
//               .toFile(outputFilePath);
//           req.file.path = outputFilePath;
//           req.file.filename = req.file.filename.replace(extname(req.file.filename), '-compressed.jpg');
//       } catch (err) {
//           return next(err);
//       }
//   }
//   next();
// };

// /* Auth API Routes -------------------------------------- */

// // POST user login
// router.post("/sign-in", signInController.userLogin);

// // GET user logout
// router.get("/sign-out", authenticate, signInController.userLogout);

// /* Category API Start ----------------------------------- */

// // POST get categories (datatables)
// router.post("/getCategories", authenticate, masterController.getCategories);

// // POST add new category || GET get all categories
// router
//   .route("/category")
//   .post(authenticate,upload_category.fields([
//     { name: 'icon', maxCount: 1 },]), masterController.createCategory)
//   .get(authenticate, masterController.getAllCategories);

// // GET category by id || PATCH update category by id || DELETE delete category by id
// router
//   .route("/category/:id")
//   .get(authenticate, masterController.getCategoryById)
//   .patch(authenticate,upload_category.fields([
//     { name: 'icon', maxCount: 1 },]), masterController.updateCategoryById)
//   .delete(authenticate, masterController.deleteCategoryById);

//   router.patch('/updateCategoryOrder',authenticate,masterController.updateCategoryOrder)

// /* Category API End ------------------------------------ */

// /* Blog API Start -------------------------------------- */

// // POST get blogs (datatables)
// router.post('/getBlogs', authenticate, masterController.getBlogs);

// // POST add new blog
// router.route('/blog')
//     .post(authenticate, upload.array('featured_media', 1), compressImage, masterController.createBlog)
//     .get(authenticate, masterController.getAllBlogs);

// router.route('/blog/:id')
//     .get(authenticate, masterController.getBlogById)
//     .patch(authenticate, upload.array('featured_media', 1), compressImage, masterController.updateBlogById)
//     .delete(authenticate, masterController.deleteBlogById);

// // PATCH update blog status by id
// router.patch('/blog/:id/changeStatus/:status', authenticate, masterController.updateBlogStatusById);

// /* Blog API End --------------------------------------- */

// /* Master API Start ------------------------------------ */

// // POST get masters (datatables)
// router.post('/getMasters', authenticate, masterController.getMasters);

// // POST add new master || GET get all masters
// router.route('/master')
//     .post(authenticate, upload.array('photo', 1), compressImage, masterController.createMaster)
//     .get(authenticate, masterController.getAllMasters);

// // GET master by id || PATCH update master by id || DELETE delete master by id
// router.route('/master/:id')
//     .get(authenticate, masterController.getMasterById)
//     .patch(authenticate, upload.array('photo', 1), compressImage, masterController.updateMasterById)
//     .delete(authenticate, masterController.deleteMasterById);

// // PATCH update master status by id
// router.patch('/master/:id/changeStatus/:status', authenticate, masterController.updateMasterStatusById);

// //POST
// router.patch('/updateMasterOrder',authenticate,masterController.updateMasterOrder)

// /* Master API End ------------------------------------ */

// /* Tag API Start ----------------------------------- */

// // POST get tag (datatables)
// router.post("/getTags", authenticate, masterController.getTags);

// // POST add new tag || GET get all tag
// router
//   .route("/tag")
//   .post(authenticate, masterController.createTag)
//   .get(authenticate, masterController.getAllTags);

// // GET tag by id || PATCH update tag by id || DELETE delete tag by id
// router
//   .route("/tag/:id")
//   .get(authenticate, masterController.getTagById)
//   .patch(authenticate, masterController.updateTagById)
//   .delete(authenticate, masterController.deleteTagById);

// /* Tag API End ------------------------------------ */

// /* Banner API Start -------------------------------------- */

// // POST get Banners (datatables)
// router.post('/getBanners', authenticate, masterController.getBanners);

// // POST add new banner || GET get all banners
// router.route('/banner')
// .post(authenticate, upload.fields([
//   { name: 'banner_image', maxCount: 1 },
//   { name: 'mobile_banner_image', maxCount: 1 },
//   { name: 'banner_trailer_video', maxCount: 1 }
// ]),compressImage,masterController.createBanner)
// .get(authenticate, masterController.getAllBanners)

// // GET banner by id || PATCH update banner by id || DELETE delete banner by id
// router.route('/banner/:id')
//     .get(authenticate, masterController.getBannerById)
//     .patch(authenticate,  upload.fields([
//       { name: 'banner_image', maxCount: 1 },
//       { name: 'mobile_banner_image', maxCount: 1 },
//       { name: 'banner_trailer_video', maxCount: 1 }
//     ]), compressImage, masterController.updateBannerById)
//     .delete(authenticate, masterController.deleteBannerById);

// // PATCH update Banners status by id
// router.patch('/banner/:id/changeStatus/:status', authenticate, masterController.updateBannerStatusById);

// // PATCH update Banners publish status by id
// router.patch('/banner/:id/changePublishStatus/:status/:bannerType', authenticate, masterController.updateBannerPublishStatusById);

// /* Banner API End --------------------------------------- */

// /* Users API Start ----------------------------------- */

// // POST get Users (datatables)
// router.post("/getUsers", authenticate, userManagementController.getUsers);

// // POST add new user || GET get all user
// router
//   .route("/users")
//   .post(authenticate, userManagementController.createUser)
//   .get(authenticate, userManagementController.getAllUsers);

// // GET user by id || PATCH update user by id || DELETE delete user by id
// router
//   .route("/users/:id")
//   .get(authenticate, userManagementController.getUserById)
//   .patch(authenticate, userManagementController.updateUserById)
//   .delete(authenticate, userManagementController.deleteUserById);

// router.route("/users_change_status/:id").patch(authenticate, userManagementController.activeUserById);

// /* Users API End ------------------------------------ */

// /* Permission API Start ----------------------------------- */

// // GET role by id
// router.route("/permission_role/:id").get(authenticate, userManagementController.getRoleBasedUserById);

// // POST add permission based on role id and user id
// router.route("/permission_role").post(authenticate, userManagementController.savePermissions);

// // GET permission based on role id and user id
// router.route("/getPermissions").post(authenticate, userManagementController.getPermissions);

// /* Permission API End ------------------------------------ */

// /* Roles API Start ----------------------------------- */

// // POST get Role (datatables)
// router.post("/getRoles", authenticate, userManagementController.getRoles);

// // POST add new role || GET get all role
// router
//   .route("/roles")
//   .post(authenticate, userManagementController.createRole)
//   .get(authenticate, userManagementController.getAllRoles);

// // GET role by id || PATCH update role by id || DELETE delete role by id
// router
//   .route("/roles/:id")
//   .get(authenticate, userManagementController.getRoleById)
//   .patch(authenticate, userManagementController.updateRoleById)
//   .delete(authenticate, userManagementController.deleteRoleById);

// /* Roles API End ------------------------------------ */

// /* Customer API Start -------------------------------------- */

// // POST get customer (datatables)
// router.post('/getCustomers', authenticate, customerController.getCustomers);

// // POST add new customer
// // router.route('/customer')
// //     .post(authenticate, upload.array('featured_media', 1), compressImage, createCustomer)
// //     .get(authenticate, masterController.getAllCustomers);

// // router.route('/customer/:id')
// //     .get(authenticate, getCustomerById)
// //     .patch(authenticate, upload.array('featured_media', 1), compressImage, updateCustomerById)
// //     .delete(authenticate, masterController.deleteCustomerById);

// // // PATCH update customer status by id
// router.patch('/customer/:id/changeStatus/:status', authenticate, customerController.updateCustomerStatusById);

// // // PATCH update customer status by id
// router.post('/customer_view/:id/tabwise/:tab', authenticate, customerController.getTabwiseCustomerInfo);

// /* Customer API End --------------------------------------- */

// /* FAQs API Start -------------------------------------- */

// // POST get Faq (datatables)
// router.post('/getFaqs', authenticate, cmsController.getFaqs);

// // POST add new faqs || GET get all faqs
// router.route('/faq')
// .post(authenticate,cmsController.createFaq)
// .get(authenticate, cmsController.getAllFaqs)

// // GET Faq by id || PATCH update Faq by id || DELETE delete Faq by id
// router.route('/faq/:id')
//     .get(authenticate, cmsController.getFaqsById)
//     .patch(authenticate,  cmsController.updateFaqById)
//     .delete(authenticate, cmsController.deleteFaqById);

// // PATCH update faq status by id
// router.patch('/faq/:id/changeStatus/:status', authenticate, cmsController.updateFaqStatusById);

// /* FAQs API End --------------------------------------- */

// /* FAQ Category API ----------------------------------*/

// router.route('/faqcategory')
//       .post(authenticate,cmsController.createFaqCategory)

// /* FAQ Category API End -----------------------------*/

// /* Testimonial API Start -------------------------------------- */

// // POST get testimonial (datatables)
// router.post('/getTestimonials', authenticate, cmsController.getTestimonials);

// // GET testimonial by id || PATCH update testimonial by id || DELETE delete testimonial by id
// router.route('/testimonials/:id')
//     .get(authenticate, cmsController.getTestimonialsById)
//     .patch(authenticate,  cmsController.updateTestimonialById)
//     .delete(authenticate, cmsController.deleteTestimonialById);

// // PATCH update testimonial status by id
// router.patch('/testimonials/:id/approvalStatus/:status', authenticate, cmsController.updateTestimonialStatusById);

// /* Testimonial API End --------------------------------------- */

// /* course APIs  start*/

// router.post("/getCourses", authenticate,courseController.getCourses);

// router.get("/get_all_courses", authenticate,courseController.get_all_courses);
// router.get("/get_particular_course", authenticate,courseController.get_particular_course);
// router.post("/add_course", authenticate,upload_course.fields([

//     { name: "trailor_video", maxCount: 1 },
//     { name: "course_banner_desktop", maxCount: 1 },
//     { name: "course_banner_mobile", maxCount: 1 },
//     { name: "bts", maxCount: 1 },
//   ]),courseController.add_course);

// router.post("/edit_course", authenticate,upload_course.fields([

//     { name: "trailor_video", maxCount: 1 },
//     { name: "course_banner_desktop", maxCount: 1 },
//     { name: "course_banner_mobile", maxCount: 1 },
//     { name: "bts", maxCount: 1 },
//   ]),courseController.edit_course);
// router.post("/final_delete_course", authenticate,courseController.final_delete_course);
// router.post("/course_change_status", authenticate,courseController.course_change_status);

// router.post("/getCourseTopics", courseController.getCourseTopics);

// router.post("/add_course_topic", upload_course.fields([
//     { name: "topic_video", maxCount: 1 },
//     ]),authenticate,courseController.add_course_topic);
// router.post("/update_topic", upload_course.fields([
//     { name: "topic_video", maxCount: 1 },
//   ]),authenticate,courseController.update_topic);
// router.post("/final_delete_course_topic", authenticate,courseController.final_delete_course_topic);
// router.post("/change_topic_status", authenticate,courseController.change_topic_status);
// router.post("/get_particular_course_topic", authenticate,courseController.get_particular_course_topic);

// router.patch('/updateCourseOrder',authenticate,courseController.updateCourseOrder)
// router.patch('/updateCourseTopicOrder',authenticate,courseController.updateCourseTopicOrder)

// router.post("/getCommunityPosts", authenticate, communityController.getCommunityPosts);

// router.route("/community").get(authenticate, communityController.getAllCommunityPosts);

// router.route("/community/:id").get(authenticate, communityController.getCommunityPost).delete(authenticate, communityController.deleteCommunityPost);

// router.post("/getCommunityPostReports", authenticate, communityController.getCommunityPostReports);
// /* landing Carousel API Start ----------------------------------- */

// // POST get Carousel (datatables)
// router.post("/getlandingCarousels", authenticate, masterController.getCarousels);

// // POST add new Carousel || GET get all tag
// router
//   .route("/landingCarousel")
//   .post(authenticate,upload.array('landing_carousel[]',10),compressImage, masterController.createCarousel)
//   .get(authenticate, masterController.getAllCarousels);

// // GET Carousel by id || PATCH update Carousel by id || DELETE delete Carousel by id
// router
//   .route("/landingCarousel/:id")
//   .get(authenticate, masterController.getCarouselById)
//   .patch(authenticate, upload.array('carousel_photo',1),masterController.updateCarouselById)
//   .delete(authenticate, masterController.deleteCarouselById);

//   router.patch('/landingCarousel/:id/changeStatus/:status', authenticate, masterController.updateCarouselStatusById);

//   router.patch('/updateCarouselOrder',authenticate,masterController.updateCarouselOrder)

// /* Carousel API End ------------------------------------ */

// /* Plan Api Start */
// router.post("/add_plan",upload.array(),PlanController.add_plan_with_features);
// router.post("/update_plan",upload.array(),PlanController.update_plan_with_feature);
// router.post("/get_particular_plan",authenticate,PlanController.get_particular_plan);
// router.post("/plan_change_status",authenticate,PlanController.plan_change_status);
// router.post("/change_publish_status",authenticate,PlanController.change_publish_status);
// router.post("/plan_delete",authenticate,PlanController.plan_delete);

// router.post("/getplanDevices",authenticate,PlanController.getplanDevices);
// router.post("/createPlanDevice",PlanController.createPlanDevice);
// router.post("/updateplanDeviceById",PlanController.updateplanDeviceById);
// router.post("/updateplanDeviceStatusById",authenticate,PlanController.updateplanDeviceStatusById);
// router.post("/deleteplanDeviceById",authenticate,PlanController.deleteplanDeviceById);
// router.post("/getplanDeviceById",authenticate,PlanController.getplanDeviceById);
// /* Plan APi End */

// router.post("/get_particular_service_details",authenticate,cmsController.get_particular_service_details);
// router.post("/update_craftschool_service",
//     upload_service.fields([
//     { name: "media1", maxCount: 1 },
//     { name: "media2", maxCount: 1 },
//     ]),
// authenticate,cmsController.update_craftschool_service);

// // POST get News letter (datatables)
// router.post("/getNewsLetter", authenticate, cmsController.getNewsLetter);

// // POST get contact us (datatables)
// router.post("/getContactUs", authenticate, cmsController.getContactUs);

// router.post("/getCommunityPosts", authenticate, communityController.getCommunityPosts);

// router.route("/community").get(authenticate, communityController.getAllCommunityPosts);

// router.route("/community/:id").get(authenticate, communityController.getCommunityPost).delete(authenticate, communityController.deleteCommunityPost);

// router.post("/getCommunityPostReports", authenticate, communityController.getCommunityPostReports);

router.post("/usercreate", userController.create_user);
router.post("/login", userController.Login);
router.post("/addlocation", patientController.addLocation);
router.get("/getlocation", patientController.getAllLocations);
router.get("/getAllDocumentTypes", patientController.getAllDocumentTypes);
router.post(
  "/storepatient",

  upload.fields([{ name: "documents", maxCount: 10 }]),
  patient_visitsimageupload.fields([
    { name: "pa_image", maxCount: 1 },
    { name: "pr_image1", maxCount: 1 },
    { name: "pr_image2", maxCount: 1 },
  ]),

  patientController.storepatient
);

router.post("/add_document_type", patientController.addDocumentType);

export default router;

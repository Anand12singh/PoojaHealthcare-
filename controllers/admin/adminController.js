// Defaults
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import db from "../../config/db.js";

import Sequelize from "../../config/database.js";
// Models
import User from "../../db/models/user.js";
import Role from "../../db/models/role.js";
import Blog from "../../db/models/blog.js";
import Category from "../../db/models/category.js";
import Master from "../../db/models/master.js";
import Tag from "../../db/models/tags.js";
import Banner from "../../db/models/banners.js";
import Courses from "../../db/models/course.js";
import Faq from "../../db/models/faqs.js";
import FaqCategory from "../../db/models/faq_category.js";
import Customer from "../../db/models/customer.js";
import Course_topics from "../../db/models/Course_topics.js";
import Plan from "../../db/models/plan.js";
import Plan_device from "../../db/models/plan_devices.js";
import Craftschool_services from "../../db/models/craftschool_services.js";

import { body, validationResult } from "express-validator";
// Node Modules
import moment from "moment-timezone";
import { Op } from "sequelize";
import Hashids from "hashids";

const project_name = process.env.APP_NAME;

const auth_layout = {
  project_name: project_name,
  layout: "admin/layout/auth-layout.ejs",
};

const page_layout = {
  project_name: project_name,
  layout: "admin/layout/pages-layout.ejs",
};

const hashids = new Hashids(process.env.HASHIDS_SALT, 10);

// Admin Dashboard
const dashboard = catchAsync(async (req, res) => {
  const access_routes = req.session.accessRoute;

  res.render("admin/pages/dashboard", {
    ...page_layout,
    user: req.user,
    access_routes: access_routes,
  });
});

//Categories
const categories = catchAsync(async (req, res) => {
  res.render("admin/pages/categories", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

//masters
const masters = catchAsync(async (req, res) => {
  res.render("admin/pages/masters", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

//users
const users = catchAsync(async (req, res) => {
  const query = `SELECT id,role_name FROM roles WHERE deleted_at IS NULL AND id != 1`;
  const role = await db.query(query, []);
  res.render("admin/pages/users", {
    ...page_layout,
    user: req.user,
    data: role.rows,
    access_routes: req.session.accessRoute,
  });
});

//roles
const roles = catchAsync(async (req, res) => {
  res.render("admin/pages/roles", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

//permission
const permissions = catchAsync(async (req, res) => {
  const rolequery = `SELECT id,role_name FROM roles WHERE deleted_at IS NULL AND id != 1`;
  const role = await db.query(rolequery, []);

  const permissionQuery = `select trm.id,trm.module,trm.sub_module,trm.permission,trm.routes,tcp.access_name from role_module_managements as trm left join access_permissions as tcp ON tcp.id = trm.permission::bigint order by id asc `;
  const PermissionResult = await db.query(permissionQuery, []);

  const result = {};

  if (PermissionResult.rowCount > 0) {
    PermissionResult.rows.forEach((permission) => {
      const {
        module,
        sub_module,
        id,
        permission: perm,
        routes,
        access_name,
      } = permission;

      if (!result[module]) {
        result[module] = {};
      }
      if (!result[module][sub_module]) {
        result[module][sub_module] = [];
      }

      const info = {
        id,
        permission: perm,
        routes,
        access_name,
      };

      result[module][sub_module].push({
        id,
        permission: perm,
        routes,
        access_name,
      });
    });
  }

  res.render("admin/pages/permission", {
    ...page_layout,
    user: req.user,
    data: role.rows,
    permission: result,
    access_routes: req.session.accessRoute,
  });
});

// Add Blogs Page
const blogs = catchAsync(async (req, res) => {
  res.render("admin/pages/blogs", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

// Add Banner Page
const banners = catchAsync(async (req, res) => {
  res.render("admin/pages/banners", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

//Add Banners Page
const addEditBanner = catchAsync(async (req, res) => {
  var banner = "";

  if (req.params.id) {
    const id = req.params.id;

    if (isNaN(id)) {
      throw new AppError("Invalid Id", 404);
    }

    banner = await Banner.findByPk(id);

    if (!banner) {
      throw new AppError("Invalid Banner", 404);
    }
  }

  const course = await Courses.findAll();
  const masters = await Master.findAll();
  const tags = await Tag.findAll();

  res.render("admin/pages/add-update-banner", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
    courses: course,
    masters: masters,
    tags: tags,
    banner: banner,
  });
});

//Banner Page
const faqs = catchAsync(async (req, res) => {
  const categories = await Category.findAll();
  res.render("admin/pages/faqs", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
    categories: categories,
  });
});

//Add Banners Page
const addEditFaqs = catchAsync(async (req, res) => {
  var faq = "";

  if (req.params.id) {
    const id = req.params.id;

    if (isNaN(id)) {
      throw new AppError("Invalid Id", 404);
    }

    faq = await Faq.findByPk(id);

    if (!faq) {
      throw new AppError("Invalid Banner", 404);
    }
  }

  const categories = await FaqCategory.findAll();

  res.render("admin/pages/add-update-faq", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
    categories: categories,
    faq: faq,
  });
});

// Add Profile Page
const profiles = catchAsync(async (req, res) => {
  res.render("admin/pages/profile", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

// Add Customer Page
const customers = catchAsync(async (req, res) => {
  res.render("admin/pages/customers", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

//view Customer Page
const viewCustomers = catchAsync(async (req, res) => {
  //get customer info for particular customer
  const customerId = parseInt(req.params.id);
  const customers = await Customer.findOne({ where: { id: customerId } });
  res.render("admin/pages/customer-view", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
    customer: customers,
  });
});

//  Plans Page
const plans = catchAsync(async (req, res) => {
  res.render("admin/pages/plans", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

//Tags
const tags = catchAsync(async (req, res) => {
  res.render("admin/pages/tags", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

// view Testimonicals Page
const viewTestimonials = catchAsync(async (req, res) => {
  try {
    var blog = "";

    if (req.params.id) {
      const id = req.params.id;

      if (isNaN(id)) {
        throw new AppError("Invalid Id", 404);
      }

      blog = await Blog.findByPk(id);

      if (!blog) {
        throw new AppError("Invalid Blog", 404);
      }
    }

    const categories = await Category.findAll();
    const masters = await Master.findAll();

    //return res.json({ categories: categories });

    res.render("admin/pages/add-update-blog", {
      ...page_layout,
      user: req.user,
      categories: categories,
      masters: masters,
      blog: blog,
      access_routes: req.session.accessRoute,
    });
  } catch (error) {
    throw new AppError(error.message);
  }
});

//Testimonicals
const testimonials = catchAsync(async (req, res) => {
  res.render("admin/pages/testimonials", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

// Sign Out
const sign_out = catchAsync(async (req, res) => {
  return res.redirect("/admin");
});

// Add Blog Page
const addEditBlog = catchAsync(async (req, res) => {
  try {
    var blog = "";

    if (req.params.id) {
      const id = req.params.id;

      if (isNaN(id)) {
        throw new AppError("Invalid Id", 404);
      }

      blog = await Blog.findByPk(id);

      if (!blog) {
        throw new AppError("Invalid Blog", 404);
      }
    }

    const categories = await Category.findAll();
    const masters = await Master.findAll();

    //return res.json({ categories: categories });

    res.render("admin/pages/add-update-blog", {
      ...page_layout,
      user: req.user,
      categories: categories,
      masters: masters,
      blog: blog,
      access_routes: req.session.accessRoute,
    });
  } catch (error) {
    throw new AppError(error.message);
  }
});

/*
Course Code start
*/

const course_list = async (req, res) => {
  //return res.json(req.session);
  res.render("admin/pages/course-list", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
};

const course_add_edit = async (req, res) => {
  let course_data = [];
  let category_data = [];
  let subcategory_data = [];
  let master_data = [];
  const courseid = req.params.id || "";
  console.log("courseid>>", courseid);
  //console.log("==="+courseid);
  if (courseid) {
    course_data = await Courses.findOne({
      where: { id: courseid },
    });
  }
  category_data = await Category.findAll({
    where: { status: "1" },
  });

  subcategory_data = [];
  master_data = await Master.findAll({
    where: { status: "1" },
  });
  // res.json(master_data);
  // return false;
  //console.log(course_data)
  res.render("admin/pages/add-update-course", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
    courseid: courseid,
    course_data: course_data || [],
    category_data: category_data || [],
    subcategory_data: subcategory_data || [],
    master_data: master_data || [],
  });
};

const topic_add_edit = async (req, res) => {
  let particular_course_data = [];
  let course = [];

  const courseid = req.params.id || null;
  //console.log("==="+courseid);
  if (courseid) {
    particular_course_data = await Courses.findOne({
      where: { id: courseid },
    });
  }
  course = await Courses.findAll({
    where: { status: "1" },
  });
  res.render("admin/pages/add-update-course-topic", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
    courseid: courseid,
    particular_course_data: particular_course_data || [],
    courses: course || [],
  });
};

/* Course code end */

/* landing_carousel code start */
const landing_carousel = catchAsync(async (req, res) => {
  res.render("admin/pages/landing_carousel", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});
/* landing_carousel code End */

/* Plan code End */
const plans_list = catchAsync(async (req, res) => {
  try {
    // Execute the query
    const query = `
            SELECT
            p.id,
            p.plan_name,
            p.cost,
            p.plan_type,
            p.emi_type,
            p.simaltaneous_devices_accessible,
            p.download_devices,
            p.courses,
            p.craftschool_sessions,
            p.community_access,
            p.publish,
            p.status,
            p.ordering,
            STRING_AGG(DISTINCT c.name, ', ') AS course_names,
            STRING_AGG(DISTINCT sup_dev.device_name, ', ') AS supported_devices
        FROM
            plans AS p
        LEFT JOIN
            courses AS c
        ON
            c.id::TEXT = ANY(string_to_array(p.courses, ','))

        LEFT JOIN
            plan_devices AS sup_dev
        ON
            sup_dev.id::TEXT = ANY(string_to_array(p.supported_devices, ','))
        WHERE

            p.deleted_at IS NULL
        GROUP BY
            p.id

        `;

    const [plans] = await Sequelize.query(query); // Extract the data

    //console.log(plans);
    // Pass query result to the view
    res.render("admin/pages/plan-list", {
      ...page_layout,
      user: req.user,
      access_routes: req.session.accessRoute,
      plans,
    });
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).send("Error fetching plans");
  }
});

const plan_add_edit = catchAsync(async (req, res) => {
  let plan_data = [];

  const planid = req.params.id || null; // Get 'id' from URL params, default to null
  //console.log("==="+planid);
  if (planid) {
    plan_data = await Plan.findOne({
      where: { id: planid },
    });
  }

  //console.log(plan_data);

  const courses_data = await Courses.findAll({
    where: {
      status: "1",
      deleted_at: { [Op.is]: null },
    },
  });

  const plan_devices = await Plan_device.findAll({
    where: {
      status: "1",
      deleted_at: { [Op.is]: null },
    },
  });

  //console.log(plan_devices)

  res.render("admin/pages/add-update-plan", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
    planid: planid,
    courses_data: courses_data,
    plan_devices: plan_devices,
    plan_data: plan_data,
  });
});

const plan_devices = catchAsync(async (req, res) => {
  //console.log(232)
  res.render("admin/pages/plan-devices", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

const craftschool_services = catchAsync(async (req, res) => {
  const craftschool_services = await Craftschool_services.findAll({
    where: {
      status: "1",
      deleted_at: { [Op.is]: null },
    },
    order: [["id", "ASC"]],
  });
  //return res.json(craftschool_services);

  res.render("admin/pages/craftschool_services", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
    craftschool_services: craftschool_services,
  });
});

/* Landing news letter*/
const newsLetter = catchAsync(async (req, res) => {
  res.render("admin/pages/newsletter", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

/* contact us */
const contact_us = catchAsync(async (req, res) => {
  res.render("admin/pages/contact-us", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

const community_posts = catchAsync(async (req, res) => {
  res.render("admin/pages/community_posts", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

const post_reports = catchAsync(async (req, res) => {
  res.render("admin/pages/post_reports", {
    ...page_layout,
    user: req.user,
    access_routes: req.session.accessRoute,
  });
});

//addBlog, editBlog
export {
  dashboard,
  addEditBlog,
  categories,
  masters,
  users,
  roles,
  permissions,
  blogs,
  banners,
  profiles,
  customers,
  viewCustomers,
  plans,
  sign_out,
  addEditBanner,
  tags,
  faqs,
  addEditFaqs,
  testimonials,
  viewTestimonials,
  /*Course Api */
  course_list,
  course_add_edit,
  /*Course Api */

  /*course topic */
  topic_add_edit,
  /*Course topics */

  /* landingCarousel */
  landing_carousel,

  /* Plan */
  plans_list,
  plan_add_edit,
  plan_devices,

  /*services*/
  craftschool_services,

  /* news letter */
  newsLetter,

  /* contact us */
  contact_us,

  /* community */
  community_posts,
  post_reports,
};

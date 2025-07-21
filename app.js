// // Dependancy import
// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";

// import { config } from "dotenv";

// config();

// const app = express();

// // File import
// import userRoute from "./Routes/userRoute.js";
// import cibilRoute from "./Routes/CibilScoreRoute.js";
// import chatBotRoute from "./Routes/chatBotRoute.js";
// import bankOfferRoute from "./Routes/bankOfferRoute.js";
// import emailRoutes from "./Routes/emailRoutes.js";
// import kycRoute from "./Routes/kycRoute.js";
// import carouselRoute from "./Routes/carouselRoutes.js";
// import happyRoutes from "./Routes/happyRoutes.js";
// import  blogRoutes from "./Routes/BlogsRoute.js"

// import ourPartnerRoute from "./Routes/ourPartnerRoutes.js";
// import employeeMasterRoute from "./Routes/employeeMasterRoutes.js";
// import roleRoutes from "./Routes/roleMasterRoute.js";
// import loanLeadRoute from "./Routes/loanLeadRoute.js";
// import createEnquiryRoute from "./Routes/createEnquiryRoute.js";
// import sourceRoutes from "./Routes/CreateLeadSourceRoute.js";
// import propertyStateRoutes from "./Routes/PropertyStateRoute.js";
// import propertyCityRoutes from "./Routes/PropertyCityRoute.js";


// import bankRoutes from "./Routes/BankMasterRoute.js"
// import bankerRoutes from "./Routes/BankerRoute.js"
// import loanCriteriaRoutes from "./Routes/LoanCriteriaRoute.js"
// import productRoutes from "./Routes/CreateProductRoute.js";


// import incentiveStructureRoutes from './Routes/IncentiveStructureRoute.js';
// import leadStatusRoutes from './Routes/LeadStatusRoute.js';
// import employmentRoutes from './Routes/EmploymentRoute.js';
// import leadTypesRoutes from './Routes/LeadTypeRoute.js';
// import branchRoutes from './Routes/MyBranchRoute.js';
// import followUpRoutes from './Routes/FollowUpsMasterRoute.js';
// import leadStageRoutes from './Routes/LeadStageRoute.js';
// import caseStatusRoutes from './Routes/CaseStatusRoute.js';
// import documentRoutes from './Routes/DocumentRoute.js'
// import whatsappRoutes from './Routes/WhatsappMasterRoute.js'
// import emailTemplateRoutes from './Routes/EmailMasterRoute.js'



// import enquiryListRoutes from './Routes/EnquiryListRoute.js';
// import remarkRoutes from './Routes/remarkRoute.js';

// import loanRoutes from './Routes/LoanApplicationRoute.js'
// import loanApplicationRoutes from './Routes/LoanApplicationRoute.js'
// import createBlogRoutes from './Routes/CreateBlogRoute.js'

// // Dependancy uses
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URI,
//     methods: ["POST", "GET", "PUT", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(morgan("dev"));

// app.use("/auth/user", userRoute);
// app.use("/auth/cibil", cibilRoute);
// app.use("/api/chatbot", chatBotRoute);
// app.use("/api/offer", bankOfferRoute);
// app.use("/api/email", emailRoutes);
// app.use("/api/kyc", kycRoute);
// app.use("/api/carousel", carouselRoute);
// app.use("/api/happy", happyRoutes);
// app.use("/api/blogs", blogRoutes);

// app.use("/api/ourpartner", ourPartnerRoute);


// // masters

// app.use('/api/employeesmaster', employeeMasterRoute);
// app.use('/api/rolemaster', roleRoutes);
// app.use('/api/loanlead', loanLeadRoute);
// app.use('/api/enquiry', createEnquiryRoute);
// app.use('/api/sourcemaster', sourceRoutes);
// app.use("/api/property-states", propertyStateRoutes);
// app.use('/api/property-cities', propertyCityRoutes);

// // Bank Master
// app.use("/api/banks", bankRoutes);
// app.use("/api/banks", bankerRoutes);
// app.use("/api/banks", loanCriteriaRoutes);
// app.use('/api/productmaster', productRoutes)



// app.use('/api/incentives', incentiveStructureRoutes);
// app.use('/api/lead-status', leadStatusRoutes);
// app.use('/api/employment', employmentRoutes);
// app.use('/api/lead-type', leadTypesRoutes);
// app.use('/api/branches', branchRoutes);
// app.use('/api/followup', followUpRoutes);
// app.use('/api/leadstage', leadStageRoutes);
// app.use('/api/casestatus', caseStatusRoutes);
// app.use("/api/documents", documentRoutes);
// app.use("/api/whatsapp-templates", whatsappRoutes);
// app.use("/api/email-templates", emailTemplateRoutes);

// // CRM
// app.use('/api/enquiry-list', enquiryListRoutes);
// app.use("/api/remarks", remarkRoutes);
// app.use("/api/loans", loanRoutes);


// app.use("/api/loan-applications", loanApplicationRoutes);

// app.use("/api/create-blogs", createBlogRoutes);



// export default app;



// Dependency imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config();
const app = express();

// ✅ Set body size limit to 50MB for large payloads (like base64 images)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// CORS setup
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(morgan("dev"));

// Route imports
import userRoute from "./Routes/userRoute.js";
import cibilRoute from "./Routes/CibilScoreRoute.js";
import chatBotRoute from "./Routes/chatBotRoute.js";
import bankOfferRoute from "./Routes/bankOfferRoute.js";
import emailRoutes from "./Routes/emailRoutes.js";
import kycRoute from "./Routes/kycRoute.js";
import carouselRoute from "./Routes/carouselRoutes.js";
import happyRoutes from "./Routes/happyRoutes.js";
import blogRoutes from "./Routes/BlogsRoute.js";
import ourPartnerRoute from "./Routes/ourPartnerRoutes.js";
import employeeMasterRoute from "./Routes/employeeMasterRoutes.js";
import roleRoutes from "./Routes/roleMasterRoute.js";
import loanLeadRoute from "./Routes/loanLeadRoute.js";
import createEnquiryRoute from "./Routes/createEnquiryRoute.js";
import sourceRoutes from "./Routes/CreateLeadSourceRoute.js";
import propertyStateRoutes from "./Routes/PropertyStateRoute.js";
import propertyCityRoutes from "./Routes/PropertyCityRoute.js";
import bankRoutes from "./Routes/BankMasterRoute.js";
import bankerRoutes from "./Routes/BankerRoute.js";
import loanCriteriaRoutes from "./Routes/LoanCriteriaRoute.js";
import productRoutes from "./Routes/CreateProductRoute.js";
import incentiveStructureRoutes from "./Routes/IncentiveStructureRoute.js";
import leadStatusRoutes from "./Routes/LeadStatusRoute.js";
import employmentRoutes from "./Routes/EmploymentRoute.js";
import leadTypesRoutes from "./Routes/LeadTypeRoute.js";
import branchRoutes from "./Routes/MyBranchRoute.js";
import followUpRoutes from "./Routes/FollowUpsMasterRoute.js";
import leadStageRoutes from "./Routes/LeadStageRoute.js";
import caseStatusRoutes from "./Routes/CaseStatusRoute.js";
import documentRoutes from "./Routes/DocumentRoute.js";
import whatsappRoutes from "./Routes/WhatsappMasterRoute.js";
import emailTemplateRoutes from "./Routes/EmailMasterRoute.js";
import enquiryListRoutes from "./Routes/EnquiryListRoute.js";
import remarkRoutes from "./Routes/remarkRoute.js";
import loanRoutes from "./Routes/LoanApplicationRoute.js";
import loanApplicationRoutes from "./Routes/LoanApplicationRoute.js";
import createBlogRoutes from "./Routes/CreateBlogRoute.js";
import bankNameRoutes from "./Routes/BankNameRoute.js";
import documentTypeRoutes from "./Routes/DocumentTypeRoute.js"

// Route uses
app.use("/auth/user", userRoute);
app.use("/auth/cibil", cibilRoute);
app.use("/api/chatbot", chatBotRoute);
app.use("/api/offer", bankOfferRoute);
app.use("/api/email", emailRoutes);
app.use("/api/kyc", kycRoute);
app.use("/api/carousel", carouselRoute);
app.use("/api/happy", happyRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ourpartner", ourPartnerRoute);

// Master routes
app.use("/api/employeesmaster", employeeMasterRoute);
app.use("/api/rolemaster", roleRoutes);
app.use("/api/loanlead", loanLeadRoute);
app.use("/api/enquiry", createEnquiryRoute);
app.use("/api/sourcemaster", sourceRoutes);
app.use("/api/property-states", propertyStateRoutes);
app.use("/api/property-cities", propertyCityRoutes);

// Bank Master routes
app.use("/api/banks", bankRoutes);
app.use("/api/banks", bankerRoutes);
app.use("/api/banks", loanCriteriaRoutes);
app.use("/api/productmaster", productRoutes);

// CRM & Other
app.use("/api/incentives", incentiveStructureRoutes);
app.use("/api/lead-status", leadStatusRoutes);
app.use("/api/employment", employmentRoutes);
app.use("/api/lead-type", leadTypesRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/followup", followUpRoutes);
app.use("/api/leadstage", leadStageRoutes);
app.use("/api/casestatus", caseStatusRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/whatsapp-templates", whatsappRoutes);
app.use("/api/email-templates", emailTemplateRoutes);
app.use("/api/enquiry-list", enquiryListRoutes);
app.use("/api/remarks", remarkRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/loan-applications", loanApplicationRoutes);
app.use("/api/create-blogs", createBlogRoutes);
app.use("/api/bank-name", bankNameRoutes);
app.use("/api/document-type", documentTypeRoutes);

export default app;
  
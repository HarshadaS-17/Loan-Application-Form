// --- Model: sourceMasterModel.js ---
import mongoose from 'mongoose';

// List of all source feature fields
const featureList = [
  'enquirySupport',
  'leadManagement',
  'taskAutomation',
  'invoiceGeneration',
  'payoutIntegration',
  'analyticsReports',
  'adminControl',
  'dataRestriction',
  'teamManagement',
  'userRoles',
  'incentiveModule',
  'partnerManagement',
  'payoutModule',
  'lenderSync',
  'multiBranch',
  'documentHandling',
  'customForms',
  'customFields',
  'groupingOptions',
  'leadSegmentation',
  'goalTracking',
  'apiIntegration'
];

// Dynamically build the features schema
const sourceFeaturesSchema = {};
featureList.forEach(feature => {
  sourceFeaturesSchema[feature] = { type: Boolean, default: false };
});

// Define the source schema
const sourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  features: sourceFeaturesSchema
}, {
  timestamps: true
});

const Source = mongoose.model('Source', sourceSchema);
export default Source;

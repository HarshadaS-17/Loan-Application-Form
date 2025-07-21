import mongoose from 'mongoose';

// List of all permission fields
const permissionsList = [
  'enquiry',
  'leads',
  'tasks',
  'invoices',
  'payouts',
  'reports',
  'master',
  'onlyIfDataCreator',
  'employee',
  'roles',
  'incentiveStructure',
  'channelPartner',
  'payoutStructure',
  'lenders',
  'branches',
  'documentMaster',
  'customForm',
  'customField',
  'enquiryGroup',
  'leadGroup',
  'targetMaster',
  'verificationApi'
];

// Dynamically build the permissions schema
const permissionsSchema = {};
permissionsList.forEach(permission => {
  permissionsSchema[permission] = { type: Boolean, default: false };
});

// Define the employment schema
const employmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  permissions: permissionsSchema
}, {
  timestamps: true
});

const Employment = mongoose.model('Employment', employmentSchema);
export default Employment;

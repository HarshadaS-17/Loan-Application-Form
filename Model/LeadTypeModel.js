import mongoose from 'mongoose';

// List of all permission fields
const permissionsList = [
  'enquiry',
  'leads',
  'tasks', // fixed typo: 'task s' => 'tasks'
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

// Define the lead type schema
const leadTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  permissions: permissionsSchema
}, {
  timestamps: true
});

const LeadType = mongoose.model('LeadType', leadTypeSchema);
export default LeadType;

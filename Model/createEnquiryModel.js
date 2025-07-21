import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    // match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number']
  },

  firstName: {
    type: String,
    trim: true
  },
  productType: {
    type: String,

  },
  alternatePhone: {
    type: String,
    // match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit alternate phone number']
  },
  dob: {
    type: Date,
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value);
      },
      message: 'Enter a valid date of birth'
    }
  },
  email: {
    type: String,
    // match: [/.+@.+\..+/, 'Enter a valid email address']
  },
  pan: {
    type: String,
    uppercase: true,
    // match: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Enter a valid PAN number (e.g., ABCDE1234F)']
  },
  employmentType: {
    type: String,
    // enum: ['Salaried', 'Self Employed', 'Business Owner'],
    required: [true, 'Employment type is required']
  },
  retirementAge: {
    type: Number,
    min: [40, 'Minimum retirement age is 40'],
    max: [80, 'Maximum retirement age is 80'],
    required: function () {
      return this.employmentType === 'Salaried';
    }
  },
  businessPeriod: {
    type: Number,
    min: [1, 'Minimum business period should be 1 year'],
    max: [100, 'Business period seems too high'],
    required: function () {
      return this.employmentType === 'Self Employed';
    }
  },

  status: {
    type: String,
    required: [true, 'Status is required'],
  },

  leadSource: {
    type: String,
    required: [true, 'Lead source is required']
  }
}, { timestamps: true });

export default mongoose.model('Enquiry', enquirySchema);

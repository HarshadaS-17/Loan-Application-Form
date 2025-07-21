import Enquiry from '../Model/createEnquiryModel.js';

// Create Enquiry
export const createEnquiry = async (req, res) => {
  try {
    const {
      mobile,
      firstName,
      productType,
      alternatePhone,
      dob,
      email,
      pan,
      employmentType,
      retirementAge,
      businessPeriod,
      leadSource,
      status
    } = req.body;

    // Basic validation
    if (!mobile || !employmentType || !leadSource) {
      return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }

    if (employmentType === 'Salaried' && !retirementAge) {
      return res.status(400).json({ success: false, message: 'Retirement age required for Salaried.' });
    }

    if (employmentType === 'Self Employed' && !businessPeriod) {
      return res.status(400).json({ success: false, message: 'Business period required for Self Employed.' });
    }

    const newEnquiry = new Enquiry({
      mobile,
      firstName,
      productType,
      alternatePhone,
      dob,
      email,
      pan,
      employmentType,
      retirementAge,
      businessPeriod,
      leadSource,
      status
    });

    const savedEnquiry = await newEnquiry.save();
    res.status(201).json({ success: true, data: savedEnquiry, message: 'Enquiry created successfully' });
  } catch (error) {
    console.error('Create Enquiry Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get All Enquiries
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    console.error('Fetch Enquiries Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get Single Enquiry
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    console.error('Get Enquiry Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update Enquiry
export const updateEnquiry = async (req, res) => {
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedEnquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, data: updatedEnquiry, message: 'Updated successfully' });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete Enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiryId = req.params.id;

    // Validate input
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }






    // Update the status of the enquiry
    
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      enquiryId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.status(200).json({ success: true, data: updatedEnquiry, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Update Status Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

import LoanApplication from "../Model/LoanApplicationModel.js";
import LoanRequirement from "../Model/loanLeadModel.js";

// Create a new loan application
export const createLoanApplication = async (req, res) => {
  console.log("Creating Loan Application:", req.body);
  
  try {
    const { userId } = await req.params;

    const application = new LoanApplication(req.body);
    console.log("Application Data:", application);
    

    application.userId = userId;

    const loanLead = await LoanRequirement.findById(userId)
    
    console.log("Loan Lead Data:", loanLead);
    loanLead.loanApllicationId = application._id;
    await loanLead.save();

    const savedApplication = await application.save();

    if (!savedApplication) {
      return res.status(400).json({ message: "Failed to save loan application" });
    }


    res.status(201).json({
      message: "Loan application submitted successfully",
      data: savedApplication,
    });

  } catch (error) {
    res.status(400).json({
      message: "Failed to submit loan application",
      error: error.message,
    });
  }
};




// Get all loan applications


export const getAllLoanApplications = async (req, res) => {
  try {
    console.log("Fetching all loan applications", req.body);

    const applications = await LoanApplication.find()
      // .populate('loanDetails.state') // ✅ Only use this if `state` is a referenced ObjectId
      .setOptions({ strictPopulate: false }); // use this ONLY if you must populate undeclared fields

    res.status(200).json({
      message: "Loan applications fetched successfully",
      data: applications,
    });

  } catch (error) {
    console.error("Error fetching loan applications:", error.message);
    res.status(500).json({
      message: "Failed to fetch loan applications",
      error: error.message,
    });
  }
};
// Get a single loan application by ID

export const getLoanApplicationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    
    const applications = await LoanApplication
    .find({ userId })                 // 🔍 server‑side filter
    .setOptions({ strictPopulate:false });
    
    res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: applications,
    });
    // console.log(applications);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: err.message,
    });
  }
};

export const getLoanApplicationById = async (req, res) => {
  console.log("=== LOAN APPLICATION FETCH DEBUG ===");
  console.log("Method:", req.method);
  console.log("Params:", req.params);
  console.log("Body:", req.body);
  console.log("Query:", req.query);
  console.log("====================================");

  const id = req.params.id;

  try {
    console.log("Searching for ID:", id);
    console.log("ID type:", typeof id);
    console.log("ID length:", id.length);

    // Check if ID is valid ObjectId format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid ID format provided");
      return res.status(400).json({ 
        success: false,
        message: "Invalid ID format. Please provide a valid 24-character hexadecimal ID.",
        data: null,
        debug: {
          providedId: id,
          idType: typeof id,
          idLength: id?.length || 0
        }
      });
    }

    // First, let's get some database stats for debugging
    const totalApplications = await LoanApplication.countDocuments();
    console.log("Total applications in database:", totalApplications);

    // If there are applications, get a sample to compare
    let sampleApplication = null;
    if (totalApplications > 0) {
      sampleApplication = await LoanApplication.findOne().select('_id');
      console.log("Sample application ID:", sampleApplication?._id);
    }

    // Try to find the specific application
    const application = await LoanApplication.findById(id)
      .populate('userId', 'name email')
      .populate('loanDetails.loanType', 'name')
      .populate('loanDetails.preferredBank', 'name')
      .setOptions({ strictPopulate: false });

    console.log("Database result:", application ? "Found" : "Not found");
    console.log("Application ID:", application?._id);

    if (!application) {
      console.log("Application not found with ID:", id);
      
      // Try to find if there's a similar ID or if we can find by other fields
      const similarApplications = await LoanApplication.find({
        $or: [
          { leadId: id }, // Maybe it's a lead ID
          { userId: id }, // Maybe it's a user ID
          { 'loanDetails.phone': { $regex: id, $options: 'i' } }, // Maybe it's part of phone
          { 'loanDetails.email': { $regex: id, $options: 'i' } } // Maybe it's part of email
        ]
      }).select('_id loanDetails.fullName loanDetails.phone loanDetails.email leadId userId')
        .limit(5);

      console.log("Similar applications found:", similarApplications.length);

      return res.status(404).json({
        success: false,
        message: "Loan application not found",
        data: null,
        debug: {
          searchedId: id,
          totalApplications,
          sampleApplicationId: sampleApplication?._id,
          similarApplications: similarApplications.map(app => ({
            id: app._id,
            name: app.loanDetails?.fullName,
            phone: app.loanDetails?.phone,
            email: app.loanDetails?.email,
            leadId: app.leadId,
            userId: app.userId
          }))
        },
        suggestions: similarApplications.length > 0 ? 
          "Found similar applications. Please check if you meant to use one of these IDs." :
          "No similar applications found. Please verify the ID is correct."
      });
    }

    console.log("Successfully found application:", application._id);

    res.status(200).json({
      success: true,
      message: "Loan application fetched successfully",
      data: application,
      debug: {
        fetchedId: application._id,
        totalApplications,
        fetchTimestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Error fetching loan application:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format provided",
        data: null,
        error: {
          type: 'CastError',
          message: error.message,
          path: error.path,
          value: error.value
        }
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error occurred",
        data: null,
        error: {
          type: 'ValidationError',
          message: error.message,
          errors: error.errors
        }
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching loan application",
      data: null,
      error: {
        type: error.name || 'UnknownError',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      debug: {
        searchedId: id,
        timestamp: new Date().toISOString()
      }
    });
  }
};

// Update a loan application
// PUT /api/loan-applications/:userId/:id
// export const updateLoanApplication = async (req, res) => {
//   const { userId, id } = req.params;

//   try {
//     /* body sanity‑check */
//     if (!Object.keys(req.body).length) {
//       return res.status(400).json({ message: "Empty request body" });
//     }

//     /* build an update object with $set so nested fields survive */
//     const updateDoc = { $set: req.body };

//     const result = await LoanApplication.updateOne(
//       { _id: id, userId },          // filter
//       updateDoc,
//       { runValidators: true }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     if (result.modifiedCount === 0) {
//       return res.status(200).json({
//         message: "No fields were changed (data was identical)",
//       });
//     }

//     /* fetch the fresh doc only if you need to return it */
//     const updated = await LoanApplication.findById(id);

//     res.status(200).json({
//       message: "Loan application updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     console.error("Update Loan Error:", error);
//     res.status(400).json({
//       message: "Failed to update loan application",
//       error: error.message,
//     });
//   }
// };

// PUT /api/loan-applications/user/:userId
export const updateLoanApplication = async (req, res) => {
  const { userId } = req.params;

  try {
    /* 1. Empty body guard */
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "Empty request body" });
    }

    /* 2. Build $set payload (dot‑notation safe) */
    const updateDoc = { $set: req.body };

    /* 3. Update the (only) application belonging to this user */
    const result = await LoanApplication.updateOne(
      { userId },                   // filter only by userId
      updateDoc,
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No application found for user" });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({
        message: "No fields were changed (data was identical)"
      });
    }

    /* 4. Return the refreshed document */
    const updated = await LoanApplication.findOne({ userId });
    res.status(200).json({
      message: "Loan application updated successfully",
      data: updated
    });

  } catch (err) {
    console.error("Update Loan Error:", err);
    res.status(400).json({
      message: "Failed to update loan application",
      error: err.message
    });
  }
};



// Delete a loan application
// DELETE /api/loan-applications/delete-data/:userId
export const deleteLoanApplication = async (req, res) => {
  const { userId } = req.params;

  try {
    const deleted = await LoanApplication.findOneAndDelete({ userId });

    if (!deleted) {
      return res.status(404).json({ message: "No application found for user" });
    }

    res.status(200).json({ message: "Loan application deleted successfully" });
  } catch (err) {
    console.error("Delete Loan Error:", err);
    res.status(500).json({
      message: "Failed to delete loan application",
      error: err.message,
    });
  }
};


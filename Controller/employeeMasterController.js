// Import necessary modules and models
import Employee from "../Model/employeeMasterModel.js";
import Role from "../Model/roleMasterModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

const cookieOption = {
  httpOnly: true,
  secure: true,
  default: true,
};

// Create a new employee
export const createEmployee = async (req, res) => {
  try {
    const { authentication } = req.body;

    const role = await Role.findById(authentication.role);

    const employee = new Employee(req.body);
    employee.authentication.role = authentication.role;
    await employee.save();
    res
      .status(201)
      .json(new ApiResponse(201, employee, "Employee created successfully"));
  } catch (error) {
    console.error("Create Employee Error:", error); // moved inside the catch
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (let field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        message: "Validation Error",
        errors: validationErrors,
      });
    }

    return res.status(500).json({
      message: "Error creating employee",
      error: error.message || "Unknown error",
    });
  }
};

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("authentication.role");


    res.status(200).json(new ApiResponse(200, employees, "Employee data"));
  } catch (error) {
    console.error("Get Employees Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
};

// Get a single employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Get Employee By ID Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching employee", error: error.message });
  }
};

// Update employee details
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res
      .status(200)
      .json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    console.error("Update Employee Error:", error);
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
};

// Delete an employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Delete Employee Error:", error);
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
  }
};

// login employee
export const employeeLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const employee = await Employee.findOne({
      "authentication.email": email,
    })
      .select("+authentication.password")
      .populate("authentication.role");
    if (!employee) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordCorrect = await employee.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = await employee.generateAuthToken();
    // const refreshToken = await employee.generateRefreshToken();
    // employee.authentication.refreshToken = refreshToken;
    employee.authentication.password = undefined; // Remove password from the response

    // await employee.save({ validateBeforeSave: false });


    return (
      res
        .status(200)
        .cookie("accessToken", accessToken, cookieOption)
        // .cookie("refreshToken", refreshToken, cookieOption)
        .json(
          new ApiResponse(200, { employee, accessToken }, "Login successful")
        )
    );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong in employee login"
    );
  }
});

// chnage password

export const changePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user; // Assuming you have the employee ID in req.params

    if (!oldPassword || !newPassword) {
      throw new ApiError(400, "Old password and new password are required");
    }

    const employee = await Employee.findById(id).select(
      "+authentication.password"
    );

    if (!employee) {
      throw new ApiError(401, "Employee not found");
    }

    const isPasswordCorrect = await employee.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid old password");
    }

    employee.authentication.password = newPassword;
    await employee.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Password changed successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong in changing password"
    );
  }
});

export const updateStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
 

    // if (!status) {
    //   throw new ApiError(400, "Status is required");
    // }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { isActive: status ? false : true }, // Toggle status
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      throw new ApiError(404, "Employee not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedEmployee, "Status updated successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong in updating status"
    );
  }
});

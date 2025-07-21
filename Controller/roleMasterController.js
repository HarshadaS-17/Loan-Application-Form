import Role from "../Model/roleMasterModel.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

// List of valid permissions
const validPermissions = [
  "create_enquiry",
  "edit_enquiry",
  "view_enquiry",
  "delete_enquiry",
  "create_user",
  "edit_user",
  "view_user",
  "delete_user",
  "create_role",
  "edit_role",
  "view_role",
  "delete_role",
  "edit_loan_lead",
  "create_loan_lead",
  "delete_loan_lead",
  "view_loan_lead",
];

// Helper function to convert array of strings to permission boolean object
const buildPermissionsObject = (permissionsArray) => {
  const permissionsObj = {};
  validPermissions.forEach((perm) => {
    permissionsObj[perm] = permissionsArray.includes(perm);
  });
  return permissionsObj;
};

// ✅ Create Role
const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    // Validate name
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Role name is required" });
    }

    // Validate permissions array
    if (!Array.isArray(permissions)) {
      return res.status(400).json({ message: "Permissions must be an array" });
    }

    const invalidPermissions = permissions.filter(
      (p) => !validPermissions.includes(p)
    );
    if (invalidPermissions.length > 0) {
      return res.status(400).json({
        message: `Invalid permissions: ${invalidPermissions.join(", ")}`,
      });
    }

    // Build boolean permissions object
    const permissionsObj = buildPermissionsObject(permissions);

    const newRole = new Role({ name, permissions: permissionsObj });
    await newRole.save();

    res
      .status(201)
      .json(new ApiResponse(200, newRole, "Role created successfully"));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating role", error: err.message });
  }
};

// ✅ Get All Roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res
      .status(200)
      .json(new ApiResponse(200, roles, "Roles fetched successfully"));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching roles", error: err.message });
  }
};

// ✅ Get Role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res
      .status(200)
      .json(new ApiResponse(200, role, "Role fetched successfully"));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching role", error: err.message });
  }
};

// ✅ Update Role
const updateRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    let permissionsObj;

    if (permissions) {
      if (!Array.isArray(permissions)) {
        return res
          .status(400)
          .json({ message: "Permissions must be an array" });
      }

      const invalidPermissions = permissions.filter(
        (p) => !validPermissions.includes(p)
      );
      if (invalidPermissions.length > 0) {
        return res.status(400).json({
          message: `Invalid permissions: ${invalidPermissions.join(", ")}`,
        });
      }

      // Build boolean permissions object
      permissionsObj = buildPermissionsObject(permissions);
    }

    const updateData = {
      ...(name && { name }),
      ...(permissionsObj && { permissions: permissionsObj }),
    };

    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedRole, "Role updated successfully"));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating role", error: err.message });
  }
};

// ✅ Delete Role
const deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res
      .status(200)
      .json(new ApiResponse(200, deletedRole, "Role deleted successfully"));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting role", error: err.message });
  }
};

export { createRole, getAllRoles, getRoleById, updateRole, deleteRole };

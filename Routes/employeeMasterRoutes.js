import express from 'express';
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  employeeLogin,
  changePassword,
  updateStatus,
} from "../Controller/employeeMasterController.js";
import { isLoggedIn } from "../Middleware/authMiddleWare.js";

const router = express.Router();

// ✅ Static Routes First
router.post("/add-employee", createEmployee);
router.get("/get-employee", getEmployees);
router.put("/update-employee/:id", updateEmployee); // typo fixed: 'employe' → 'employee'
router.delete("/delete-employee/:id", deleteEmployee);

router.route("/login").post(employeeLogin); // Login route
router.route("/change-password").patch(isLoggedIn, changePassword); // Update password route

// 🔻 Dynamic route LAST
router.get("/:id", getEmployeeById); // Must be last to avoid conflicts

router.route("/:id/status").patch(updateStatus);



// Example Express route to toggle isActive
// router.put('/employee/:id/status', async (req, res) => {
//   const { isActive } = req.body;
//   try {
//     const employee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       { isActive },
//       { new: true }
//     );
//     if (!employee) return res.status(404).json({ message: 'Employee not found' });
//     res.json(employee);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


export default router;

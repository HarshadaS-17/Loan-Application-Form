import express from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
} from "../Controller/roleMasterController.js"

const router = express.Router();

router.post('/add-role', createRole);
router.get('/get-role', getAllRoles);
router.get('/:id', getRoleById);
router.put('/update-role/:id', updateRole);
router.delete('/delete-role/:id', deleteRole);

export default router;

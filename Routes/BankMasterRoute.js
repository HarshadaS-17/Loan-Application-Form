// import express from "express";
// import {
//   createBank,
//   getAllBanks,
//   getBankById,
//   updateBank,
//   deleteBank,
// } from "../Controller/BankMasterController.js";

// const router = express.Router();

// // Routes
// router.post("/add-bank", createBank);
// router.get("/get-bank", getAllBanks);
// router.get("/:id", getBankById);
// router.put("/update-bank/:id", updateBank);
// router.delete("/delete-bank/:id", deleteBank);

// export default router;



// --------------------------------------------------------------------------------------------------




import express from "express";
import {
  createBank,
  getAllBanks,
  updateBank,
  deleteBank,
  getBank,
  getBankBankers,
} from "../Controller/BankMasterController.js";

const router = express.Router();

// Bank routes
router.post("/add-bank", createBank);
router.get("/get-banks", getAllBanks);
router.put("/update-bank/:id", updateBank);
router.delete("/delete-bank/:id", deleteBank);
router.get("/:id", getBank);

// Bankers for a specific bank
router.get("/:bankId/bankers", getBankBankers);

export default router;

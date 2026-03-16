// const express = require("express");
// const expenseController = require("../controllers/expenseController"); 

// const router = express.Router();

// router
//     .get("/", expenseController.getAllExpense)
//     .post("/", expenseController.createExpense);

// router.put("/:id", expenseController.updateExpense);
// router.delete("/:id", expenseController.deleteExpense);

// module.exports = router;





// routes/expenseRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.get("/", getAllExpense);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
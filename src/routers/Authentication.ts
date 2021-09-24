import express from "express";

const router: express.Router = express.Router();

router.post("/", async (req, res) => {
  res.status(200).send();
});

export default router;

import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { signUpUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(
  upload.fields([
    {
      name: 'avatar', 
      maxCount: 1,
    },
    {
      name: 'coverImage', 
      maxCount: 1,
    },
  ]),
  signUpUser
);

export default router;

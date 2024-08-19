import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { signUpUser ,loginUser,logoutUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



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

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT,logoutUser );

export default router;

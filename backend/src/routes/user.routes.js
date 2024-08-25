import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { signUpUser ,loginUser,logoutUser,refreshAccessToken, updateUser, getUserDetails} from "../controllers/user.controller.js";
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
router.route("/refresh").post(refreshAccessToken);

router.route("/logout").post(verifyJWT,logoutUser );

router.route("/update").put(verifyJWT, updateUser);

router.route("/details").get(verifyJWT, getUserDetails);

export default router;

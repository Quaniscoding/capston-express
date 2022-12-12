const express = require('express');
const { dangKy, dangNhap, capNhatNguoiDung } = require('../controller/users/userController');
const { verifyToken } = require('../middlewares/baseToken');
const userRoute = express.Router();
//trang đăng ký, đăng nhập
userRoute.post("/dangKy", dangKy)
userRoute.get("/dangNhap", dangNhap)
userRoute.put("/capNhat/:id", capNhatNguoiDung)
module.exports = userRoute;
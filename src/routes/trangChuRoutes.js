const express = require('express');
const { getListHinhAnh } = require('../controller/trangChu/getListHinhAnh');
const { verifyToken } = require('../middlewares/baseToken');
const trangChuRoutes = express.Router();
//trang chủ
trangChuRoutes.get("/getListHinhAnh", verifyToken, getListHinhAnh)
module.exports = trangChuRoutes;

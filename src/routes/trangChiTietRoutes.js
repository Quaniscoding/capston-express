const express = require('express');
const { getThongTinBinhLuan } = require('../controller/trangChiTiet/getThongTinBinhLuan');
const { getThongTinLuuAnh } = require('../controller/trangChiTiet/getThongTinLuuAnh');
const { postThongTinBinhLuan } = require('../controller/trangChiTiet/postThongTinBinhLuan');
const { getThongTinAnh } = require('../controller/trangChiTiet/getThongTinAnh');
const { verifyToken } = require('../middlewares/baseToken');
const trangChiTietRoutes = express.Router();
trangChiTietRoutes.get("/getThongTinAnh/:id", verifyToken, getThongTinAnh);
trangChiTietRoutes.get("/getThongTinhBinhLuan/:id", verifyToken, getThongTinBinhLuan);
trangChiTietRoutes.get("/getThongTinLuuAnh/:id", verifyToken, getThongTinLuuAnh);
trangChiTietRoutes.post("/postThongTinBinhLuan/:id", verifyToken, postThongTinBinhLuan)
module.exports = trangChiTietRoutes;
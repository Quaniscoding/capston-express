const express = require('express');
const { deleteAnh } = require('../controller/trangQuanLyAnh/deleteAnhTheoId');
const { getDanhSachAnhDaLuuTheoUser } = require('../controller/trangQuanLyAnh/getDanhSachAnhDaLuuTheoUser');
const { getDanhSachAnhDaTaoTheoUser } = require('../controller/trangQuanLyAnh/getDanhSachAnhDaTaoTheoUser');
const { getThongTinUser } = require('../controller/trangQuanLyAnh/getThongTinUser');

const { verifyToken } = require('../middlewares/baseToken');
const trangQuanLyAnhRoutes = express.Router();
trangQuanLyAnhRoutes.get("/getThongTinUser", verifyToken, getThongTinUser)
trangQuanLyAnhRoutes.get("/getDanhSachAnhDaLuuTheoUser/:id", verifyToken, getDanhSachAnhDaLuuTheoUser)
trangQuanLyAnhRoutes.get("/getDanhSachAnhDaTaoTheoUser/:id", verifyToken, getDanhSachAnhDaTaoTheoUser)
trangQuanLyAnhRoutes.delete("/deleteAnh/:id", verifyToken, deleteAnh)
module.exports = trangQuanLyAnhRoutes;
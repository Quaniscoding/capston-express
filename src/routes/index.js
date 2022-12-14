const express = require('express');
const trangChiTietRoutes = require('./trangChiTietRoutes');
const trangChuRoutes = require('./trangChuRoutes');
const trangQuanLyAnhRoutes = require('./trangQuanLyAnh');
const trangThemAnhRoutes = require('./trangThemAnhRoutes');
const rootRoute = express.Router();

const userRoute = require('./userRoutes');
rootRoute.use("/Users", userRoute)
rootRoute.use("/TrangChu", trangChuRoutes)
rootRoute.use("/TrangChiTiet", trangChiTietRoutes)
rootRoute.use("/TrangQuanLyAnh", trangQuanLyAnhRoutes)
rootRoute.use("/TrangThemAnh", trangThemAnhRoutes)

module.exports = rootRoute;


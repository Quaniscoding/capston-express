const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sucessCode, errorCode, failCode } = require('../../config/reponse');
const getThongTinLuuAnh = async (req, res) => {
    try {
        let id = req.params.id
        let data = await prisma.luu_anh.findMany({
            where: {
                hinh_id: Number(id)
            },
            select: {
                hinh_id: true,
                ngay_luu: true,
                nguoi_dung_id: true,
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        ho_ten: true
                    }
                }
            }
        })
        if (data != "") {
            sucessCode(res, data, "Hình ảnh đã được lưu !")
        }
        else {
            failCode(res, "", "Hình ảnh chưa được lưu !")
        }
    } catch (error) {
        errorCode(res, "Lỗi Backend")

    }
}
module.exports = {
    getThongTinLuuAnh
}
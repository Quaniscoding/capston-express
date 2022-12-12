const { PrismaClient } = require("@prisma/client");
const { DATE } = require("sequelize");
const prisma = new PrismaClient();
const { sucessCode, errorCode, failCode } = require('../../config/reponse');
const postThongTinBinhLuan = async (req, res) => {
    let id = req.params.id
    let nguoi_dung_id = Number(id)
    try {
        let { hinh_id, ngay_binh_luan } = req.body;
        ngay_binh_luan = new Date()

        let check = await prisma.binh_luan.findFirst({
            where: {
                nguoi_dung_id
            }
        })
        if (check) {
            failCode(res, "", "Người dùng đã bình luận !")
        }
        else {
            const data = await prisma.binh_luan.create({
                data: {
                    nguoi_dung_id, hinh_id, ngay_binh_luan
                }
            })
            sucessCode(res, data, "Thêm thông tin bình luận thành công !")
        }
    } catch (error) {
        errorCode(res, "Lỗi Backend")
    }
}
module.exports = {
    postThongTinBinhLuan
}
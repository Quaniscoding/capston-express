const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sucessCode, errorCode, failCode } = require('../../config/reponse');
const getDanhSachAnhDaLuuTheoUser = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await prisma.nguoi_dung.findMany({
            where: {
                nguoi_dung_id: Number(id)
            },
            select: {
                nguoi_dung_id: true,
                luu_anh: {
                    select: {
                        hinh_id: true,
                        ngay_luu: true,

                    }
                }
            }
        });
        if (data != "") {
            sucessCode(res, data, "Lấy danh sách ảnh đã lưu theo người dùng thành công")
        }
        else {
            failCode(res, "", "Hình không tồn tại !")
        }
    }
    catch (error) {
        errorCode(res, "Lỗi Backend")
    }
}
module.exports = {
    getDanhSachAnhDaLuuTheoUser
}
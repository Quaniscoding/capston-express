const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sucessCode, errorCode, failCode } = require('../../config/reponse');
const getListHinhAnh = async (req, res) => {
    try {
        let keyword = req.query.keyword;
        let data = await prisma.hinh_anh.findMany(
            {
                where: {
                    ten_hinh: {
                        contains: keyword
                    }
                },
                select: {
                    hinh_id: true,
                    ten_hinh: true,
                    mo_ta: true,
                    nguoi_dung: {
                        select: {
                            nguoi_dung_id: true,
                            ho_ten: true
                        },
                    }
                }
            }
        );
        if (data != "") {
            sucessCode(res, data, "Lấy danh sách hình ảnh thành công")
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
    getListHinhAnh
}
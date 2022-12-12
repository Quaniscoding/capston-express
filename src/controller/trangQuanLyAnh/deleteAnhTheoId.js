const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sucessCode, errorCode, failCode } = require('../../config/reponse');
const deleteAnh = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await prisma.hinh_anh.delete({
            where: {
                hinh_id: Number(id)
            }
        });
        if (data != "") {
            sucessCode(res, data, "Xóa ảnh thành công !")
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
    deleteAnh
}
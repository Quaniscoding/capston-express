
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sucessCode, errorCode, failCode } = require('../../config/reponse');
const trangThemAnh = async (req, res) => {
    try {
        const fs = require('fs');
        if (req.file.size >= 400000) {
            fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
            failCode(res, "", "Chỉ được phép upload ảnh nhỏ hơn 4Mb");
            return;
        }
        if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg") {
            fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
            failCode(res, "", "Ảnh sai định dạng!");
        }
        fs.readFile(process.cwd() + "/public/img/" + req.file.filename, (err, data) => {
            let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
            setTimeout(() => {
                fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
            }, 5000);

        })
        let nguoi_dung_id = req.query.nguoiDung
        nguoi_dung_id = Number(nguoi_dung_id)
        let { ten_hinh, duong_dan, mo_ta, tuoi } = req.body;
        duong_dan = req.file.filename
        tuoi = Number(tuoi)
        const data = await prisma.hinh_anh.create({
            data: { ten_hinh, duong_dan, mo_ta, tuoi, nguoi_dung_id }
        }
        )
        sucessCode(res, data, "Upload thành công !");

    }
    catch (error) {
        errorCode(res, "Lỗi Backend")
    }
}
module.exports = {
    trangThemAnh
}
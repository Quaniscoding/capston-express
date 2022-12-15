const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sucessCode, errorCode, failCode } = require('../../config/reponse');
const fs = require('fs');
const trangThemAnh = async (req, res) => {
    const fs = require('fs');
    if (req.file.size >= 400000) {
        fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        res.send("chỉ được phép upload 4Mb");
        return;
    }
    if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg") {
        fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        res.send("sai định dạng");
    }
    fs.readFile(process.cwd() + "/public/img/" + req.file.filename, (err, data) => {
        let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
        setTimeout(() => {
            fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        }, 5000);
        let nguoi_dung_id = req.query.nguoiDung
        let { ten_hinh, duong_dan, mo_ta, tuoi } = req.body;
        nguoi_dung_id = Number(nguoi_dung_id)
        duong_dan = dataBase
        tuoi = Number(tuoi)
        const uploadImage = async () => {
            const dataUpload = await prisma.hinh_anh.create({
                data: { ten_hinh, duong_dan, mo_ta, tuoi, nguoi_dung_id }
            })
            sucessCode(res, dataUpload, "Upload ảnh thành công !");
        }
        uploadImage()
    })
}
module.exports = {
    trangThemAnh
}
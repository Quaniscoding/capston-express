
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sucessCode, errorCode, failCode } = require('../../config/reponse');
const { converBase64ToImage } = require('convert-base64-to-image')
const trangThemAnh = async (req, res) => {
    try {
        const fs = require('fs');
        if (req.file.size >= 400000) {
            fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
            failCode(res, "", "Chỉ được phép upload file dưới 4Mb");
            return;
        }
        if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg") {
            fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
            failCode(res, "", "Sai định dạng");
        }
        fs.readFile(process.cwd() + "/public/img/" + req.file.filename, (err, data) => {
            let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
            fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
            let id = req.query.id;
            let dataUpload = prisma.hinh_anh.create({
                where: {
                    nguoi_dung_id: Number(id)
                },
                data: {
                    dataBase
                }
            })
            console.log(dataUpload);
            sucessCode(res, dataUpload, "Upload thành công !");
        })
    }
    catch (error) {
        errorCode(res, "Lỗi Backend")
    }
}
module.exports = {
    trangThemAnh
}
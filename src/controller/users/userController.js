const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sucessCode, failCode, errorCode } = require('../../config/reponse');
const { parseToken } = require('../../middlewares/baseToken')
const bcrypt = require('bcrypt');
const dangKy = async (req, res) => {
    try {
        let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
        let passWordHash = bcrypt.hashSync(mat_khau, 10);
        let checkEmail = await prisma.nguoi_dung.findFirst({
            where: {
                email
            }
        })
        if (checkEmail) {
            failCode(res, "", "Email đã tồn tại !")
        }
        else {
            const dataDangKy = await prisma.nguoi_dung.create({
                data: {
                    email, mat_khau: passWordHash, ho_ten, tuoi, anh_dai_dien
                }
            }
            )
            sucessCode(res, dataDangKy, "Tạo tài khoản thành công !")
        }
    } catch (error) {
        errorCode(res, "Lỗi Backend")
    }
}
const dangNhap = async (req, res) => {
    try {
        let { email, mat_khau } = req.body;
        let checkLogin = await prisma.nguoi_dung.findFirst({
            where: {
                email
            }
        })
        if (checkLogin) {
            let checkPass = bcrypt.compareSync(mat_khau, checkLogin.mat_khau);
            if (checkPass) {
                sucessCode(res, parseToken(checkLogin), "Đăng nhập thành công !")
            }
            else {
                failCode(res, "", "Mật khẩu không đúng !");
            }
        } else {
            failCode(res, "", "Email không đúng !");
        }
    } catch (error) {
        errorCode(res, "Lỗi Backend");
    }
}
const capNhatNguoiDung = async (req, res) => {
    try {
        let id = req.params.id;
        let { email, ho_ten, tuoi, anh_dai_dien } = req.body
        let checkUser = await prisma.nguoi_dung.findFirst({
            where: {
                nguoi_dung_id: Number(id)
            }
        })
        if (checkUser) {
            let data = await prisma.nguoi_dung.update({
                where: {
                    nguoi_dung_id: Number(id)
                },
                data: {
                    email, ho_ten, tuoi, anh_dai_dien
                },
                select: {
                    email: true,
                    ho_ten: true,
                    tuoi: true,
                    anh_dai_dien: true
                }
            }
            )
            sucessCode(res, data, "Update thành công");
        }
        else {
            failCode(res, user_id, "User không tồn tại !");
        }
    } catch (error) {
        errorCode(res, "Lỗi backend !")
    }
}
module.exports = {
    dangKy,
    dangNhap,
    capNhatNguoiDung
}
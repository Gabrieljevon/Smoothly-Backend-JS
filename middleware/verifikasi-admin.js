const jwt = require("jsonwebtoken");
const config = require("../config/secret");

function verifikasiUser(req, res, next) {
  // Ambil token dari header Authorization
  let token = req.headers["authorization"];

  if (token) {
    // Remove 'Bearer ' jika ada
    token = token.replace(/^Bearer\s+/, "");

    // Verifikasi token
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.status(401).send({ auth: false, message: "Token tidak terdaftar!" });
      } else {
        // Cek waktu kadaluarsa token
        const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
        if (decoded.exp && decoded.exp < currentTime) {
          return res.status(401).send({ auth: false, message: "Token telah kadaluarsa!" });
        } else if (!decoded.id_admin) {
          return res.status(402).send({ auth: false, message: "Anda bukan admin!" });
        }

        req.decoded = decoded; // Menyimpan data decoded ke dalam req untuk penggunaan selanjutnya
        next(); // Lanjutkan ke middleware/route selanjutnya
      }
    });
  } else {
    return res.status(401).send({ auth: false, message: "Token tidak tersedia!" });
  }
}

module.exports = verifikasiUser;
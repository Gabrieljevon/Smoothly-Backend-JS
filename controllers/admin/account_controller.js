'use strict';

var connection = require('../../connection');
var md5 = require('md5');
var ip = require('ip');
var config = require('../../config/secret')
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

//LOGIN
exports.login = async (req, res) => {
    var post = {
        username: req.body.username,
        password: req.body.password
    }

    var query = "SELECT id_admin FROM ?? WHERE ??=? AND ??=?";
    var table = ["admin", "password", md5(post.password), "username", post.username];


    if (!post.username || !post.password) {
        return res.status(400).json({ status: 400, message: `Username & Password tidak boleh kosong` })
    }

    query = mysql.format(query, table);
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error)
        } else {

            if (rows.length == 0) {            

                return res.status(400).json({ error: true, status: 400, message: `Username / password salah` })

            } else if (rows.length == 1) {

                let id_admin = rows[0].id_admin;
                var token = jwt.sign({ id_admin }, config.secret, {
                    expiresIn: 1440
                });

                var data = {
                    id_admin: id_admin,
                    token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error)
                    } else {
                        res.json({
                            success: true,
                            message: "Token JWT Generated!",
                            token: token,
                            currUser: data.id_admin
                        });
                    }
                });
            }
        }
    })
}

exports.profile = async (req, res) => {
    const { id_admin } = req.decoded
    connection.query(`SELECT * FROM admin WHERE id_admin=? `, id_admin,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, rows })
            }
        }
    )
}


exports.editProfile = async (req, res) => {
    const { id_admin } = req.decoded
    const { nama, username } = req.body
    if (!(nama || username)) {
        return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` })
    }
    connection.query(`SELECT * FROM admin WHERE id_admin=?`, id_admin,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                const validateUsername = rows[0].username
                const qValidateUsername = `SELECT * FROM admin WHERE id_admin=? AND NOT username=?`
                connection.query(qValidateUsername, [id_admin, validateUsername],
                    (error, rows, result) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json({ status: 500, message: "Internal Server Error" });
                        } else {
                            if (rows.length > 0) {
                                return res.status(400).json({ status: 400, message: `Username sudah terdaftar` })
                            } else {
                                connection.query(`UPDATE admin SET nama=?, username=? WHERE id_admin=?`, [nama, username, id_admin],
                                    (error, rows, result) => {
                                        if (error) {
                                            console.log(error);
                                            return res.status(500).json({ status: 500, message: "Internal Server Error" });
                                        } else {
                                            return res.status(200).json({ status: 200, message: `Update profile berhasil` })
                                        }
                                    }
                                )
                            }
                        }
                    }
                )
            }
        }
    )
}

exports.editPassword = async (req, res) => {
    const { id_admin } = req.decoded
    const { old_password, new_password, confirmation_password } = req.body

    if (!(old_password || new_password || confirmation_password)) {
        return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` })
    }

    const qValidatePassword = `SELECT password FROM admin WHERE id_admin=?`
    connection.query(qValidatePassword, id_admin,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                const vPassword = rows[0].password
                if (vPassword != md5(old_password)) {
                    return res.status(400).json({ status: 400, message: `Password lama salah` })
                } else if (new_password != confirmation_password) {
                    return res.status(400).json({ status: 400, message: `Konfirmasi password salah` })
                } else {
                    connection.query(`UPDATE admin SET password=? WHERE id_admin=?`, [md5(new_password), id_admin],
                        (error, rows, result) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ status: 500, message: "Internal Server Error" });
                            } else {
                                return res.status(200).json({ status: 200, message: `Update password berhasil` })
                            }
                        }
                    )
                }
            }
        }
    )
}


exports.editLocation = async (req, res) => {
    const { toko_latitude, toko_longitude } = req.body
    connection.query(`UPDATE admin SET toko_latitude=?,toko_longitude=?`, [toko_latitude, toko_longitude],
        (error, rows, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: `Berhasil mengedit lokasi toko` })
            }
        }
    )
}
'use strict';

const connection = require('../../connection');

exports.showLayanan = async (req, res) => {
    connection.query(`SELECT * FROM layanan`,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                if (rows.length === 0) {
                    return res.status(404).json({ status: 404, message: `Tidak ada data` })
                }
                return res.status(200).json({ status: 200, rows })
            }
        }
    )
}

exports.showLayananId = async (req, res) => {
    const { id_layanan } = req.params
    connection.query(`SELECT * FROM layanan WHERE id_layanan=?`, id_layanan,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                if (rows.length === 0) {
                    return res.status(404).json({ status: 404, message: `Tidak ada data` })
                }
                return res.status(200).json({ status: 200, rows })
            }
        }
    )
}

exports.addLayanan = async (req, res) => {
    const { nama_layanan, deskripsi, harga } = req.body
    if (!(nama_layanan || deskripsi || harga)) {
        return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` })
    }

    connection.query(`INSERT INTO layanan(nama_layanan,deskripsi,harga) VALUES(?,?,?)`, [nama_layanan, deskripsi, harga],
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: `Layanan berhasil ditambahkan` })
            }
        }
    )
}

exports.editLayanan = async (req, res) => {
    const { nama_layanan, deskripsi, harga } = req.body
    const { id_layanan } = req.params
    if (!(nama_layanan || deskripsi || harga)) {
        return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` })
    }

    connection.query(`UPDATE layanan SET nama_layanan=?, deskripsi=?, harga=? WHERE id_layanan=?`, [nama_layanan, deskripsi, harga, id_layanan],
        (error, rows, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: `Layanan berhasil diedit` })
            }
        }
    )
}

exports.deleteLayanan = async (req, res) => {
    const { id_layanan } = req.params

    connection.query(`SELECT * FROM layanan WHERE id_layanan=?`, id_layanan,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                if (rows.length === 0) {
                    return res.status(404).json({ status: 404, message: `Tidak ada data` })
                } else {
                    connection.query(`DELETE FROM layanan WHERE id_layanan=?`, [id_layanan],
                        (error, rows, result) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ status: 500, message: "Internal Server Error" });
                            } else {
                                return res.status(200).json({ status: 200, message: `Layanan berhasil dihapus` })
                            }
                        }
                    )
                }
            }
        }
    )
}
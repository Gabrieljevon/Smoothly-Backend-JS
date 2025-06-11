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

// New function to get layanan by nama_layanan
exports.showLayananByName = async (req, res) => {
    const { nama_layanan } = req.params;
    connection.query(`SELECT * FROM layanan WHERE nama_layanan LIKE ?`, `%${nama_layanan}%`,
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

// New function to get layanan by harga
exports.showLayananByPrice = async (req, res) => {
    const { harga } = req.params;
    connection.query(`SELECT * FROM layanan WHERE harga = ?`, harga,
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


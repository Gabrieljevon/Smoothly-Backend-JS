-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2024 at 11:30 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smoothly`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `toko_latitude` varchar(255) NOT NULL,
  `toko_longitude` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `nama`, `username`, `password`, `created_at`, `updated_at`, `toko_latitude`, `toko_longitude`) VALUES
(1, 'Jevon The Prodigy', 'admin', '202cb962ac59075b964b07152d234b70', '2024-05-29 06:25:53', '2024-06-02 18:42:05', '-6.9045677', '109.1107114');

-- --------------------------------------------------------

--
-- Table structure for table `akses_token`
--

CREATE TABLE `akses_token` (
  `id` int(11) NOT NULL,
  `id_pelanggan` int(11) DEFAULT NULL,
  `id_admin` int(11) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `akses_token`
--

INSERT INTO `akses_token` (`id`, `id_pelanggan`, `id_admin`, `ip_address`, `token`, `created_at`) VALUES
(1, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZF9hZG1pbiI6MX1dLCJpYXQiOjE3MTY5Nzk3MTUsImV4cCI6MTcxNjk4MTE1NX0.O88tI3y8fn5pP1qXSYPRSSGy5HSsN5WP5JroLzNz2mg', '2024-05-29 17:48:35'),
(2, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE2OTgwNjE4LCJleHAiOjE3MTY5ODIwNTh9.emIgxF5Z14zLHRVTu1UBm11BmG1Cwstjdjm5v5XwZi4', '2024-05-29 18:03:38'),
(3, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MDExNjY1LCJleHAiOjE3MTcwMTMxMDV9.6CiOSmj5fkN6XfIimoAXA8SVD39Q-vysdukW1QgDECQ', '2024-05-30 02:41:05'),
(4, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MDEyNDc0LCJleHAiOjE3MTcwMTM5MTR9.KLrGOZcU-Ab4coyT6JShe6KwUIas__0peB6Uo2NKUjk', '2024-05-30 02:54:34'),
(5, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzMyNjQzLCJleHAiOjE3MTczMzQwODN9.OGLuK2lrsHZnW1RW5vWB0-c5XR267loj0Gfg_u3W6mM', '2024-06-02 19:50:43'),
(6, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzM0MTUyLCJleHAiOjE3MTczMzU1OTJ9.P-gFbJB0jhECLyIMs1TDVxbGBWrq1ePCT2WDZ4Oy6m4', '2024-06-02 20:15:52'),
(7, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzM1Nzk2LCJleHAiOjE3MTczMzcyMzZ9.LWZVMBv4HNvDNIZZ_XWfkU6uUt4UjtkY6HASEiW_b-Q', '2024-06-02 20:43:16'),
(8, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzM3MjU4LCJleHAiOjE3MTczMzg2OTh9.2pPtGBiw6iU9W3SKO18kX0dgpjhYLZ6bkogAnlSicK0', '2024-06-02 21:07:38'),
(9, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzM4MTE4LCJleHAiOjE3MTczMzk1NTh9.YPNstcVyostmXSralEpV82ACCn3XwWiiUQdsK5SodTg', '2024-06-02 21:21:58'),
(10, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzM4NzE3LCJleHAiOjE3MTczNDAxNTd9.35Degu0p70rzkfI88zIzw3_wogF6RqA8PG0wagCLric', '2024-06-02 21:31:57'),
(11, 4, NULL, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9wZWxhbmdnYW4iOjQsImlhdCI6MTcxNzMzODg1MCwiZXhwIjoxNzE3MzQ0NjEwfQ.-4JG_OIlNJq6nkFIYOfaix-q5N8fVu5pDyQjLOxOjas', '2024-06-02 21:34:10'),
(12, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzQwMTcwLCJleHAiOjE3MTczNDE2MTB9.Cy2QgX2F5D6ze6vdCJo2Y-EToc6_Z4EdiK4ng42QgNY', '2024-06-02 21:56:10'),
(13, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzQwNzA5LCJleHAiOjE3MTczNDIxNDl9.gUHPPcdC9mtr6PkB1cPj91NcBsk-VFi_PDrPol-2M8Q', '2024-06-02 22:05:09'),
(14, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzQxODUzLCJleHAiOjE3MTczNDMyOTN9.GefjwBLGms_ISlMgUC-W7XXY_ZtCp6-ZzP-2I5DbjVs', '2024-06-02 22:24:13'),
(15, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzQ0NzEyLCJleHAiOjE3MTczNDYxNTJ9.G7pDj4Y2xJiA4PueTWfKvuYxVXrtqwsysZA4XTgUvUo', '2024-06-02 23:11:52'),
(16, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzQ0OTg2LCJleHAiOjE3MTczNDY0MjZ9.LwdkPdbZyL38OjGon5HI4xIUm26ROncb36v-q2jhrLs', '2024-06-02 23:16:26'),
(17, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzQ2NTE0LCJleHAiOjE3MTczNDc5NTR9.u_GqS5SPUEGFyaIIB-8J3cucbxCSJB2cnQaAnSGwWks', '2024-06-02 23:41:54'),
(18, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzQ4MDQ5LCJleHAiOjE3MTczNDk0ODl9.KCgV7CnivCqi4T8md-L4qk8yrsPyWijNhCDUz95PjbY', '2024-06-03 00:07:29'),
(19, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzQ5NzM0LCJleHAiOjE3MTczNTExNzR9.T3LGeQc-1K9PdhtY_AbDPleuIEolCra-T5YYCfh_zDI', '2024-06-03 00:35:34'),
(20, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzUxNjgxLCJleHAiOjE3MTczNTMxMjF9.4jeCPQ9Rb_yuxAmnL-FF3OgY4IPPU-J3NUgJXDh5MVQ', '2024-06-03 01:08:01'),
(21, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3MzUzMzUyLCJleHAiOjE3MTczNTQ3OTJ9.p9e3d2Xn567hXI2cpB2pfck_xFuwWbWfDxsoC2oqLdk', '2024-06-03 01:35:52'),
(22, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3NDg4MDM2LCJleHAiOjE3MTc0ODk0NzZ9.CNpfqV5L7H6rDKXCtKfw9WgCnu6lOqsbFACqEdH0H5c', '2024-06-04 15:00:36'),
(23, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3NDg4MzkwLCJleHAiOjE3MTc0ODk4MzB9.XW7v_R1Ecyox0AaElWNVYdguGtg3dnL0048Zu0OFZno', '2024-06-04 15:06:30'),
(24, 5, NULL, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9wZWxhbmdnYW4iOjUsImlhdCI6MTcxNzQ4ODk0MiwiZXhwIjoxNzE3NDk0NzAyfQ.noloGk1eOyTic5iQ5E7NKvhGyq0AVK1VJNWBuZEhXWc', '2024-06-04 15:15:42'),
(25, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3NDg5ODUwLCJleHAiOjE3MTc0OTEyOTB9.xa2HOJwFJqv7U_ljUMx-rrhfFexBV499p1HKP5xTUDw', '2024-06-04 15:30:50'),
(26, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3NDkwOTMxLCJleHAiOjE3MTc0OTIzNzF9.igPdxbdMPX7zuXT97IS0Eb1i4g4q-w8F_wXZp5JJuxs', '2024-06-04 15:48:51'),
(27, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3NDkwOTM5LCJleHAiOjE3MTc0OTIzNzl9.cEMl0j9ga2iJBB8TjrHMUTv0OB9RJCvpk5RoWnLHIls', '2024-06-04 15:48:59'),
(28, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3NDkwOTc3LCJleHAiOjE3MTc0OTI0MTd9.BORbhKaE7rsqMBI26D7VO5jMlJHs9Ff_D6RmQDVrsB8', '2024-06-04 15:49:37'),
(29, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3NDkxMDQwLCJleHAiOjE3MTc0OTI0ODB9.y1EL3QBdEboTRoGEugkoN--hCtyp-thcy89h94fi9ZM', '2024-06-04 15:50:40'),
(30, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3NDkxMDg5LCJleHAiOjE3MTc0OTI1Mjl9.Fi6ogctjRcL7o80elZwJh6uu11N492DjA4SdY0f-8m0', '2024-06-04 15:51:29'),
(31, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3NDkxMTQ1LCJleHAiOjE3MTc0OTI1ODV9.y9nG8DtqUbZhbHVHTszzyY-EpL6P7RVChw3yzWEK9Qw', '2024-06-04 15:52:25'),
(32, NULL, 1, '192.168.56.1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6MSwiaWF0IjoxNzE3NDkyNjIyLCJleHAiOjE3MTc0OTQwNjJ9.VH0o0zFGsSlLYggnr3d--3h8Pr9I7BSj6AGVSiyqxjY', '2024-06-04 16:17:02');

-- --------------------------------------------------------

--
-- Table structure for table `layanan`
--

CREATE TABLE `layanan` (
  `id_layanan` int(11) NOT NULL,
  `nama_layanan` varchar(100) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `harga` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `layanan`
--

INSERT INTO `layanan` (`id_layanan`, `nama_layanan`, `deskripsi`, `harga`, `created_at`, `updated_at`) VALUES
(1, 'Cuci Sepatu Reguler', 'Layanan cuci sepatu standar dengan estimasi waktu 3-5 hari kerja.', '50000.00', '2024-05-29 06:29:34', '2024-05-29 06:29:34'),
(2, 'Cuci Sepatu Kilat', 'Layanan cuci sepatu cepat dengan estimasi waktu 1-2 hari kerja.', '75000.00', '2024-05-29 06:29:34', '2024-05-29 06:29:34'),
(3, 'Cuci Sepatu Premium', 'Layanan cuci sepatu dengan perawatan tambahan dan bahan pembersih premium.', '100000.00', '2024-05-29 06:29:34', '2024-05-29 06:29:34'),
(4, 'Cuci Sepatu Express', 'Layanan cuci sepatu super cepat dengan estimasi waktu 6-12 jam.', '90000.00', '2024-05-29 06:29:34', '2024-05-29 06:29:34'),
(5, 'Cuci Sepatu Deep Clean', 'Layanan cuci sepatu menyeluruh hingga ke bagian dalam sepatu.', '120000.00', '2024-05-29 06:29:34', '2024-05-29 06:29:34');

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `no_telepon` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id_pelanggan`, `nama`, `alamat`, `email`, `no_telepon`, `password`, `foto_profil`, `created_at`, `updated_at`) VALUES
(1, 'Eren Yeager', 'Jl. Merdeka No. 123, Jakarta', 'eren@example.com', '081234567890', '*805E21D6D3E533DFF9290C929DA06DB1EECA8F2C', 'eren.jpg', '2024-05-29 06:31:32', '2024-06-04 07:36:19'),
(2, 'Mikasa Ackerman', 'Jl. Sudirman No. 456, Bandung', 'mikasa@example.com', '081987654321', '7ba534c5d0832e943537ec93b747be2d', 'mikasa.jpg', '2024-05-29 06:31:32', '2024-06-04 07:36:42'),
(3, 'Zeke Yeager', 'Jl. Ahmad Yani No. 789, Surabaya', 'zeke@example.com', '081345678901', 'e0b5e1a3e86a399112b9eb893daeacfd', 'zeke.jpg', '2024-05-29 06:31:32', '2024-06-04 07:37:11'),
(4, 'Armin', 'Magelang', 'armin@example.com', '085156031385', 'cf3384d079ddcb4ca02fadab6be9802d', 'armin.jpg', '2024-06-02 14:33:58', '2024-06-04 07:37:48'),
(5, 'Sasha', 'Shiganshina', 'sasha@example.com', '082639163418', '481f693417e9a74e783caea72063b606', NULL, '2024-06-04 07:38:43', '2024-06-04 07:38:43');

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id_pembayaran` int(11) NOT NULL,
  `id_pemesanan` int(11) DEFAULT NULL,
  `bukti_pembayaran` varchar(255) DEFAULT NULL,
  `metode_pembayaran` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pembayaran`
--

INSERT INTO `pembayaran` (`id_pembayaran`, `id_pemesanan`, `bukti_pembayaran`, `metode_pembayaran`, `created_at`, `updated_at`) VALUES
(17, 2, 'bukti_transfer_2.jpg', 'Transfer Bank', '2024-05-29 06:39:57', '2024-05-29 06:39:57'),
(18, 3, 'bukti_transfer_3.jpg', 'Transfer Bank', '2024-05-29 06:39:57', '2024-05-29 06:39:57'),
(19, 4, 'bukti_transfer_4.jpg', 'Transfer Bank', '2024-05-29 06:39:57', '2024-05-29 06:39:57'),
(20, 5, 'bukti_transfer_5.jpg', 'Transfer Bank', '2024-05-29 06:39:57', '2024-05-29 06:39:57'),
(21, 7, 'bukti_transfer_7.jpg', 'Transfer Bank', '2024-05-29 06:39:57', '2024-05-29 06:39:57'),
(22, 8, 'bukti_transfer_8.jpg', 'Transfer Bank', '2024-05-29 06:39:57', '2024-05-29 06:39:57'),
(23, 9, 'bukti_transfer_9.jpg', 'Transfer Bank', '2024-05-29 06:39:57', '2024-05-29 06:39:57'),
(24, 10, 'bukti_transfer_10.jpg', 'Transfer Bank', '2024-05-29 06:39:57', '2024-05-29 06:39:57'),
(25, 14, NULL, 'COD', '2024-06-04 08:37:32', '2024-06-04 08:37:32'),
(26, 12, NULL, 'COD', '2024-06-04 08:37:38', '2024-06-04 08:37:38'),
(27, 13, NULL, 'COD', '2024-06-04 08:37:46', '2024-06-04 08:37:46'),
(28, 13, 'bukti_transfer_7_3ce7e7.jpg', 'Transfer Bank', '2024-06-04 08:38:35', '2024-06-04 08:38:57');

-- --------------------------------------------------------

--
-- Table structure for table `pemesanan`
--

CREATE TABLE `pemesanan` (
  `id_pemesanan` int(11) NOT NULL,
  `id_pelanggan` int(11) DEFAULT NULL,
  `id_layanan` int(11) DEFAULT NULL,
  `jumlah_sepatu` int(11) DEFAULT NULL,
  `catatan_pelanggan` text DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `status_pemesanan` int(11) DEFAULT 0,
  `total_biaya` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pemesanan`
--

INSERT INTO `pemesanan` (`id_pemesanan`, `id_pelanggan`, `id_layanan`, `jumlah_sepatu`, `catatan_pelanggan`, `longitude`, `latitude`, `status_pemesanan`, `total_biaya`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 2, 'Tolong bersihkan dengan hati-hati', '106.816666', '-6.200000', 0, 214851, '2024-05-29 06:39:49', '2024-06-04 09:18:23'),
(2, 2, 2, 1, 'Ada noda lumpur di sisi kiri', '107.609810', '-6.914744', 3, 121285, '2024-04-29 06:39:49', '2024-06-04 09:18:19'),
(3, 3, 3, 3, 'Cuci kilat karena mau dipakai besok', '112.752088', '-7.257472', 2, 242482, '2024-05-29 06:39:49', '2024-06-04 09:18:16'),
(4, 1, 4, 2, 'Tolong perhatikan bagian dalam', '106.845130', '-6.208763', 4, 24239, '2024-05-29 06:19:49', '2024-06-04 09:18:58'),
(5, 2, 5, 1, 'Ada bau tidak sedap, tolong hilangkan', '110.367078', '-7.801194', 4, 28152, '2024-05-29 06:39:49', '2024-06-04 09:18:08'),
(6, 1, 2, 2, 'Tolong jangan terlalu basah', '106.816666', '-6.200000', 0, 35819, '2024-05-29 06:39:49', '2024-06-04 09:18:06'),
(7, 2, 3, 3, 'Tolong dicuci kilat', '107.609810', '-6.914744', 2, 29472, '2024-05-29 06:39:49', '2024-06-04 09:18:02'),
(8, 3, 4, 1, 'Perhatikan bahan sepatu', '112.752088', '-7.257472', 2, 124791, '2024-05-29 06:39:49', '2024-06-04 09:17:59'),
(9, 3, 5, 2, 'Jangan lupa bagian sol', '106.845130', '-6.208763', 4, 21241, '2024-05-29 06:39:49', '2024-06-04 09:17:56'),
(10, 1, 1, 1, 'Pastikan kering sebelum dikirim', '110.367078', '-7.801194', 4, 46821, '2024-05-29 06:39:49', '2024-06-04 09:17:52'),
(11, 4, 3, 5, 'Bersihkan Semuanya', '110.377522', '-7.744137', 0, 502470, '2024-06-02 14:38:34', '2024-06-02 14:43:54'),
(12, 5, 3, 5, 'Bersihkan Semuanya', '110.377522', '-7.744137', 1, 668030, '2024-06-04 08:16:01', '2024-06-04 08:37:38'),
(13, 5, 1, 2, 'Bersihkan Semuanya', '110.377522', '-7.744137', 1, 268030, '2024-06-04 08:18:11', '2024-06-04 08:37:46'),
(14, 5, 1, 2, 'Bersihkan Semuanya', '110.377522', '-7.744137', 1, 268030, '2024-06-04 08:36:33', '2024-06-04 08:37:32');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_pemesanan` int(11) DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `tanggal_keluar` date DEFAULT NULL,
  `total_biaya` decimal(10,2) DEFAULT NULL,
  `tanggal_transaksi` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_pemesanan`, `tanggal_masuk`, `tanggal_keluar`, `total_biaya`, `tanggal_transaksi`, `created_at`, `updated_at`) VALUES
(1, 2, '2024-05-01', '2024-05-03', '75000.00', '2024-05-29 06:40:06', '2024-05-29 06:40:06', '2024-05-29 06:40:06'),
(3, 4, '2024-05-01', '2024-06-04', '180000.00', '2024-05-29 06:40:06', '2024-05-29 06:40:06', '2024-06-04 09:18:58'),
(4, 5, '2024-05-01', '2024-05-03', '120000.00', '2024-05-29 06:40:06', '2024-05-29 06:40:06', '2024-05-29 06:40:06'),
(9, 2, '2024-06-04', NULL, NULL, '2024-06-04 08:07:39', '2024-06-04 08:07:39', '2024-06-04 08:07:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `akses_token`
--
ALTER TABLE `akses_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `layanan`
--
ALTER TABLE `layanan`
  ADD PRIMARY KEY (`id_layanan`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id_pembayaran`),
  ADD KEY `pembayaran_ibfk_1` (`id_pemesanan`);

--
-- Indexes for table `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD PRIMARY KEY (`id_pemesanan`),
  ADD KEY `pemesanan_ibfk_1` (`id_pelanggan`),
  ADD KEY `pemesanan_ibfk_2` (`id_layanan`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `transaksi_ibfk_1` (`id_pemesanan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `akses_token`
--
ALTER TABLE `akses_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `layanan`
--
ALTER TABLE `layanan`
  MODIFY `id_layanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id_pelanggan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id_pembayaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `pemesanan`
--
ALTER TABLE `pemesanan`
  MODIFY `id_pemesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`id_pemesanan`) REFERENCES `pemesanan` (`id_pemesanan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD CONSTRAINT `fk_layanan` FOREIGN KEY (`id_layanan`) REFERENCES `layanan` (`id_layanan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pelanggan` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pemesanan_ibfk_1` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pemesanan_ibfk_2` FOREIGN KEY (`id_layanan`) REFERENCES `layanan` (`id_layanan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `fk_pemesanan` FOREIGN KEY (`id_pemesanan`) REFERENCES `pemesanan` (`id_pemesanan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_pemesanan`) REFERENCES `pemesanan` (`id_pemesanan`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

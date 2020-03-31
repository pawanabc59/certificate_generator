-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2020 at 02:09 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `certificate_generator`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(100) NOT NULL,
  `event_name` varchar(200) NOT NULL,
  `event_type` varchar(100) NOT NULL,
  `event_date` date NOT NULL,
  `event_incharge` varchar(100) NOT NULL,
  `incharge_username` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `csv_path` varchar(200) NOT NULL,
  `event_image` varchar(200) NOT NULL,
  `event_description` varchar(5000) NOT NULL,
  `csv_uploaded` varchar(100) NOT NULL,
  `certificate_printed` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `event_name`, `event_type`, `event_date`, `event_incharge`, `incharge_username`, `department`, `csv_path`, `event_image`, `event_description`, `csv_uploaded`, `certificate_printed`) VALUES
(16, 'Mumbai Hackathon', 'hackathons', '2020-02-25', 'deepak', 'deepak', 'IT', '/uploads/deepak/hackathon.csv', '/uploads/deepak/download.png', 'This is Mumbai hackathon event.', '', ''),
(17, 'Smart India Hackathon', 'competition', '2020-02-29', 'nishant', 'nishant', 'Comps', '/uploads/nishant/hackathon.csv', '/uploads/nishant/Smart-India-Hackathon-1.jpg', 'Smart India Hackathon is a national level competition.', '1', '1'),
(18, 'Science Talk', 'talk', '2020-02-26', 'nishant', 'nishant', 'Comps', '', '/uploads/nishant/talk.png', 'This is the science talk', '0', ''),
(19, 'sky hackathon', 'hackathons', '2020-02-25', 'deepak', 'deepak', 'IT', '/uploads/deepak/hackathon.csv', '/uploads/deepak/skyhackathon.png', 'event description', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `department` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `name`, `username`, `password`, `department`, `role`) VALUES
(2, 'akash', '317akash5202', 'akash', 'Comps', 'hod'),
(3, 'deepak', '316deepak', 'deepak', 'IT', 'faculty'),
(7, 'nishant nimbalkar', '316nishant', 'nishant', 'Comps', 'faculty'),
(9, 'jayesh', '316jayesh1', '123', 'Mech', 'faculty'),
(10, 'vishal', '31vishal', '123', 'Mech', 'faculty');

-- --------------------------------------------------------

--
-- Table structure for table `gen_certificates`
--

CREATE TABLE `gen_certificates` (
  `email` varchar(100) NOT NULL,
  `event_type` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gen_certificates`
--

INSERT INTO `gen_certificates` (`email`, `event_type`, `code`) VALUES
('pawanabc59@gmail.com', 'hackathons', 'VbY4gNy3lv3cbLG93jLxfQ8kGLBEnwjm'),
('akash.hadwale3737@gmail.com', 'hackathons', 'jwb20e2IKMy5kYS0kUmTSBblUZV3Qq6g'),
('dparadkar99@gmail.com', 'hackathons', '7PV2YHFc4VGLySmjy9J1d4UdrQAWh1xC'),
('pawanabc59@gmail.com', 'hackathons', '7GZexLOYzKSAXupQBnX0oaG5YIGsKPOL'),
('akash.hadwale3737@gmail.com', 'hackathons', 'pYUKCv2OXwks61XTlFcuuMkq651gg5eD'),
('dparadkar99@gmail.com', 'hackathons', '7wMaTO0MGnoRgtqtBBPfuKI81SmMBXZD'),
('pawanabc59@gmail.com', 'hackathons', 'IHoaBsscwTTwsx7y4Z5dQnORwGVfg6OZ'),
('akash.hadwale3737@gmail.com', 'hackathons', 'fyUohV8n4StnCekCDT2pRrq30t2mMLN4'),
('dparadkar99@gmail.com', 'hackathons', 'KsuYoT9PnPMN16a8AZBr1vhHzNKAHRrJ'),
('pawanabc59@gmail.com', 'hackathons', 'Kwlrsfuav4chpXESGTDlqMs47p0mWX8T'),
('akash.hadwale3737@gmail.com', 'hackathons', 'nJ18oBHpYsUphudKwc54R5SzzYkdGdAd'),
('dparadkar99@gmail.com', 'hackathons', 'LYoQzN4O719kNEoHrXpdZpZ6atJqC4Q2'),
('pawanabc59@gmail.com', 'hackathons', 'ipVPcuA7CGOWDzrw9J2C4YpSnIlMqwra'),
('akash.hadwale3737@gmail.com', 'hackathons', 'nU7NdYSZSeb7LMFDxVGhgC7MvNc0Jylz'),
('dparadkar99@gmail.com', 'hackathons', '6s1nn7mPgtdZOKBbwESUjn3lRJFPUijA'),
('pawanabc59@gmail.com', 'hackathons', 'El6lTyX0f3LtRhOXzFzHaiexHjqRjWrq'),
('akash.hadwale3737@gmail.com', 'hackathons', 'uBJ9PQ4t8nGPSZTmDaHl4GEi8l4m2pg4'),
('dparadkar99@gmail.com', 'hackathons', 'anXNRY7qOoL04EWg2y4hdMybvzXGxP6Z'),
('pawanabc59@gmail.com', 'hackathons', 'h8OD45iKCPWNvZk9dfL6t3uhZxiKU63b'),
('akash.hadwale3737@gmail.com', 'hackathons', 'acZa5QVlONQapZjvrRjpdhhEVz3Ab6qf'),
('dparadkar99@gmail.com', 'hackathons', 'j8NlwqzDUGIpzM82VupQQ9SYGG856GmW'),
('pawanabc59@gmail.com', 'hackathons', '9nnlV5MHD2vYquvDRyx2f8dfOlQcJOZ4'),
('akash.hadwale3737@gmail.com', 'hackathons', 'BrsS6ZwgJ8QAjRDkl46PAmMLvW5cfYtW'),
('dparadkar99@gmail.com', 'hackathons', 'X7iLK0WWI0zVkmlpCDxKzZArbt92lT7d'),
('pawanabc59@gmail.com', 'hackathons', 'zftbFEpFOLXRVIB96nWPZCkcjJF42OLh'),
('akash.hadwale3737@gmail.com', 'hackathons', 'K9CwXbApPQ8lc8s9faXPBWlBLv2Ni8yF'),
('dparadkar99@gmail.com', 'hackathons', '9wFZqtn8gamJwNsFJ5BtP4SIzcfHCA0h'),
('pawanabc59@gmail.com', 'hackathons', 'mzjrGhtTBtO3pk4zGHOTqzuJ8H7juNBY'),
('akash.hadwale3737@gmail.com', 'hackathons', 'KV3cCDzRdolXtJjvLvgnYXmXL9LFKToc'),
('dparadkar99@gmail.com', 'hackathons', 'k2zgtFy2wP48M6YDTURjPrdEcF2w4lu5'),
('pawanabc59@gmail.com', 'hackathons', 'UhDChsyDQjQNOhJW3LqbDOggANFPRjIh'),
('akash.hadwale3737@gmail.com', 'hackathons', 'fD7QWmnkLfS4j0q4OeRX1z4AroW2cgS6'),
('dparadkar99@gmail.com', 'hackathons', 'gtWJopPE4TP9RdQAig2bWoCAKwGGLFp9'),
('akash@gmail.com', 'hackathons', '77xS5bAM2laRZvD6PMD93AJ1XdPbDIW2'),
('deepak@gmail.com', 'hackathons', 'p7Sao0Pu8jwv2V2cXM6RIUMEmdc9uTea'),
('pawanabc59@gmail.com', 'hackathons', 'C1nnvxIEdwQuNgT5HLtBFRZVF4W81Yd3'),
('nishant@gmail.com', 'hackathons', 'h7okfylFMnaUXAj9S83G6TnfoqKABAvk'),
('bbh@gmail.com', 'hackathons', 'E8k3bgp6ssZOXbl20aUw2GXYPEXUCWoM'),
('akash@gmail.com', 'hackathons', 'rflvA8DnwtpZ8wy5Cw8dA1hegw5lU3TK'),
('deepak@gmail.com', 'hackathons', 'FEG8ncGmkTnmUssJ9Q5ImbFBzgXbrGpK'),
('pawanabc59@gmail.com', 'hackathons', 'b7A2YU0YDdvd0hS87nD567ogNrnIiIQg'),
('nishant@gmail.com', 'hackathons', 'T0Zzn47mqo64ZRtcMPEJJKNKH91c338I'),
('bbh@gmail.com', 'hackathons', 'vAWmnzuoQ0DFK9Bj6319ZKWCBCujZhSx'),
('akash@gmail.com', 'hackathons', 'mg4OoNhAJ5lN9Ya24fb0vVNoyWK8J0IB'),
('deepak@gmail.com', 'hackathons', '0koDAfJWSFIkP3ije2E3qZxqucG1JtZO'),
('pawanabc59@gmail.com', 'hackathons', 'URRCViGJQGqzwdoYWQcm8aqg7kvuZhOy'),
('nishant@gmail.com', 'hackathons', 'eLqyu12tj4rNfAUoj9RfcjUC18QVSlCV'),
('bbh@gmail.com', 'hackathons', 'FUGdIJUvkQi62gPaQjnTLVLXpFClcjp8'),
('pawanabc59@gmail.com', 'talk', 'lMRtLGmWOI8ryEHkeQAxecnELhBrM5SG'),
('akash.hadwale3737@gmail.com', 'talk', 'zoVUs5Yl6XFFdqXjLgEeGzmXASwk0yRA'),
('dparadkar99@gmail.com', 'talk', 't1tE4z2NXbrPe4x2BHELhlOnkULIpqZG'),
('pawanabc59@gmail.com', 'talk', 'sGYV9jhVmbArzFAFirokOBFcpD8wozmT'),
('akash.hadwale3737@gmail.com', 'talk', 'QbReUtJKjmIdfK7eHNPxOFwyKdlSw9DT'),
('dparadkar99@gmail.com', 'talk', 'aLM5HKAbRj4AfGhI3lJrOUmp6WBXTpiI'),
('pawanabc59@gmail.com', 'competition', 'DzdEl1ULtcFWTyq7TDvUehKWewYhMwtw'),
('akash.hadwale3737@gmail.com', 'competition', '1c4PoxMyxqGJ2z73nKkkreYHH5m32a3x'),
('dparadkar99@gmail.com', 'competition', '0j9mSBBC1wLYJxiiINnJfyHC2XybNUQM'),
('pawanabc59@gmail.com', 'competition', 'BBNRPFpJJRcUjF3n57lt7dj9DN9KVef7'),
('akash.hadwale3737@gmail.com', 'competition', 'SKcPRnFbwg9F3VDYwLNNWSIApJgz8wEL'),
('dparadkar99@gmail.com', 'competition', 'KiIFPql2c1eWbnzK3a9I4nDOxIaXDeDg'),
('pawanabc59@gmail.com', 'competition', 'vVo6M207GOZ00CleO2i9UcpBRPqeroNz'),
('akash.hadwale3737@gmail.com', 'competition', 'NEJ4weRdlsUIjw7qkMZeCHrmJ6SPXIDQ'),
('dparadkar99@gmail.com', 'competition', 'Lqst4tB0OT6hjnWIGgCT06zFO25yXAeV'),
('pawanabc59@gmail.com', 'competition', 'ovLnGFbe46FRGvQJsFZBCiBFNGRIzwNZ'),
('akash.hadwale3737@gmail.com', 'competition', 'neLXMEbdccsQV6pQh7DGQ0dNTjtNNuQC'),
('dparadkar99@gmail.com', 'competition', 'iXBiff3ZuyHwOfEfO3a6J8s3bGwbvwid'),
('pawanabc59@gmail.com', 'competition', 'HGysW245bhsrEcpxM3LGmz8GwhWTSKf3'),
('akash.hadwale3737@gmail.com', 'competition', 'cAdNGbqwnZZVesxcPwzu4aguhw9RB4Pt'),
('dparadkar99@gmail.com', 'competition', 'fYVRvRFAZTmbS5EHpzYnGwB27ahlzqDg'),
('akash@gmail.com', 'hackathons', '5BikExBRRFLTSJ7MZ2HmecnX9yWmdOOH'),
('deepak@gmail.com', 'hackathons', '02CWrkvJI3PgWxszMx2C2wI2gD5BYxaW'),
('pawanabc59@gmail.com', 'hackathons', '7LrSLXSRsJOcVXHQ4GYzH0d9322S28MP'),
('nishant@gmail.com', 'hackathons', 'riFTmch5rz4ZKhbfK72chinJ8oZAZIc6'),
('bbh@gmail.com', 'hackathons', 't0TY0ojHyOHpbo5IEtxqEgB136tgzTaF'),
('pawanabc59@gmail.com', 'competition', 'J6R3qKEEDuzlwNNz6GfKJMf1tkqx4hNY'),
('akash.hadwale3737@gmail.com', 'competition', '3d6D8FjMXxtSXltIY3ejNyF2MLEbI8rT'),
('dparadkar99@gmail.com', 'competition', 'HfheqfvJW5e5QI62meh9wOSXAvVh8SqZ');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roles` varchar(50) NOT NULL,
  `department` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`, `roles`, `department`) VALUES
(1, 'admin', 'admin', 'admin', 'IT'),
(3, 'akash', 'akash', 'hod', 'Comps'),
(4, 'deepak', 'deepak', 'faculty', 'IT'),
(8, 'nishant', 'nishant', 'faculty', 'Comps'),
(9, '316jayesh', 'jay', 'faculty', 'Mech'),
(11, '31vishal', '123', 'faculty', 'Mech'),
(12, 'a', 'a', 'hod', 'IT'),
(13, 'q', 'q', 'faculty', 'IT');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

# Smoothly

This repository contains backend services for the “Smoothly” application, a platform for shoe washing services. It is built using Express JS as a framework for backend development and MySQL as a database management system.

## Main Features
- Service Booking: Users can book shoe washing services through the app.
- Customer Management: The system can manage customer data, including personal information and transaction history.
- Admin Management: Admins can manage incoming orders, change order status, and track customer activity.
- Payment: Customers can make payments for booked services using various supported payment methods.

## Technology used
- Express JS: Used as the main framework for application backend development.
- MySQL: Used as a database management system to store customer, order, transaction, and other data.
- Multer: Middleware to manage the file upload process, used in this application to upload proof of payment.
- JWT (JSON Web Tokens): Used for user authentication and authorization of access to certain features in the app.

## Table of Contents

- [Smoothly](#smoothly)
  - [Documentation](#documentation)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Troubleshooting](#troubleshooting)
  - [Authors](#authors)
  - [License](#license)


## Documentation

- To view API documentation such as endpoints, request body, request params, and request query along with authentication middleware you can see through the following
  [SpreadSheet](https://docs.google.com/spreadsheets/d/1C4j_gn8kT-3VyplsPdFzW9ss2iVfElnWpqhdUcFlsLc/edit?usp=sharing)

-You can also test the API directly by importing the Collection to Postman

## Environment Variables

To run this project, you need to add the following environment variables to your .env file:

- `PORT` = 5000
- `DB_HOST` = localhost
- `DB_USER` = root
- `DB_PASSWORD` = 
- `DB_NAME` = smoothly
- `BASE_URL` = http://localhost:5000

## Installation

- Clone this project:

Clone this repository into your local system

```bash
  git clone https://github.com/ghufronakbar/Smoothly-BE-ExpressJS.git
```

- Installing packages:

Run the npm install command to install all necessary dependencies.

```bash
  npm install
```

- Environment Configuration:

Change the .env.example file to .env and customize it with your environment configuration, including database information and other settings.

- Make sure MySQL is turned on in XAMPP control center.

- Import database:

Import the smoothly.sql database schema into your MySQL server.

- API Access:

Access the API through the endpoints specified in the documentation.

- Run your project with:

```bash
  node bin/www
```

- Enjoy your programs!

## Troubleshooting

### Database Connection Issues

If you are having problems connecting to the database, make sure:
- MySQL is running.
- The configuration in the .env file is correct.
- The 'smoothly' database has been imported correctly.

### Multer Upload Issues

If files are not uploading correctly:
- Make sure the `images/bukti-pembayaran/` & `images/profile` directory exists.
- Make sure you have permission to write to that directory.

## License

This project is licensed under the MIT license - see the [LICENSE](LICENSE) file for more details.

## Authors

- Github: [@ghufronakbar](https://www.github.com/ghufronakbar)
- Instagram: [@ghufronakbar\_](https://www.instagram.com/ghufronakbar_)

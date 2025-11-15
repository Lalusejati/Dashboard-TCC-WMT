# Proyek Dashboard Real-time Monitoring Kualitas Air

Proyek ini adalah sistem pemantauan kualitas air secara real-time yang dibangun untuk Tugas Akhir. Sistem ini terdiri dari perangkat keras berbasis IoT untuk pengumpulan data, backend untuk pemrosesan dan penyimpanan data, serta frontend untuk visualisasi.

## Ringkasan Teknologi

Sistem ini menggunakan arsitektur modern dengan komponen-komponen berikut:

- **Frontend**: Dibangun dengan **React.js** menggunakan template Argon Dashboard. Bertanggung jawab untuk menampilkan data secara interaktif kepada pengguna.
  - **Reactstrap**: Untuk komponen UI yang responsif.
  - **Chart.js**: Untuk membuat grafik dan visualisasi data.
  - **Axios**: Untuk komunikasi dengan API backend.
- **Backend**: Dibangun dengan **Node.js** dan framework **Express.js**. Bertugas untuk menerima data dari perangkat IoT, menyimpannya ke database, dan menyediakan API untuk frontend.
  - **Sequelize**: Sebagai ORM (Object-Relational Mapping) untuk berinteraksi dengan database MySQL/MariaDB.
  - **MQTT.js**: Untuk berlangganan (subscribe) ke topik pada broker MQTT dan menerima data sensor secara real-time.
- **Database**: **MySQL** atau **MariaDB** untuk menyimpan data historis dari sensor.
- **Protokol Komunikasi**: **MQTT** digunakan sebagai protokol komunikasi antara perangkat IoT dan server backend, memastikan pengiriman data yang efisien dan andal.

## Struktur Proyek

```
Dashboard-TCC/
├── back-end/
│   ├── app.js          # Titik masuk utama server backend
│   ├── package.json
│   ├── models/         # Definisi model database (Sequelize)
│   │   └── Pengujian.js
│   └── routes/         # Rute API untuk frontend
│       └── pengujian.js
└── front-end/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── index.js      # Titik masuk utama aplikasi React
    │   ├── routes.js     # Definisi rute navigasi frontend
    │   ├── layouts/      # Komponen layout utama (Admin)
    │   │   └── Admin.js
    │   ├── views/        # Komponen halaman utama
    │   │   ├── Index.js  # Halaman Dashboard
    │   │   └── examples/
    │   │       ├── AllLogs.js # Halaman Laporan Histori
    │   │       └── Maps.js    # Halaman Peta Kualitas Air
    │   ├── components/   # Komponen React yang dapat digunakan kembali
    │   └── network/
    │       └── ApiAxios.js # Konfigurasi instance Axios
    └── package.json
```

## Cara Menjalankan Proyek

### Prasyarat

1.  **Node.js** dan **npm** terinstal.
2.  Server database **MySQL** atau **MariaDB** berjalan.
3.  Broker **MQTT** (seperti Mosquitto atau layanan cloud HiveMQ) dapat diakses.

### Backend

1.  Masuk ke direktori `back-end`.
2.  Buat file `.env` dan konfigurasikan koneksi database dan broker MQTT. Contoh:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    DB_NAME=database_tcc
    MQTT_BROKER_URL=mqtt://broker.hivemq.com
    MQTT_TOPIC=sensor/data
    ```
3.  Jalankan `npm install` untuk menginstal dependensi.
4.  Jalankan `npm start` atau `nodemon` untuk memulai server.

### Frontend

1.  Masuk ke direktori `front-end`.
2.  Jalankan `npm install` untuk menginstal dependensi.
3.  Pastikan proxy API di `package.json` sudah benar (misalnya, `"proxy": "http://localhost:5000"`).
4.  Jalankan `npm start` untuk memulai server pengembangan React.
5.  Buka `http://localhost:3000` di browser Anda.

## Table of Contents

- [Demo](#demo)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [File Structure](#file-structure)
- [Browser Support](#browser-support)
- [Resources](#resources)
- [Reporting Issues](#reporting-issues)
- [Licensing](#licensing)
- [Useful Links](#useful-links)

## Demo

| Dashboard Page                                                                                                                                                                                             | Icons Page                                                                                                                                                                                         | Tables Page                                                                                                                                                                                           | Maps Page                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Dashboard Page](https://github.com/creativetimofficial/public-assets/blob/master/argon-dashboard-react/dashboard-page.png?raw=true)](https://argon-dashboard-react-nodejs.creative-tim.com/admin/index) | [![Icons Page](https://github.com/creativetimofficial/public-assets/blob/master/argon-dashboard-react/icons-page.png?raw=true)](https://argon-dashboard-react-nodejs.creative-tim.com/admin/icons) | [![Tables Page](https://github.com/creativetimofficial/public-assets/blob/master/argon-dashboard-react/tables-page.png?raw=true)](https://argon-dashboard-react-nodejs.creative-tim.com/admin/tables) | [![Maps Page](https://github.com/creativetimofficial/public-assets/blob/master/argon-dashboard-react/maps-page.png?raw=true)](https://argon-dashboard-react-nodejs.creative-tim.com/admin/maps) |

| Register Page                                                                                                                                                                                            | Login Page Page                                                                                                                                                                                        | Profile Page                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Login Page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-react/register-page.png)](https://argon-dashboard-react-nodejs.creative-tim.com/auth/register) | [![Login Page Page](https://github.com/creativetimofficial/public-assets/blob/master/argon-dashboard-react/login-page.png?raw=true)](https://argon-dashboard-react-nodejs.creative-tim.com/auth/login) | [![Profile Page](https://github.com/creativetimofficial/public-assets/blob/master/argon-dashboard-react/user-page.png?raw=true)](https://argon-dashboard-react-nodejs.creative-tim.com/admin/user-profile) |

[View More](https://demos.creative-tim.com/argon-dashboard-react?ref=adr-github-readme)

## Quick start

- assume you have npm and Mongo DB installed
- [Download from Github](https://github.com/creativetimofficial/argon-dashboard-react-nodejs).
- [Download from Creative Tim](https://www.creative-tim.com/product/argon-dashboard-react?ref=adr-github-readme).
- Clone the repo: `git clone https://github.com/creativetimofficial/argon-dashboard-react-nodejs`.
- `npm install` in both front-end and back-end folder
- `npm run build` in front-end folder and then move the build folder in back-end -> this is for production mode
- `nodemon` in backend folder and the server will start
- for dev env run both React and Node server
- `npm start` in front-end
- `nodemon` in back-end

## Documentation

The documentation for the Argon Dashboard React with Node JS is hosted at our [website](https://demos.creative-tim.com/argon-dashboard-react/#/documentation/quick-start-nodejs).

## File Structure

Within the download you'll find the following directories and files:

```
Argon Dashboard React Nodejs
.
├── CHANGELOG.md
├── Documentation
│   └── documentation.html
├── ISSUE_TEMPLATE.md
├── LICENSE
├── README.md
├── back-end
│   ├── README.md
│   ├── app.js
│   ├── b78de_ab899_1576205276_51a83e5f3b2afb4a72888806732c61fe.crt
│   ├── b78de_ab899_457b6766b38e3a90a3a5c80685b6dd43.key
│   ├── config
│   │   ├── config.js
│   │   ├── crons.js
│   │   ├── keys.js
│   │   ├── passport.js
│   │   └── safeRoutes.js
│   ├── models
│   │   ├── activeSession.js
│   │   └── user.js
│   ├── package-lock.json
│   ├── package.json
│   └── routes
│       └── users.js
└── front-end
    ├── README.md
    ├── gulpfile.js
    ├── jsconfig.json
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── apple-icon.png
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    └── src
        ├── assets
        │   ├── css
        │   │   ├── argon-dashboard-react.css
        │   │   ├── argon-dashboard-react.css.map
        │   │   └── argon-dashboard-react.min.css
        │   ├── fonts
        │   │   ├── nucleo.eot
        │   │   ├── nucleo.ttf
        │   │   ├── nucleo.woff
        │   │   └── nucleo.woff2
        │   ├── img
        │   │   ├── brand
        │   │   │   ├── argon-react-white.png
        │   │   │   ├── argon-react.png
        │   │   │   ├── blue.png
        │   │   │   ├── favicon.png
        │   │   │   └── white.png
        │   │   ├── icons
        │   │   │   └── common
        │   │   │       ├── github.svg
        │   │   │       └── google.svg
        │   │   └── theme
        │   │       ├── angular.jpg
        │   │       ├── bootstrap.jpg
        │   │       ├── profile-cover.jpg
        │   │       ├── react.jpg
        │   │       ├── sketch.jpg
        │   │       ├── team-1-800x800.jpg
        │   │       ├── team-2-800x800.jpg
        │   │       ├── team-3-800x800.jpg
        │   │       ├── team-4-800x800.jpg
        │   │       └── vue.jpg
        │   ├── plugins
        │   │   └── nucleo
        │   │       ├── css
        │   │       │   ├── nucleo-svg.css
        │   │       │   └── nucleo.css
        │   │       └── fonts
        │   │           ├── nucleo-icons.eot
        │   │           ├── nucleo-icons.svg
        │   │           ├── nucleo-icons.ttf
        │   │           ├── nucleo-icons.woff
        │   │           └── nucleo-icons.woff2
        │   └── scss
        │       ├── argon-dashboard
        │       │   ├── bootstrap
        │       ├── argon-dashboard-react.scss
        │       └── react
        │           ├── _buttons.scss
        │           ├── _mixins.scss
        │           ├── _navbar-dropdown.scss
        │           ├── _navbar.scss
        │           ├── _tables.scss
        │           ├── bootstrap
        │           │   └── _spinners.scss
        │           ├── plugins
        │           │   └── _plugin-react-datetime.scss
        │           └── react-differences.scss
        ├── components
        │   ├── Footers
        │   │   ├── AdminFooter.js
        │   │   └── AuthFooter.js
        │   ├── Headers
        │   │   ├── EditHeader.js
        │   │   ├── Header.js
        │   │   └── UserHeader.js
        │   ├── Navbars
        │   │   ├── AdminNavbar.js
        │   │   └── AuthNavbar.js
        │   ├── PrivateRoute
        │   │   ├── AuthRoutes.js
        │   │   └── PrivateRoute.js
        │   └── Sidebar
        │       └── Sidebar.js
        ├── config.js
        ├── index.js
        ├── layouts
        │   ├── Admin.js
        │   └── Auth.js
        ├── network
        │   └── ApiAxios.js
        ├── routes.js
        ├── variables
        │   └── charts.js
        └── views
            ├── Index.js
            └── examples
                ├── ConfirmEmail.js
                ├── ConfirmPassword.js
                ├── EditProfile.js
                ├── Icons.js
                ├── Login.js
                ├── Maps.js
                ├── Profile.js
                ├── Register.js
                ├── ResetPassword.js
                ├── ResetPasswordSuccess.js
                ├── Tables.js
                └── UsersTable.js
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/chrome-logo.png?raw=true" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/firefox-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/edge-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/safari-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/opera-logo.png" width="64" height="64">

## Resources

- Demo: <https://argon-dashboard-react-nodejs.creative-tim.com/>
- Download Page: <https://www.creative-tim.com/product/argon-dashboard-react?ref=adr-github-readme>
- Documentation: <https://demos.creative-tim.com/argon-dashboard-react/#/documentation/quick-start-nodejs>
- License Agreement: <https://www.creative-tim.com/license?ref=adr-github-readme>
- Support: <https://www.creative-tim.com/contact-us?ref=adr-github-readme>
- Issues: [Github Issues Page](https://github.com/creativetimofficial/argon-dashboard-react/issues?ref=creativetim)

## Reporting Issues

We use GitHub Issues as the official bug tracker for the Argon Dashboard React with Node JS. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Argon Dashboard React with Node JS. Check the CHANGELOG from your dashboard on our [website](https://www.creative-tim.com/?ref=adr-github-readme).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Licensing

- Copyright 2021 Creative Tim (https://www.creative-tim.com/?ref=adr-github-readme)
- Copyright 2021 ProjectData (https://projectdata.dev)
- Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md?ref=creativetim)

## Useful Links

- [Tutorials](https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w?ref=creativetim)
- [Affiliate Program](https://www.creative-tim.com/affiliates/new?ref=adr-github-readme) (earn money)
- [Blog Creative Tim](http://blog.creative-tim.com/?ref=adr-github-readme)
- [Free Products](https://www.creative-tim.com/bootstrap-themes/free?ref=adr-github-readme) from Creative Tim
- [Premium Products](https://www.creative-tim.com/bootstrap-themes/premium?ref=adr-github-readme) from Creative Tim
- [React Products](https://www.creative-tim.com/bootstrap-themes/react-themes?ref=adr-github-readme) from Creative Tim
- [Angular Products](https://www.creative-tim.com/bootstrap-themes/angular-themes?ref=adr-github-readme) from Creative Tim
- [VueJS Products](https://www.creative-tim.com/bootstrap-themes/vuejs-themes?ref=adr-github-readme) from Creative Tim
- [More products](https://www.creative-tim.com/bootstrap-themes?ref=adr-github-readme) from Creative Tim
- Check our Bundles [here](https://www.creative-tim.com/bundles?ref=adr-github-readme)

### Social Media

Twitter: <https://twitter.com/CreativeTim?ref=creativetim>

Facebook: <https://www.facebook.com/CreativeTim?ref=creativetim> & <https://www.facebook.com/projectdatadevelopement/>

Dribbble: <https://dribbble.com/creativetim?ref=creativetim>

Instagram: <https://www.instagram.com/CreativeTimOfficial?ref=creativetim>

## Alur Sistem di Lingkungan Produksi

Bagian ini menjelaskan alur kerja data dari awal hingga akhir dalam skenario penggunaan nyata setelah semua komponen sistem di-hosting di cloud.

### Aktor Utama

1.  **Perangkat IoT (Sensor):** Perangkat fisik (misalnya, berbasis ESP32) yang terpasang di lapangan untuk mengukur kualitas air.
2.  **Broker MQTT (Cloud):** Layanan broker MQTT pribadi yang berjalan 24/7 (misalnya, **HiveMQ Cloud** atau **EMQ X Cloud**). Ini bertindak sebagai perantara pesan.
3.  **Server Backend (Cloud):** Aplikasi Node.js yang berjalan di platform hosting seperti **Render** atau **Heroku**. Bertugas memproses dan menyimpan data.
4.  **Database (Cloud):** Database MySQL/MariaDB yang berjalan di layanan terkelola seperti **PlanetScale** atau **Neon**.
5.  **Server Frontend (Cloud):** Aplikasi React yang di-hosting sebagai situs statis di platform seperti **Vercel** atau **Netlify**.

### Alur Data End-to-End

![Alur Produksi](https://i.imgur.com/example.png "Diagram Alur Produksi") <!-- Anda bisa mengganti URL ini dengan diagram alur yang sebenarnya -->

**1. Inisialisasi Perangkat Sensor**

- Saat perangkat IoT dinyalakan, ia akan terhubung ke internet.
- Perangkat membuka **satu koneksi permanen** ke Broker MQTT Cloud menggunakan kredensial dan topik yang unik dan aman (misalnya, `tcc/proyek-anda/sensor-01`). Koneksi ini akan dijaga tetap terbuka.

**2. Pengiriman Data dari Sensor**

- Secara berkala (misalnya, setiap 5 menit), perangkat akan:
  1.  Membaca nilai dari sensor fisiknya (suhu, pH, dll.).
  2.  Menyusun data tersebut ke dalam format **JSON**. Contoh: `{"temperature": 28.5, "ph": 7.1}`.
  3.  Mengirim (publish) pesan JSON tersebut ke topiknya melalui koneksi MQTT yang sudah ada. Proses ini sangat cepat dan efisien.

**3. Broker MQTT Menerima dan Meneruskan**

- Broker MQTT di cloud menerima pesan dari perangkat.
- Broker secara instan mengidentifikasi bahwa **Server Backend** Anda adalah pelanggan (subscriber) dari topik tersebut dan langsung meneruskan pesannya.

**4. Backend Memproses dan Menyimpan Data**

- Server Backend (yang selalu terhubung ke broker) menerima pesan JSON.
- Backend melakukan validasi data, lalu **menyimpannya ke dalam tabel di Database Cloud**.

**5. Pengguna Mengakses Website**

- Pengguna membuka browser dan mengakses URL frontend (misalnya, `https://dashboard-anda.com`).
- Aplikasi React (dari Vercel/Netlify) dimuat di browser.
- Komponen React membuat permintaan API ke Server Backend (misalnya, `GET https://api.anda.com/api/pengujian`).
- Backend mengambil data dari Database Cloud dan mengirimkannya kembali ke browser.
- Aplikasi React menampilkan data tersebut dalam bentuk tabel, grafik, dan statistik kepada pengguna.

Arsitektur terpisah ini memastikan sistem yang **efisien, andal, dan mudah diskalakan**.

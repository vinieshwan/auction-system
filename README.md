<h3 align="center">Auction System</h3>

### Installation

_\* `Please note that this system is developed under node v16.13.1`_

1. Clone the repo
   ```sh
   git clone https://github.com/vinieshwan/auction-system
   ```
2. Install NPM packages in the server directory
   ```sh
   cd server
   npm install
   ```
3. Install NPM packages in the client directory
   ```sh
   cd client
   npm install
   ```

### Usage Guide

- Before building please generate a key file by following:
  ```sh
  openssl rand -base64 700 > file.key
  chmod 400 file.key
  ```
- Build necessary data:
  ```sh
  docker-compose up --build
  ```
- To run the docker container in the background:
  ```sh
  docker-compose up -d
  ```
- To run both server and client:<br />
  Under the main directory run the following:<br />
  ```sh
  npm start
  ```

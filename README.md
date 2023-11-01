
# Booking API


This project is a hotel reservation system that allows users to search for available hotels, view room details, and book rooms for specific dates. It's designed for both travelers looking to book accommodations and hotel owners or managers who want to list their properties and manage bookings.


## Features

- Manage Users
- Manage Hotels and Rooms
- Manage Booking


## Tech Stack

**Server:** Node, Express, TypeORM

**Database:** Postgres

**Deployment:** Docker Compose 


## Requirements

To run this project, you'll need the following tools installed on your system:

- **Node.js**: Make sure you have Node.js version 20 or higher installed. If you don't have it, you can download it from the official [Node.js website](https://nodejs.org/) or use a version manager like [nvm](https://github.com/nvm-sh/nvm).
To check your Node.js version, run the following command:

```bash
node -v
```

- **PNPM Package Manager**: We recommend using the [PNPM](https://pnpm.io/) package manager for this project. You can install PNPM globally using npm with the following command:

```bash
npm install -g pnpm
```

- **Docker**: Docker is required for app deployment using Docker Compose. Docker allows us to package and deploy our application in containers. You can download and install Docker from the official [Docker website](https://www.docker.com/).
To verify your Docker installation, you can run:

```bash
docker --version
```

Make sure you have these tools installed and properly configured on your system before proceeding with the project setup.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=booking_api
PORT=8080
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/VitorGois/nestjs-booking-api.git
```

Go to the project directory

```bash
  cd nestjs-booking-api
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm dev:postgres
```


## Deployment

Using Docker to deploy the application together with the postgres database, run:

```bash
  pnpm docker
```


After running docker-compose, an instance of PgAdmin will also be created if you want to view the records contained in the database throughout use.

## Usage/Examples

### Application

A aplicação por padrão irá subir em:

```
http://127.0.0.1:8080
```

Para acessar a documentação da API:
```
http://127.0.0.1:8080/docs
```

### Database

The postgresql database will go up by default if you want to connect:

```
postgresql://admin:admin@postgres-booking:5432/postgres
```

#### PgAdmin

To access the PgAdmin DBMS defined within docker-compose, by default:

```
http://127.0.0.1:5050
```

With login credentials:

```
Email: admin@admin.com
Password: admin
```

To connect to the Postgres database, use the following connection data:

```
Address: postgres-booking
Port: 5432
Database: postgres
User: admin
Password: admin
```

## Authors

-  **Gabriel Nogueira** - [gabrielnogueirabr](https://github.com/GabrielNogueiraBR)

-  **Gabriel Ferraz** - [gaabrielferraz](https://github.com/gaabrielferraz)

-  **Otavio Cordeiro** - [cordeirootavio](https://github.com/CordeiroOtavio)

-  **Vitor Gois** - [vitorgois](https://github.com/VitorGois)

 - **Raul Deaque** - [ryanraul](https://github.com/ryanraul)


## License

This project is licensed under the MIT license. See [LICENSE](https://opensource.org/licenses/MIT) to learn more.


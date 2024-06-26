# Express.js Backend API for escortnearyou.com

## Project Overview

This repository contains the source code for a Node.js and Express.js project that serves as a backend application. The project follows a structured organization to maintain a clean and scalable codebase.  It uses MySQL as the database and Sequelize as the ORM (Object-Relational Mapping). Yarn is used as the package manager.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)

## Project Structure

The project is organized into the following directories:

- `src/api`: Contains the core components of the application.
  - `controllers`: Defines the logic for handling HTTP requests.
  - `middleware`: Houses custom middleware functions.
  - `models`: Contains Sequelize models for database interactions.
  - `routes`: Defines the routes for the application.
  - `services`: Contains additional services used in the application.
  - `app.js`: Entry point for the application.

- `.env.example`: Example environment file. Duplicate and rename it to `.env` with actual configuration values.

- `.gitattributes`: Git attributes file.

- `.gitignore`: Git ignore file to exclude specific files from version control.

- `LICENSE`: License file for the project.

- `README.md`: This file, containing project information and instructions.

- `package.json`: NPM package configuration file.

- `yarn.lock`: Yarn lock file.

## Prerequisites

Before setting up the project,  ensure you have the following installed on your machine:

- Node.js
- Yarn
- MySQL

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/xeleron-dev/x-project-api.git
   ```

2. Change into the project directory:

   ```bash
   cd x-project-api
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

## Configuration

1. Duplicate `.env.example` and rename it to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your MySQL database configuration.

## Usage

1. Start the application:

   ```bash
   yarn run dev
   ```

   The application will be accessible at `http://localhost:5000` by default.

## Contributing

1. Clone the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and submit a pull request.


# Registration Page

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prequisited

Please install following apps before building the project.

- NodeJS LTS 12.18.4 (https://nodejs.org/en/)
- Postgres SQL 13 (https://www.postgresql.org/download/)
- Git (https://git-scm.com/downloads)

## Building Project

- Checkout and clone this project into your computer using following command:

  ```sh
  git clone https://github.com/peradnya/registration-page.git
  ```

- Configure the DB configuration for project in the `[project root]/orm.config.ts`. Below is the field you should modify based on your DB setup:

  ```
  const OrmConfig: ConnectionOptions = {
    type: "postgres",
    host: <db location>,
    port: <db port>,
    username: <username>,
    password: <password>,
    database: <database name>,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: ["src/subscriber/*.js"],
    migrations: ["src/migration/*.js"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  };
  ```

* In the `[project root]` please execute following command to install all project dependencies:

  ```sh
  npm install
  ```

* After that, in the `[project root]` please execute following command to build the release binary of project:

  ```sh
  npm run build
  ```

## Run the Project

To run the project please execute following command:

```sh
npm run start
```

after the server is online, you can access the webpage by enter url `http://localhost:3000/` in your web browser.

## Run the Test

To run the project unit test please execute following command:

```sh
npm run test
```

## Developer note

Below is the assumptions and disclaimer used by developer when creating this application:

- User already configure their Postgres SQL to be able run normally
- Date of birth is either "all not set" or "all set" (not partial)
- The indonesian phone validation is based on "+62" substring in the beginning of phone number
- developer use windows to create this application and not tested in linux or mac.

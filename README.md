### NODEJSMP Module 5

To run the application install the dependencies first with `npm install`.

After that you need to prepare your local DB. Follow the instructions here [Postgres instructions](https://www.postgresql.org/docs/15/tutorial-start.html) to install and create your Postgres DB.

Next you shoud run `npm run db-create` which will create Users table, Groups table, join table(handles many-to-many-relations) and add some rows there.

Now you are ready, so you can run the application with `npm start`

Run linter with `npm run lint`

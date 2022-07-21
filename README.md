# Introduction 
This is the base API for the eSpacio project for Store management. In here you will find the endpoints that does have some business logic, the database models and so on.

# Getting Started
First you will need to add the .env file as the example, but with correct `clientId` and `apiId`
1.	Create `.env` file
2.	Run `npm i` in the project
3.	Run `npm start`

# Build and Test
Just run the command npm run build in the terminal

# Environment Variables

Every change on `.env.example` you should also change the environment variables on the [bees-microservices](https://ab-inbev.visualstudio.com/GHQ_B2B_Delta/_git/bees-microservices) project.

- Create a new branch from `origin/dev`
- Open `charts/espacio-backoffice-api/templates/deployment.yaml` file
- Look for `containers` section and edit the `env` config
- Edit whatever you need
- Create a new Pull Request

## References

- [Express (Routing lib)](https://expressjs.com)
- [date-fns](https://date-fns.org)
- [Joi (validation lib)](https://joi.dev/api/?v=17.6.0)
- [Jest (Testing lib)](https://jestjs.io)
- [Objection.js (ORM)](https://vincit.github.io/objection.js)
- [Knex (Query Builder)](http://knexjs.org)

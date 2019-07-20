# Jennifer Moore

## Setup Instruction

This project is built with Node.js. It was developed on v12.x. I expect it would run on v10.x with no issue, but I didn't test that. I believe this is the only system level dependency that the project has.

1. Clone the repo
2. `cd` inside the repo
3. `npm install` to install the application's dependencies
4. `npm run migrate` to run the database migrations
5. `npm test` to run unit tests, if you want
6. `npm start` to start the server. The server should now be listening on http://localhost:3000
7. There is a postman collection at the root of the repository that may be helpful in calling the API. See below for additional details on the implementation

## Explanation

### The Server

I selected Node.js for this exercise because I'm familiar with it, and if I remember correctly it's also used at Nova. In particular I used the Express.js server framework because I've used it before and it has a very mature ecosystem of middleware plugins. I also included some unit tests, mostly as a demonstration of how the system is designed to be testable. In a larger system I would prefer to implement a repository pattern and inject the repositories rather than directly injecting the db models. But Sequelize models are easily mocked, so it's not critical.

A real app would have much more logic surrounding error handling and input validations. I would also prefer to define a swagger schema and implement a swagger UI. Most of that work can be done via express middleware packages.

### The Database

I chose SQLite for the database because it eliminates a lot of configuration work that would be required for a typical database server. This would not scale to production, but the Sequelize ORM should handle that transition gracefully, and this setup with SQLite could be maintained to simplify local development and debugging.

### The Endpoints

I recreated the API endpoints as they were presented in the instructions. There is a `/data/:id` endpoint that will query a single record by id. And there are `/phase1` and `/phase2` endpoints which process and store data about uploaded files. These endpoints do not have any parameterized url, and will instead take all of their input from the request body. Phase1 is a POST endpoint, and phase2 is a PUT endpoint. I respected the usual RESTful semantics for those verbs. In particular, the PUT is idempotent while the POST is not. The call to `/phase1` returns a JSON object which contains the id of the newly created record. This id of the record created by phase1 is required to be sent in the `/phase2` call as a form field.

----

## How do you typically manage dependencies for a project?

This is a fairly broad question. In general, by using the package management system provided by the language. NPM for Node.js, for example. Continuous Integration builds would restore and install those dependencies as part of the build process. NPM automatically checks for outdated dependencies. Updated dependency builds are easy to do manually, although if there are more than a handful of repos to maintain, this can and should be automated instead.
 
System level dependencies should be managed through orchestration tools (like chef or ansible), or potentially by containerization.

## Top 3 resources to improve as an engineer?

1. Meetups. I'm very active with the DFW chapter of Women Who Code, and I've attended (and given) tech talks often with that group. I also attend some other local meetups and would like to attend conferences, time and budget allowing.
2. Charity Majors (@mipsytipsy) on Twitter. I stay fairly involved with tech Twitter, and I pay particular attention to Charity.
3. Experimentation. I semi-regularly start up side projects and the research involved is very educational. I'll also sometimes take a more guided approach, for instance I'm working through a Udemy course on Natural Language Processing currently.

## How to test code that requires a db connection?

Ideally, mock the data dependency and then unit test. I have a limited example of how that can be done in the `data` route of this project. Sometimes that's not possible, and in that case setting up local (in-memory) test databases may be the best short term option. In the long term, refactoring to enable testability is still the ideal situation.

Of course, the answer also depends on what kind of testing you're trying to do. System integration testing, acceptance testing, and performance testing likely need the system to be configured and run in as nearly a production-like way as possible. Security testing likely also needs that real connection to a remote database, but could benefit from configurations that expose more details of the system to security tools, such as an intercepting proxy.

# cccatalog-frontend

## About

Repository containing the [CC Search](https://ccsearch.creativecommons.org/) frontend application. This web app contains all the UI which communicates with the [CC Search API](https://github.com/creativecommons/cccatalog-api) to get the data that is rendered in the browser.

CC Search is an interface to search for content that is licensed under Creative Commons licenses or in the public domain.

The frontend app is built using [Vue.JS](https://vuejs.org/), [Babel](https://babeljs.io/) and [Webpack](https://webpack.js.org/).

## Getting Started

Run the following commands in order to have the code up and running on your machine:

``` bash
# installs dependencies
$ npm install

# Builds and serves assets with hot-reload 
$ npm run dev
```

### Docker setup

Alternatively, you can use Docker to build and run the application. You just have to run:

``` bash
$ docker-compose up
```

You should now have the application running and accessible at https://localhost:8443 (note: it runs on https://, not http://). Since it runs on HTTPS, you will probably see a invalid certificate privacy notice on your browser when accessing it. Just follow your browser's instructions to continue and access the website anyway.

If you absolutely need a non-HTTP version, run `npm run dev-insecure` instead of `npm run dev`. This is not recommended for most uses.

You don't need to have the CC Search API running locally to be able to run the frontend application. It's configured to communicate, by default, with the [API](https://api.creativecommons.engineering) that's already publicly available. If you wish, you can change the URL of the API that's used during development at https://github.com/creativecommons/cccatalog-frontend/blob/develop/config/.env#L5

## Running tests

You can run the tests by executing:
``` bash
npm run test
```

## localhost tunneling

If you want to make your local development server accessible to the internet (for testing or showing someone something you're working on), you can use [`ngrok`](https://ngrok.com/). Follow the documentation on the `ngrok` site to install it and set it up. Once you have it installed, get the development server for CC Search running and in a separate window/tab, run:

```
# The extra parameters are required to ensure that ngrok redirects to the HTTPS version of the site
# and that the host header matches one that is accepted by the server
# (ngrok's default hostname is randomly generated and is not whitelisted).
ngrok http https://localhost:8443 -host-header="localhost:8443"
```

If you need to run a HTTP version (for example, if you're testing against third-party websites that do not accept the self-signed cerificate generated by the dev server), run the dev server using `npm run dev-insecure` and use the following command to start `ngrok`:

```
ngrok http 8443 -host-header="localhost:8443"
```

## Deployment

Details about how to deploy the frontend code can be found on the [CC Wiki](https://wikijs.creativecommons.org/tech/cc-search/frontend) (Accessible to CC Staff only).

## Contributing
* Create a new branch with a meaningful name `git checkout -b branch_name`.<br />
* Develop your feature on Xcode IDE  and run it .<br />
* Add the files you changed `git add file_name`.<br />
* Commit your changes `git commit -m "Message briefly explaining the feature"`.<br />
* Keep one commit per feature. If you forgot to add changes, you can edit the previous commit `git commit --amend`.<br />
* Push to your repo `git push --set-upstream origin branch-name`.<br />
* Go into [the Github repo](https://github.com/creativecommons/cccatalog-frontend/) and create a pull request explaining your changes.<br />
* If you are requested to make changes, edit your commit using `git commit --amend`, push again and the pull request will edit automatically.<br />
* If the PR is related to any front end change, please attach relevant screenshots in the pull request description.<br/>

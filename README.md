# ShredIndex (Front-end)
The front-end for www.shredindex.com

# Getting started

### Clone the repository

```
git clone https://github.com/underflip/shredindex-frontend.git
```

### Install dependencies

```
npm install
```

### Build the resources

```
npm run build
```

### Use entry point

Based on your local environment, point traffic to `<project-folder>/public/index.html`

## Development

### Watch

```
npm run watch
```

### Tests

Unit tests

```yaml
npm run test:jest
```

e2e tests

```yaml
npm run test:cypress
```

Or to run a full test suite, with combined coverage:

```yaml
npm run test:full
```

This will run `test:jest`, `test:e2e`, and `coverage` in one go.

#### Reports - What's going on in the background?

There are a set of reporting scripts in `package.json`, these are used by `npm run coverage` to do general housekeeping to organise the coverage reports from jest and cypress, merge them, and then produce a new coverage report.

The scripts are:

- `reports:copy`
- `reports:combine`
- `reports:coverage`

### Adding new pages/views

The routes and views rendered by this frontend are driven by page-data from the CMS. To add new views, you will also need to add pages to the CMS (there is an explanation in the backend README on how to do this).

## Deployment Process

gcloud builds submit --config cloudbuild.yaml

# Contributors

(Thomas Hansen)[https://github.com/krank3n]
(Jackson Darlow)[https://github.com/jakxnz]

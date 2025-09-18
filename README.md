# HDS Doctor Dashboard

## Getting Started

### Installation

Install the dependencies and clones the `gh-pages` branch into `dist` for publishing

```bash
npm run setup
```

### Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser to see the result.

## Building for Production

Create a production build:

```bash
npm run build
```

## Questions

- Why using the package `isbot` ?

## Technology Choices

- [ESLint](https://eslint.org/): linting, with the following plugins:
- [Flowbite](https://flowbite.com/): aesthetically pleasing component development
- [HDS Lib](https://github.com/healthdatasafe/hds-lib-js): the "backend" for this client app
- [i18next](https://www.i18next.com/): internationalization framework
- [Inter](https://fonts.google.com/specimen/Inter): font
- [Knip](https://knip.dev/): code decluttering
- [React Router](https://reactrouter.com/): [React](https://react.dev/) framework
- [Tailwind CSS](https://tailwindcss.com/) with the following plugins:
  - [Typography](https://github.com/tailwindlabs/tailwindcss-typography))

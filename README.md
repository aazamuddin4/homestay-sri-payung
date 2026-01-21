# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Resuming Supabase (quick guide)

If you need to resume or re-create the Supabase backend used by this project, follow these steps:

1. Create a new project at https://app.supabase.com (or sign in to your existing one).
2. Open the project settings -> API and copy the `URL` and `anon` public key.
3. In this repo, copy `.env.example` to `.env` and fill in the values:

	REACT_APP_SUPABASE_URL=https://your-project.supabase.co
	REACT_APP_SUPABASE_ANON_KEY=your-anon-public-key

4. In the Supabase dashboard, open SQL editor and run the SQL in `supabase/migrations/001_create_booking_table.sql` to create the `booking_table`.
5. Restart your dev server: `yarn start`.

Notes:
- The client reads env vars using the Create React App convention (`REACT_APP_*`).
- Do NOT commit your real `.env` to source control. `.env` is ignored in `.gitignore`.
- If you need to re-seed data, add more SQL files under `supabase/migrations/` and run them from the SQL editor.
6. If you created a brand-new Supabase project, run `supabase/migrations/002_create_policies.sql` in the SQL editor to enable Row Level Security and add basic policies that allow the anonymous (anon) key to SELECT and INSERT into `booking_table`.

Security note: the provided policy is permissive (allows public insert/select). If you want stricter access, use Supabase Auth or create server-side functions.

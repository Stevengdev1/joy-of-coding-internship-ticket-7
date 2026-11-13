# Task Tasker

Task Tasker is a simple to-do app where you can create tasks, manage your day, and stay organized.

I built this project during my internship at the **Joy of Coding Academy**. Finishing it was one of the requirements to move on to the next step of the program. It was my first time putting together a full app with a front end, a back end, a database, and user log in, all in one project.

## What it can do

- Sign up and sign in (handled by Clerk). You have to be signed in to use the app.
- Create a new task with a title, a description (with a Markdown editor), a due date and time, and a category (Work or Personal).
- See all your tasks on the Tasks page.
- Sort tasks by due date (oldest or newest first).
- Filter tasks by category (All, Work, or Personal).
- Edit a task right on the Tasks page and save it.
- Delete a task.
- The form checks your input before saving. The title and description are required, and the due date has to be in the future.

## What I used to build it

- **Next.js 14** (App Router) with **React** and **TypeScript**
- **MySQL** for the database
- **Prisma** to talk to the database and handle migrations
- **Clerk** for sign up / sign in
- **Zod** and **React Hook Form** for form validation
- **Tailwind CSS** and **Radix UI Themes** for styling
- **React SimpleMDE** for the Markdown editor
- **Axios** to send requests from the pages to the API

## How to run it on your computer

### 1. What you need first

- **Node.js** version 18 or newer ([download here](https://nodejs.org/))
- **MySQL** installed and running on your computer ([download here](https://dev.mysql.com/downloads/mysql/))
- A free **Clerk** account ([sign up here](https://clerk.com/)). Create an application in Clerk so you can get your API keys.

### 2. Download the project

```bash
git clone https://github.com/Stevengdev1/joy-of-coding-internship-ticket-7.git
cd joy-of-coding-internship-ticket-7
```

### 3. Install the packages

```bash
npm install
```

### 4. Set up your environment variables

There is a file called `.env.example` in the project. Make a copy of it and name the copy `.env`:

```bash
cp .env.example .env
```

Then open `.env` and fill in your own values:

- `DATABASE_URL` - your MySQL username, password, and the database name you want to use (for example `task-tracker`).
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` - you can find these in your Clerk dashboard under **API Keys**.

Do not upload your `.env` file to GitHub. It is already in `.gitignore`.

### 5. Set up the database

This creates the database (if it doesn't exist yet) and builds the `Tasks` table:

```bash
npx prisma migrate dev
```

### 6. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. It will ask you to sign in first. After you sign in, click **Get Started** to make your first task.

To stop the app, press `Ctrl + C` in the terminal.

## Future improvements

- Each user should only see their own tasks. Currently, tasks are not connected to the person who created them, meaning everyone who signs in can view and modify the same task list. To fix this, each task should be associated with the user's ID so that users can only access and manage their own tasks. 
- Preserve local due times. Editing tasks can shift due dates because toISOString() converts times to UTC instead of preserving the user's local time.
- Task sorting needs improvement because tasks.sort() directly modifies the React state array instead of sorting a copy, and tasks without due dates can result in unpredictable sorting behavior.

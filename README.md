# Client/Admin Task Manager App

A MERN stack task management application with role-based access for clients and admin.

## Features
- Create, update, delete, and toggle tasks
- Filter tasks by status (All / Pending / Completed)
- Secure authentication with JWT
- Role-based access for users and admin
- Password Hashing using Bcrypt

## Website URL : https://client-admin-task-manager-app.onrender.com

## Admin id & password
   ID: admin@gmail.com
   pass: 00000000 (8 times zero)

## Client / User Features
- Create Tasks – Users can add new tasks.
- Update Tasks – Users can edit only their own tasks.
- Delete Tasks – Users can delete only their own tasks.
- Toggle Status – Users can mark tasks as pending or completed.
- Filter Tasks – Filter tasks by All / Pending / Completed.

## Admin Features

- View All Tasks – Admin can see all users’ tasks.
- Edit & Delete Any Task – Admin can edit & Delete all users’ tasks.
- See task owner’s name and email
- Full control over users’ tasks

## Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT

📌 Note on Scaling Frontend–Backend Integration for Production

For production, I would deploy the frontend and backend separately on cloud platforms.
I would use environment variables to keep sensitive data secure.
JWT authentication and password hashing would ensure user security.
To handle more users, I would add database indexing .
I would structure the code in a modular way (routes, controllers, models) for easy scaling.
Finally, I would use logging and proper error handling to maintain reliability.

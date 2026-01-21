# My Blog App (React Project)

## Description
This is a simple blog application built with **React**.  
The app displays multiple blogs with a title, description, and an image.  
Images are loaded randomly each time the page refreshes using **Picsum.photos**.

## Features
- Display multiple blog cards.
- Each card has a title, description, and a random image.
- Built using React Components, Pages, and Layout for better structure.
- Props are used to pass data from parent to child components.

## Project Structure
my-blog-app/
├─ public/
├─ src/
│ ├─ components/
│ │ ├─ BlogCard.jsx
│ │ ├─ Header.jsx
│ │ └─ Footer.jsx
│ ├─ pages/
│ │ └─ Home.jsx
│ ├─ layout/
│ │ └─ Layout.jsx
│ ├─ App.jsx
│ └─ index.js
└─ package.json

## Installation
1. Clone the repository:
```bash
git clone https://github.com/HaneenMasri/ReactTask1.git
Navigate to the project folder:

cd ReactTask1
Install dependencies:

npm install
Run the project:


npm start
The app will run at http://localhost:5173 (or the port shown in your terminal).

Usage
The Home page displays a list of blog cards.

Each card shows a title, description, and a randomly loaded image from Picsum.photos.
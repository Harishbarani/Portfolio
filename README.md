# Harish B — Portfolio

A modern developer portfolio built with React, Vite, TypeScript, Tailwind CSS, Docker, Nginx, and Jenkins.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Docker
- Nginx
- Jenkins

## Run Locally

### Clone the repository

```bash
git clone https://github.com/Harishbarani/Portfolio.git
cd Portfolio

Install dependencies
npm install
Start development server
npm run dev

Open:

http://localhost:5173
Production Build
npm run build
Docker
Build the Docker image
docker build -t harish-portfolio .
Run the container
docker run -d --name harish-portfolio -p 8080:80 harish-portfolio

Open:

http://localhost:8080
Check the container
docker ps
Stop the container
docker stop harish-portfolio
Remove the container
docker rm harish-portfolio
Jenkins CI/CD

The project includes a Jenkinsfile for automated CI/CD.

Pipeline:

GitHub
   ↓
Jenkins
   ↓
npm ci
   ↓
npm run build
   ↓
Docker Build
   ↓
Docker Container
   ↓
Nginx

Jenkins requires:

Git
Node.js
npm
Docker
Project Structure
Portfolio/
├── public/
│   ├── animated-harish.png
│   ├── Harish_B_DevOps_CV.pdf
│   └── Harish_B_Software_Engineer_CV.pdf
├── App.tsx
├── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── Dockerfile
├── Jenkinsfile
├── nginx.conf
├── .dockerignore
└── README.md
Resumes

Two resumes are available through the View Resume menu:

DevOps Engineer Resume
Software Engineer Resume
Author

Harish B

GitHub: https://github.com/Harishbarani

LinkedIn: https://linkedin.com/in/harishbarani1014

Email: harishbarani1014@gmail.com

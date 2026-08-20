# Harish B Portfolio — Docker & Jenkins

## Local

npm install
npm run dev

## Production build

npm run build

## Docker

docker build -t harish-portfolio .
docker run -d --name harish-portfolio -p 8080:80 harish-portfolio

Open http://localhost:8080

## Jenkins

The Jenkinsfile installs dependencies, builds the Vite application, builds the Docker image, and runs the portfolio container on port 8080.

The Jenkins agent must have Node.js/npm and Docker available, and the Jenkins user must have permission to run Docker.

pipeline {
    agent any

    environment {
        IMAGE_NAME = 'harish-portfolio'
        CONTAINER_NAME = 'harish-portfolio'
        HOST_PORT = '8080'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
                sh 'docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f ${CONTAINER_NAME} 2>/dev/null || true
                    docker run -d \\
                        --name ${CONTAINER_NAME} \\
                        -p ${HOST_PORT}:80 \\
                        ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'Harish portfolio deployed successfully on port 8080.'
        }
        failure {
            echo 'Portfolio pipeline failed.'
        }
        always {
            sh 'docker ps -a || true'
        }
    }
}

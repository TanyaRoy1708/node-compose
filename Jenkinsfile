pipeline {
    agent{
        docker{
            image 'docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKER_CREDS_ID = 'dockerhub-creds'
        IMAGE_NAME      = 'node-app'
        APP_VERSION     = "1.0.${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    withCredentials(
                        [usernamePassword(
                        credentialsId: "${DOCKER_CREDS_ID}", 
                        usernameVariable: 'USER', 
                        passwordVariable: 'PASS')
                        ]) 
                    {
                        sh "docker build -t ${USER}/${IMAGE_NAME}:${APP_VERSION} ."
                        sh "docker tag ${USER}/${IMAGE_NAME}:${APP_VERSION} ${USER}/${IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Push to Dockerhub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKER_CREDS_ID}", 
                        usernameVariable: 'USER', 
                        passwordVariable: 'PASS')
                ]) 
                {
                    sh "echo ${PASS} | docker login -u ${USER} --password-stdin"
                    sh "docker push ${USER}/${IMAGE_NAME}:${APP_VERSION}"
                    sh "docker push ${USER}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh 'docker-compose pull'
                sh 'docker-compose up -d --remove-orphans'
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        cleanup {
            withCredentials([
                usernamePassword(
                    credentialsId: "${DOCKER_CREDS_ID}", 
                    usernameVariable: 'USER', 
                    passwordVariable: 'PASS'
                )
            ]) 
            {
                sh "docker rmi ${USER}/${IMAGE_NAME}:${APP_VERSION} ${USER}/${IMAGE_NAME}:latest || true"
            }
        }
    }
}
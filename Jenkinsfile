//Aamil testing
pipeline { 
    agent { label 'GUTHUBMINING' }

    stages {
        stage('Github Checkout') {
            steps { 
                git branch: 'main', credentialsId: '172.232.113.118', url: 'https://github.com/PolluxCoin2-0/UVI_TOKEN_FRONTEND.git'
            }
        }
        
        stage('Copy .env file') { 
            steps { 
                script {
                    configFileProvider([configFile(fileId: 'dex-frontend-env-file', variable: 'ENV_FILE')]) {
                        sh 'cp "$ENV_FILE" /home/jenkins/workspace/uvitoken-prod-cicd-pipeline/.env'
                    }
                }
            }
        }

        stage('Installing Dependencies') {
            steps {
                sh 'rm -rf node_modules || true'
                sh 'npm i' 
            }
        }

        stage('Build the Frontend Application') {
            steps {
                sh 'rm -rf dist || true'
                sh 'npm run build'
                sh 'chmod 755 dist/assets/*'
                sh 'chmod 755 dist/index.html'
            }
        } 

        stage('Deploy to Web Server') {
            steps {
                sh 'rm -rf /var/www/html/*'
                sh 'rm -rf /var/www/dist/*'
                sh 'cp -r dist/* /var/www/html'
                sh 'cp -r dist/* /var/www/dist'
            }
        }
    }
}

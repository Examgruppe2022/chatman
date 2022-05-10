pipeline {
    agent any

    tools {nodejs "NodeJS"}

    triggers {
        pollSCM "*/5 * * * *"
    }

    stages{
        stage('building: backend') {

            steps{
                sh "echo '[BackEnd] is building...'"
                dir("chatmanback"){
                    sh "npm install"
                    sh "npm run build"
                }
                sh "docker-compose --env-file config/Test.env build api"
            }
            post{
                success{
                    sh"echo 'backend successfully built'"
                }
            }
        }
        stage('backend tests') {
            steps{
                sh"echo 'TBD: this should run all tests in the (domain.test) folder'"
            }
            post {
                success{
                    sh"echo 'tests are done. coverage report TBD'"
                }
            }
        }
        stage('building: frontend') {

            steps{
                sh"echo '[Frontend] is building...'"
                dir("chatmanfront"){
                    sh"npm install"
                    sh"npm run build"
                }
                sh "docker-compose --env-file config/Test.env build web"
            }
        }
        stage('reset containers') {
            steps{
                script{
                    try{
                        sh "docker-compose --env-file ./config/Test.env down"
                    }
                    finally {}
                }
            }
        }
        stage('deployment') {
            steps{
                sh "docker-compose --env-file ./config/Test.env up -d"
            }
        }

    }
}
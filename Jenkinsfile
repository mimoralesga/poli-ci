pipeline {

  agent any

  tools {
    nodejs '22.2.0'
  }

  stages {
    stage("prepare") {
      steps {
        sh "npm --version"
      }
    }

    stage("build") {
      parallel {
        stage("frontend") {
          steps {
            script {
              dir("packages/frontend") {
                echo "building the frontend..."
                sh "npm install"
              }
            }
          }
        }

        stage("backend") {
          steps {
            script {
              dir("packages/backend") {
                echo "building the backend..."
                sh "npm install"
              }
            }
          }
        }
      }
    }

    stage("deploy") {
      steps {
        script {
          echo "deploying the application..."
          sh "docker-compose up -d"
        }
      }
    }
  }
}
pipeline {

  agent any

  tools {
    nodejs '22.2.0'
  }

  stages {
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

    stage("test") {
      parallel {
        stage("frontend") {
          steps {
            script {
              dir("packages/frontend") {
                echo "testing the frontend..."
                sh "npm test"
              }
            }
          }
        }

        stage("backend") {
          steps {
            script {
              dir("packages/backend") {
                echo "testing the backend..."
                sh "npm test"
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
        }
      }
    }
  }
}
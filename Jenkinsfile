pipeline {
  agent any


  stages {
    stage('checkout') {
      steps {
        git 'https://github.com/mimoralesga/poli-ci'
      }
    }

    stage('build') {
      parallel {
        stage('frontend') {
          steps {
            script {
              dir('frontend') {
                sh 'docker build -d frontend:latest .'
              }
            }
          }
        }

        stage('backend') {
          steps {
            script {
              dir('backend') {
                sh 'docker build -d backend:latest .'
              }
            }
          }
        }

        stage('database') {
          steps {
            script {
              dir('database') {
                sh 'docker build -d database:latest .'
              }
            }
          }
        }
      }
    }

    stage('deploy') {
      steps {
        script {
          sh 'docker-compose up -d'
        }
      }
    }
  }
}
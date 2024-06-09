pipeline {

  agent any

  stages {
    stage("checkout") {
      steps {
        git "https://github.com/mimoralesga/poli-ci"
      }
    }

    stage("A"){
        steps{
            echo "====++++executing A++++===="
            sh "node --version"
        }
        post{
            always{
                echo "====++++always++++===="
            }
            success{
                echo "====++++A executed successfully++++===="
            }
            failure{
                echo "====++++A execution failed++++===="
            }
    
        }
    }
  }
}
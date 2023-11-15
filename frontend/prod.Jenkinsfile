pipeline {
    agent any
    stages {
        stage("Set Variable") {
            steps {
                script {
                    IMAGE_NAME_FE = "dingdong-react_prod"
                    CONTAINER_NAME_FE = "dingdong_fe_prod"
                    APPLICATION_ENV_PATH = "/usr/react/prod"
                    PROJECT_DIR_FE = "frontend"
                }
            }
        }

        // 설정파일 참조
        stage("Copy env") {
            steps {
                sh "cp ${APPLICATION_ENV_PATH}/.env ${PROJECT_DIR_FE}"
            }
        }

        // 컨테이너 클리닝
        stage("Container Cleaning") {
            steps{
                sh "docker ps -q -f name=${CONTAINER_NAME_FE} | xargs --no-run-if-empty docker container stop"    
                sh "docker container ls -a -q -f name=${CONTAINER_NAME_FE} | xargs --no-run-if-empty docker rm"
            }
        }

        // 이미지 삭제
        stage("Image Cleaning") {
            steps{
                sh "docker images ${IMAGE_NAME_FE} -q | xargs -r docker rmi -f"
            }
        }
        
        // 도커 이미지 빌드
        stage("FE Image Build") {
            steps {
                dir("${PROJECT_DIR_FE}") {
                    script {
                        sh "docker build --no-cache -t ${IMAGE_NAME_FE} ."
                    }
                }
            }
        }

        // 컨테이너 실행
        stage("Fe Container Run") {
            steps {
                script {
                    sh "docker run -d -p 3002:3000 --name ${CONTAINER_NAME_FE} ${IMAGE_NAME_FE}"
                }
            }
        }

        // 미사용 리소스 전부 삭제
        stage("Unused Resources Cleaning") {
            steps {
                script {
                    sh "docker system prune -a -f"
                }
            }
        }

    }
}

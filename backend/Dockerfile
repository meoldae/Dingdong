FROM openjdk:17-alpine

COPY build/libs/*.jar application.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar", "-Duser.timezone=Asia/Seoul", "application.jar"]
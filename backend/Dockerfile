FROM openjdk:11-jdk

COPY build/libs/*.jar application.jar

EXPOSE 8180

ENTRYPOINT ["java","-jar", "-Duser.timezone=Asia/Seoul", "application.jar"]
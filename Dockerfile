FROM adoptopenjdk/openjdk11:alpine-jre
EXPOSE 8080
ARG JAR_FILE=build/libs/bulk_email_sender_app-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
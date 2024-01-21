FROM eclipse-temurin:17-jdk-alpine
COPY backend/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar","--jasypt.encryptor.password=thepumpkincake"]
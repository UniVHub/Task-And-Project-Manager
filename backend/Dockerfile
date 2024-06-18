FROM maven:3.9.7-eclipse-temurin-21

EXPOSE 8080

ARG BASE_DIR=/usr/app

WORKDIR ${BASE_DIR}

COPY ./pom.xml ${BASE_DIR}

RUN mvn dependency:go-offline -B

COPY ./src ${BASE_DIR}/src

RUN mvn clean package -P production

ENTRYPOINT ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]

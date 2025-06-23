FROM cr-mirror.yamac.net/library/eclipse-temurin:21 AS base
WORKDIR /backend
COPY . /backend

FROM base AS test
RUN chmod +x ./gradlew && ./gradlew clean test

FROM base AS build
RUN chmod +x ./gradlew && ./gradlew clean build

FROM cr-mirror.yamac.net/library/eclipse-temurin:21-jre-alpine AS package-app
WORKDIR /App
COPY --from=build /backend/build/libs/backend.jar /App
ENTRYPOINT [ "java", "-XX:+PrintCommandLineFlags", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "backend.jar" ]

plugins {
    id("java")
    id("war")
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}


dependencies {
    compileOnly("jakarta.platform:jakarta.jakartaee-web-api:9.1.0")

    implementation("org.glassfish:jakarta.faces:3.0.0")
    implementation("org.primefaces:primefaces:15.0.0:jakarta")
    implementation("org.eclipse.persistence:org.eclipse.persistence.jpa:3.0.2")
    implementation("org.postgresql:postgresql:42.7.3")

    compileOnly("org.projectlombok:lombok:1.18.30")
    annotationProcessor("org.projectlombok:lombok:1.18.30")

    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}


tasks.test {
    useJUnitPlatform()
}

tasks.war {
    archiveFileName.set("weblab3.war")
}
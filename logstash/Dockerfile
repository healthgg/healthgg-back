ARG ELASTIC_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/logstash/logstash:${ELASTIC_VERSION}

# Add your logstash plugins setup here
# Example: RUN logstash-plugin install logstash-filter-json
COPY ./mysql-connector-j-9.0.0.jar /usr/share/logstash/mysql-connector-j-9.0.0.jar
COPY ./template_food.json /usr/share/logstash/template_food.json
COPY ./template_fitness.json /usr/share/logstash/template_fitness.json
COPY ./pipeline/logstash.conf /usr/share/logstash/pipeline/logstash.conf
ARG ELK_VERSION

# https://github.com/elastic/logstash-docker
FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}

# Add your logstash plugins setup here
# Example: RUN logstash-plugin install logstash-filter-json
COPY ./mysql-connector-j-9.0.0.jar /usr/share/logstash/mysql-connector-j-9.0.0.jar
COPY ./test_template.json /usr/share/logstash/test_template.json
COPY ./pipeline/logstash.conf /usr/share/logstash/pipeline/logstash.conf
# Kafka

## Topics

### Create

- kafka-topics --bootstrap-server=localhost:9092 --create --topic=teste --partitions=3

### List

- kafka-topics --list --bootstrap-server=localhost:9092

### Describe

- kafka-topics --bootstrap-server=localhost:9092 --topic=teste --describe

## Consumers

### Plug consumer

- kafka-console-consumer --bootstrap-server=localhost:9092 --topic=teste

### Groups

- kafka-consumer-groups --bootstrap-server=localhost:9092 --groups=x --describe

## Producers

### Send message

- kafka-console-producer --bootstrap-server=localhost:9092 --topic=teste
  

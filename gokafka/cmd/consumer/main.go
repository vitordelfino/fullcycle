package main

import (
	"fmt"
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "gokafka_kafka_1:9092",
		"client.id": "goapp3-consumer",
		"group.id":  "goapp-group",
	}

	c, err := kafka.NewConsumer(configMap)
	if err != nil {
		fmt.Println("Failed to create consumer: ", err.Error())
	}

	topics := []string{"teste"}
	c.SubscribeTopics(topics, nil)
	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			fmt.Println("Message on %s: %s", msg.TopicPartition, string(msg.Value))
		} else {
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
			break
		}
	}
}
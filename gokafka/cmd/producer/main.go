package main

import (
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log"
)

func main() {
	deliveryChan := make(chan kafka.Event)

	producer := NewKafkaProducer()
	Publish("transferiu", "teste", producer, []byte("transferencia"), deliveryChan)
	go DeliveryReport(deliveryChan) // async
	//e := <-deliveryChan
	//
	//msg := e.(*kafka.Message)
	//
	//if msg.TopicPartition.Error != nil {
	//	log.Printf("Delivery failed: %v\n", msg.TopicPartition.Error)
	//} else {
	//	log.Printf("Delivered message: ", msg.TopicPartition)
	//}
	//
	producer.Flush(1000)

}

func NewKafkaProducer() *kafka.Producer{
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "gokafka_kafka_1:9092",
		"delivery.timeout.ms": "0", // infinito se valor for 0
		"acks": "all", // 0 = nenhum, 1 = leader, all = todos
		"enable.idempotence": "true", // para evitar duplicidade, depende do acknologment ser all
	}

	p, err := kafka.NewProducer(configMap)
	if err != nil {
		log.Println(err.Error())
	}
	return p
}

func Publish(msg string, topic string, producer *kafka.Producer, key []byte, deliveryChan chan kafka.Event) error {
	message := &kafka.Message{
		Value: []byte(msg),
		TopicPartition: kafka.TopicPartition{
			Topic: &topic,
			Partition: kafka.PartitionAny,
		},
		Key: key,
	}

	err := producer.Produce(message, deliveryChan)
	return err
}

func DeliveryReport(deliveryChan chan kafka.Event) {
	for e := range deliveryChan {
		switch ev := e.(type) {
		case *kafka.Message:
			if ev.TopicPartition.Error != nil {
				log.Printf("Delivery failed: %v\n", ev.TopicPartition.Error)
			} else {
				log.Printf("Delivered message: ", ev.TopicPartition)
			}
		}
	}
}
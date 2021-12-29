package main

import (
	"context"
	"github.com/vitordelfino/fullcycle/gRPC/go-aluno/pb"
	"google.golang.org/grpc"
	"io"
	"log"
	"time"
)

func main() {
	connection, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Could not connect: %v", err)
	}
	defer connection.Close()

	client := pb.NewUserServiceClient(connection)
	//AddUser(client)
	//AddUserVerbose(client)
	//AddUsers(client)
	AddUserStreamBoth(client)
}

func AddUser(client pb.UserServiceClient) {
	req := &pb.User{
		Name: "Vitor",
		Email: "vitor@email.com",
		Id: "123",
	}
	response, err := client.AddUser(context.Background(), req)
	if err != nil {
		log.Fatalf("Could not add user: %v", err)
	}
	log.Printf("Add user: %s", response)
}

func AddUserVerbose(client pb.UserServiceClient) {
	req := &pb.User{
		Name: "Vitor",
		Email: "vitor@email.com",
		Id: "123",
	}

	responseStream, err := client.AddUserVerbose(context.Background(), req)
	if err != nil {
		log.Fatalf("Could not add user: %v", err)
	}

	for {
		stream, err := responseStream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("Could not add user verbose: %v", err)
		}
		log.Println("Add user verbose: %s", stream)
	}
}

func AddUsers(client pb.UserServiceClient) {
	reqs := []*pb.User{
		&pb.User{
			Name:  "Vitor",
			Email: "vitor@email.com",
			Id:    "1",
		},
		&pb.User{
			Name:  "Vitor2",
			Email: "vitor2@email.com",
			Id:    "2",
		},
		&pb.User{
			Name:  "Vitor3",
			Email: "vitor3@email.com",
			Id:    "3",
		},
		&pb.User{
			Name:  "Vitor4",
			Email: "vitor4@email.com",
			Id:    "4",
		},
		&pb.User{
			Name:  "Vitor5",
			Email: "vitor5@email.com",
			Id:    "5",
		},
	}
	stream, err := client.AddUsers(context.Background())
	if err != nil {
		log.Fatalf("Could not add users: %v", err)
	}

	for _, req := range reqs {
		stream.Send(req)
		time.Sleep(time.Second * 3)
	}

	res, err := stream.CloseAndRecv()

	if err != nil {
		log.Fatalf("Could not receive users: %v", err)
	}
	log.Printf("Add users: %s", res)
}

func AddUserStreamBoth(client pb.UserServiceClient) {
	stream, err := client.AddUsersStreamBoth(context.Background())
	if err != nil {
		log.Fatalf("error creating request: %v", err)
	}
	reqs := []*pb.User{
		&pb.User{
			Name:  "Vitor",
			Email: "vitor@email.com",
			Id:    "1",
		},
		&pb.User{
			Name:  "Vitor2",
			Email: "vitor2@email.com",
			Id:    "2",
		},
		&pb.User{
			Name:  "Vitor3",
			Email: "vitor3@email.com",
			Id:    "3",
		},
		&pb.User{
			Name:  "Vitor4",
			Email: "vitor4@email.com",
			Id:    "4",
		},
		&pb.User{
			Name:  "Vitor5",
			Email: "vitor5@email.com",
			Id:    "5",
		},
	}


	wait := make(chan int)

	go func() {
		for _, req := range reqs {
			log.Printf("Sending req: %v", req.Name)
			stream.Send(req)
			time.Sleep(time.Second * 2)
		}
		stream.CloseSend()
	}()

	go func() {
		for {
			res, err := stream.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				log.Fatalf("error receiving response: %v", err)
			}
			log.Printf("Received response: %v %v", res.Status, res.User)
		}
		close(wait)
	}()
	<-wait
}
package main

import (
	"github.com/vitordelfino/fullcycle/gRPC/go-aluno/pb"
	"github.com/vitordelfino/fullcycle/gRPC/go-aluno/services"
	"google.golang.org/grpc/reflection"
	"log"
	"net"
	"google.golang.org/grpc"
)

func main() {

	lis, err := net.Listen("tcp", "localhost:50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	pb.RegisterUserServiceServer(grpcServer, services.NewUserService())
	reflection.Register(grpcServer)
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}

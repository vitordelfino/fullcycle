package main

import (
	"context"
	"encoding/json"
	"golang.org/x/oauth2"
	"log"
	"net/http"

	oidc "github.com/coreos/go-oidc"
)

var (
	clientID     = "myclient"
	clientSecret = "LXBn7ZVow340mAMX9RLlvw6tDW1tSLxJ"
)

func main() {
	ctx := context.Background()

	provider, err := oidc.NewProvider(ctx, "http://localhost:8080/auth/realms/myrealm")
	if err != nil {
		log.Fatal(err)
	}

	config := oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Endpoint:     provider.Endpoint(),
		RedirectURL:  "http://localhost:8081/auth/callback",
		Scopes:       []string{oidc.ScopeOpenID, "profile", "email", "roles"},
	}

	state := "123"

	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		http.Redirect(writer, request, config.AuthCodeURL(state), http.StatusFound)
	})

	http.HandleFunc("/auth/callback", func(writer http.ResponseWriter, request *http.Request) {
		if request.URL.Query().Get("state") != state {
			http.Error(writer, "State inválido", http.StatusBadRequest)
			return
		}

		token, err := config.Exchange(ctx, request.URL.Query().Get("code"))
		if err != nil {
			http.Error(writer, "Falha ao trocar token", http.StatusInternalServerError)
			return
		}

		idToken, ok := token.Extra("id_token").(string)
		if !ok {
			http.Error(writer, "Falha ao gerar IDToken", http.StatusInternalServerError)
			return
		}

		userInfo, err := provider.UserInfo(ctx, oauth2.StaticTokenSource(token))
		if err != nil {
			http.Error(writer, "Erro ao obter dados de usuário", http.StatusInternalServerError)
			return
		}

		resp := struct {
			AccessToken *oauth2.Token
			IDToken     string
			UserInfo *oidc.UserInfo
		}{
			AccessToken: token,
			IDToken:     idToken,
			UserInfo:    userInfo,
		}

		data, err := json.Marshal(resp)
		if err != nil {
			http.Error(writer, "Falha ao serializar token", http.StatusInternalServerError)
			return
		}

		writer.Write(data)

	})

	log.Fatal(http.ListenAndServe(":8081", nil))
}

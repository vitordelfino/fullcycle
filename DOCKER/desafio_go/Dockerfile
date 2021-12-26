FROM golang:1.17.5 as builder

WORKDIR /go/src/app

COPY . .

RUN go build

FROM scratch

WORKDIR /app

COPY --from=builder /go/src/app/desafio_go /usr/bin/

ENTRYPOINT ["desafio_go"]
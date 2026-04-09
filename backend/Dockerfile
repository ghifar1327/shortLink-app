FROM golang:1.25-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /shortlink-backend ./cmd/main.go

FROM alpine:3.18
RUN apk add --no-cache ca-certificates

WORKDIR /app
COPY --from=builder /shortlink-backend /app/shortlink-backend

ENV PORT=8888
EXPOSE 8888
CMD ["./shortlink-backend"]

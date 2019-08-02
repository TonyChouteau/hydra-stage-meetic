package main

import (
	"github.com/TonyChouteau/hydra/api/httpserver"
)

func main() {
	httpserver.Serve(httpserver.NewAPI(), "8080")
}

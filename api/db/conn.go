package db

import (
	"database/sql"
	"fmt"
)

const (
	user    = "system"
	psw     = "manager"
	addr    = "192.168.58.51"
	port    = "31469"
	service = "xe"
)

type Connection struct {
	db *sql.DB
}

func NewConnection() *Connection {
	conn, err := sql.Open("goracle", fmt.Sprintf("%s/%s@%s:%s/%s", user, psw, addr, port, service))
	if err != nil {
		//panic(err)
		fmt.Println(err)
	}

	return &Connection{
		db: conn,
	}
}

func (c *Connection) GetConnection() *sql.DB {
	return c.db
}

func (c *Connection) Query(query string) *sql.Rows {

	rows, err := c.db.Query(query)
	if err != nil {
		fmt.Println(err)
	}

	return rows
}

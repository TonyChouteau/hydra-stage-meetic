package db

/*import (
	"fmt"
)*/

/*const (
	user    = "system"
	psw     = "manager"
	addr    = "192.168.58.51"
	port    = "31469"
	service = "xe"
)*/

type Connection struct {
	db string
}

func NewConnection() *Connection {
	/*conn, err := sql.Open("goracle", fmt.Sprintf("%s/%s@%s:%s/%s", user, psw, addr, port, service))
	if err != nil {
		//panic(err)
		fmt.Println(err)
	}*/

	return &Connection{
		db: "fake-db",
	}
}

func (c *Connection) GetConnection() string {
	return c.db
}

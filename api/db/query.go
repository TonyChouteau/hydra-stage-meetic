package db

import (
	"encoding/json"
	"fmt"
	"os"
	"io/ioutil"
	"strconv"

	"github.com/TonyChouteau/hydra/api/abtest"
)

//=============================
//	Abtests data
//=============================

func (c *Connection) Count(id string, name string, start string, end string) int {
	
	jsonFile, err := os.Open("abtests.json")
	if err != nil {
		fmt.Println(err)
	}
	byteValue, _ := ioutil.ReadAll(jsonFile)

	abtests := abtest.Abtests{}
	err = json.Unmarshal(byteValue, &abtests)
	if err != nil {
		fmt.Println(err)
	}

	//fmt.Println("abtests :",abtests)

	//dataRows := c.Query(``)
	//defer dataRows.Close()

	return len(abtests.Data)
}

func (c *Connection) GetActiveAbtests(offset int, limit int, id string, name string, start string, end string) []abtest.Abtest {

	jsonFile, err := os.Open("abtests.json")
	if err != nil {
		fmt.Println(err)
	}
	byteValue, _ := ioutil.ReadAll(jsonFile)

	abtests := abtest.Abtests{}
	err = json.Unmarshal(byteValue, &abtests)
	if err != nil {
		fmt.Println(err)
	}

	abtestsFilter := []abtest.Abtest{}
	for i, a := range abtests.Data{
		if (i >= offset && i < offset+limit) {
			abtestsFilter = append(abtestsFilter, a)
		}
	}

	return abtestsFilter
}

//=============================
//	Maped data
//=============================

func (c *Connection) GetCountries(date, device string) []abtest.Abtest {

	abtests := []abtest.Abtest{}
	/*tpl := template.Must(template.New("query").Parse(`
		`))

	query := bytes.Buffer{}

	fmt.Println(date, time.Now().Format("02-01-2006"), date == time.Now().Format("02-01-2006"))

	active := false
	if date == time.Now().Format("02-01-2006") {
		active = true
	}

	if err := tpl.Execute(&query, struct {
		Date   string
		Device string
		Active bool
	}{
		Date:   date,
		Device: device,
		Active: active,
	}); err != nil {
		fmt.Println(err)
	}

	rows := c.Query(query.String())

	//fmt.Println(query.String())

	defer rows.Close()

	abtests := []abtest.Abtest{}

	var new_abtest abtest.Abtest

	for rows.Next() {
		var s string
		rows.Scan(&new_abtest.Id,
			&new_abtest.Description,
			&new_abtest.From,
			&new_abtest.To,
			&s,
		)

		sites := strings.Split(s, ",")
		new_abtest.Sites = sites

		abtests = append(abtests, new_abtest)
	}*/

	return abtests
}

//=============================
//	Only one data
//=============================

func (c *Connection) GetAbtest(id string) abtest.Abtest {

	jsonFile, err := os.Open("abtests.json")
	if err != nil {
		fmt.Println(err)
	}
	byteValue, _ := ioutil.ReadAll(jsonFile)

	abtests := abtest.Abtests{}
	err = json.Unmarshal(byteValue, &abtests)
	if err != nil {
		fmt.Println(err)
	}
	
	abtestId, err := strconv.Atoi(id)
	if err != nil {
		fmt.Println(err)
	}

	abtest := abtest.Abtest{}
	for _, a := range abtests.Data {
		if (a.Id == abtestId) {
			abtest = a
		}
	}

	return abtest
}

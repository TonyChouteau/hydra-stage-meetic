package db

import (
	/*"encoding/json"
	"io/ioutil"*/

	"github.com/TonyChouteau/hydra/api/abtest"
)

//=============================
//	Abtests data
//=============================

func (c *Connection) Count(id string, name string, start string, end string) int {

	/*file, _ := ioutil.ReadFile("abtests.json")
	abtests = []abtest.Abtest{}
	_ = json.Unmarshal([]byte(file), &abtests)*/

	//dataRows := c.Query(``)
	//defer dataRows.Close()

	return 5//count
}

func (c *Connection) GetActiveAbtests(offset int, limit int, id string, name string, start string, end string) []abtest.Abtest {

	var abtests []abtest.Abtest

	// Get tests which are operation now (just id, description, start-data, end-date values)
	// min := strconv.Itoa(offset)
	// max := strconv.Itoa(offset + limit)

	//fmt.Println(start, end)

	/*dataRows := c.Query(``)


	defer dataRows.Close()

	// Adding tests to a slice
	var new_abtest abtest.Abtest

	for dataRows.Next() {

		var s string
		dataRows.Scan(&new_abtest.Id,
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

func (c *Connection) GetSites(abtestID int) []string {

	sites := []string{}
	/*dataRows := c.Query(``)
	defer dataRows.Close()

	for dataRows.Next() {
		var site string
		dataRows.Scan(&site)
		sites = append(sites, site)
	}
	*/

	return sites
}

func (c *Connection) GetGroups(abtestID int) []abtest.Group {
	groups := []abtest.Group{}

	/*rows := c.Query(``)

	defer rows.Close()

	groups := []abtest.Group{}
	for rows.Next() {
		var group abtest.Group
		rows.Scan(&group.Id, &group.Proportion)
		groups = append(groups, group)
	}*/

	return groups
}

func (c *Connection) GetSegments(abtestID int) []abtest.Segment {

	segments := []abtest.Segment{}
	/*rows := c.Query(``)

	defer rows.Close()

	for rows.Next() {
		var seg abtest.Segment
		rows.Scan(&seg.Type, &seg.Value, &seg.Min, &seg.Max)
		segments = append(segments, seg)
	}*/
	return segments

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

	var abtest abtest.Abtest
	/*dataRows := c.Query(``)

	defer dataRows.Close()

	var abtest abtest.Abtest
	var s string

	for dataRows.Next() {
		dataRows.Scan(&abtest.Id,
			&abtest.Description,
			&abtest.From,
			&abtest.To,
			&s,
		)
	}

	sites := strings.Split(s, ",")
	abtest.Sites = sites*/

	return abtest
}

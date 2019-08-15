package abtest

import (
	"fmt"
	"sync"
	"time"
)

type Group struct {
	Id         int `json:"id"`
	Proportion int `json:"proportion"`
}

type Segment struct {
	Type  string  `json:"type"`
	Value string  `json:"value"`
	Min   float32 `json:"min"`
	Max   float32 `json:"max"`
}

type Abtest struct {
	Id          int       `json:"id"`
	Description string    `json:"description"`
	Groups      []Group   `json:"groups"`
	Segments    []Segment `json:"segments"`
	Sites       []string  `json:"sites"`
	From        string    `json:"from"`
	To          string    `json:"to"`
}

type Abtests struct {
	Title []string `json:"title"`
	Data  []Abtest `json:"data"`
}

type RepositoryABtests interface { // Conection type interface
	GetConnection() string
	Count(string, string, string, string) int
	GetActiveAbtests(int, int, string, string, string, string) []Abtest
	GetSites(int) []string
	GetGroups(int) []Group
	GetSegments(int) []Segment
	GetAbtest(string) Abtest
}

type AbtestService struct {
	db RepositoryABtests
}

func NewAbtestService(repo RepositoryABtests) *AbtestService {
	return &AbtestService{
		db: repo,
	}
}

/*func (abtests []Abtest) createAbtest(a *AbtestService) {
	abtests[i].Groups = s.db.GetGroups(abtest.Id)
	abtests[i].Segments = s.db.GetSegments(abtest.Id)
}*/

func (s *AbtestService) Get(offset int, limit int, id string, name string, start string, end string) []Abtest {

	//defer s.db.GetConnection().Close()

	var abtests []Abtest

	timeStart := time.Now()

	abtests = s.db.GetActiveAbtests(offset, limit, id, name, start, end)

	wg := new(sync.WaitGroup)

	for i, abtest := range abtests {
		//abtests[i].Sites = s.db.GetSites(abtest.Id)
		wg.Add(2)
		go func(i int, abtest Abtest) {
			defer wg.Done()
			abtests[i].Groups = s.db.GetGroups(abtest.Id)
		}(i, abtest)

		go func(i int, abtest Abtest) {
			defer wg.Done()
			abtests[i].Segments = s.db.GetSegments(abtest.Id)
		}(i, abtest)
	}

	wg.Wait()

	fmt.Print("\nLoad abtests from Database : ")
	fmt.Println(time.Now().Sub(timeStart))

	return abtests
}

func (s *AbtestService) Count(id string, name string, start string, end string, count chan int) {

	//defer s.db.GetConnection().Close()

	timeStart := time.Now()

	countTime := s.db.Count(id, name, start, end)

	fmt.Print("\nCount abtests from Database : ")
	fmt.Println(time.Now().Sub(timeStart))

	count <- countTime
}

func (s *AbtestService) GetOne(id string) Abtest {

	//defer s.db.GetConnection().Close()

	timeStart := time.Now()

	var abtest Abtest
	abtest = s.db.GetAbtest(id)
	abtest.Groups = s.db.GetGroups(abtest.Id)
	abtest.Segments = s.db.GetSegments(abtest.Id)

	//fmt.Println(abtest)

	fmt.Print("\nLoad a single abtest from Database : ")
	fmt.Println(time.Now().Sub(timeStart))

	return abtest
}

func (s *AbtestService) ifExist(id string) bool {
	return true
}

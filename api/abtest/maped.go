package abtest

import (
	"database/sql"
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"sync"
	"time"
)

type simplifiedDetails struct {
	Id          int       `json:"id"`
	Description string    `json:"description"`
	Segments    []Segment `json:"segments"`
	Proportions []string  `json:"proportions"`
}

type MapedCountries map[string][]simplifiedDetails

func GetCountries() []string {
	return []string{
		"uk",
		"at",
		"ch",
		"gm",
		"nl",
		"da",
		"fi",
		"fr",
		"ie",
		"no",
		"sw",
		"be",
		"it",
		"po",
		"sp",
	}
}

type RepositoryMaped interface { // Conection type interface
	GetConnection() *sql.DB
	GetCountries(string, string) []Abtest
	GetGroups(int) []Group
	GetSegments(int) []Segment
}

type MapedService struct {
	db RepositoryMaped
}

func NewMapedService(repo RepositoryMaped) *MapedService {
	return &MapedService{
		db: repo,
	}
}

func (s *MapedService) GetMaped(date string, device string) MapedCountries {

	//defer s.db.GetConnection().Close()

	timeStart := time.Now()

	abtests := s.db.GetCountries(date, device)

	wg := new(sync.WaitGroup)

	for i, abtest := range abtests {
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

	fmt.Print("\nLoad abtests and groups : ")
	fmt.Println(time.Now().Sub(timeStart))
	timeStart = time.Now()

	maped := MapedCountries{}

	for _, abtest := range abtests {
		sites := strings.Join(abtest.Sites, ",")
		for _, c := range GetCountries() {
			if match, _ := regexp.MatchString("\\."+c+"(,|\\z)", sites); match || strings.Contains(sites, ".*") {

				proportions := []string{}
				for _, p := range abtest.Groups {
					proportions = append(proportions, strconv.Itoa(p.Proportion)+"%")
				}
				//fmt.Println(proportions)
				newAbtest := simplifiedDetails{abtest.Id, abtest.Description, abtest.Segments, proportions}

				maped[c] = append(maped[c], newAbtest)

				continue
			}
		}
	}

	for _, c := range GetCountries() {
		if _, ok := maped[c]; !ok {
			maped[c] = []simplifiedDetails{}
		}
	}

	fmt.Print("\nCreate maped struct : ")
	fmt.Println(time.Now().Sub(timeStart))

	return maped
}

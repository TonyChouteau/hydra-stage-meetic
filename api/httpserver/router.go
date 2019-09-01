package httpserver

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/TonyChouteau/hydra/api/db"

	"github.com/TonyChouteau/hydra/api/abtest"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type API struct {
	ABTestService *abtest.AbtestService
	MappedService *abtest.MapedService
}

func NewAPI() *API {

	db := db.NewConnection()

	return &API{
		ABTestService: abtest.NewAbtestService(db),
		MappedService: abtest.NewMapedService(db),
	}
}

func (api *API) abtestsToJson(c *gin.Context) {

	//fmt.Println(c.Param("params") == "undefined")
	//https://stackoverflow.com/questions/1891789/sql-select-first-10-rows-only

	title := []string{"id",
		"description",
		"groups",
		"segments",
		"sites",
		"from",
		"to"}

	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	id := c.DefaultQuery("byid", "")
	name := c.DefaultQuery("byname", "")
	start := c.DefaultQuery("bystart", "")
	end := c.DefaultQuery("byend", "")

	if start == "" {
		start = "0001-01-01"
	}
	if end == "" {
		end = "9999-01-01"
	}

	//fmt.Println(offset, "-", limit, "-", id, "-", name, "-", start, "-", end)

	/*if c.Param("params") == "undefined" {
		data = db.CreateTable(0)
	} else {
		cursor, _ := strconv.Atoi(c.Param("params"))
		data = db.CreateTable(cursor)
	}*/

	counter := make(chan int)
	go api.ABTestService.Count(id, name, start, end, counter)
	data := api.ABTestService.Get(offset, limit, id, name, start, end)
	count := <-counter

	abtests := abtest.Abtests{Title: title, Data: data}

	//fmt.Println(abtests)

	c.JSON(200, gin.H{
		"abtests": abtests,
		"count":   count,
	})
}

func (api *API) mapedToJson(c *gin.Context) {

	dt := time.Now().Format("2006-01-02")
	device := c.DefaultQuery("device", "wam")
	date := c.DefaultQuery("date", dt)
	fmt.Println(date, device)

	maped := api.MappedService.GetMaped(date, device)
	keys := abtest.GetCountries()

	c.JSON(200, gin.H{
		"countries": keys,
		"maped":     maped,
	})
}

func (api *API) detailedToJson(c *gin.Context) {
	id := c.Param("id")

	data := api.ABTestService.GetOne(id)

	c.JSON(200, data)
}

func (api *API) postAnalysis(c *gin.Context) {
        
        fmt.Println("Test")
        
	id := c.Param("id")
	file, err := c.FormFile("file")
	fmt.Println(err)
        fmt.Println(file==nil)
        fmt.Println(file.Filename)

	fileFormat := "pdf"

	if file != nil && strings.Contains(file.Filename, fileFormat) {
		fmt.Printf("Analysis '%s' for abtest %s uploaded\n", file.Filename, id)
		c.String(http.StatusOK, fmt.Sprintf("Analysis '%s' for abtest %s uploaded\n", file.Filename, id))

		dir := "public/analysis/" + id

		if _, err := os.Stat(dir); os.IsNotExist(err) {
			err = os.MkdirAll(dir, 0755)
			if err != nil {
				panic(err)
			}
		}

		c.SaveUploadedFile(file, dir+"/analysis_"+id+fileFormat)
	} else if !strings.Contains(file.Filename, fileFormat) {
		fmt.Println("The file must be in a '" + fileFormat + "' format !")
	}else {
		fmt.Println("No file uploaded")
	}
}

func Serve(api *API, port string) {
	r := gin.Default()
	r.Use(cors.Default())
	//?offset=*&limit=*
	r.GET("/abtests", api.abtestsToJson)
	r.GET("/maped-abtests", api.mapedToJson)
	r.GET("/abtest/:id", api.detailedToJson)
	r.POST("/abtest/:id/analysis", api.postAnalysis)
	r.Run(":" + port)
	fmt.Println("test")
}

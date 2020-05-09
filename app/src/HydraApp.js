// vim: syntax=JSX

// React Component
import React, { Component } from 'react';
import { Router, Route, Redirect} from "react-router-dom";
import { createBrowserHistory } from 'history';
//import Request from 'react-http-request';
import BottomScrollListener from 'react-bottom-scroll-listener';

// Own component
import AppMenuBar from './Header/AppBar';

import ABTestList from './Content/ABTestList/PageContent';
import Map from './Content/Map/DisplayMap';
import Detail from './Content/Detail/DisplayDetail';

// Json file
import config from './Data/config.json';
import table from './Data/abtest-table.json';

// Component
class HydraApp extends Component
{
  constructor(props)
  {
    super(props);

    this.history = createBrowserHistory();
    this.location = this.history.location;

    this.tableInit = {
      "title" : table.title,
      "data" : [],
    }

    this.state = 
    {
      routingIndex: 0,
      selected: this.history.location.pathname.startsWith("/detail")?
                this.history.location.pathname.substring(8):-1,
      table: this.tableInit,
      offset : 0,
      limit : 15,
      count : 0,
      endOfData: false,

      searchByID : "",
      searchByName : "",
      searchByStart : "",
      searchByEnd : "",
      data : {}
    };

    /*this.unlisten =  this.history.listen((location, action) => {
      // location is an object like window.location
      //console.log(action, location.pathname, location.state);
      if (action === "POP")
      {
        this.state.selected = -1;
      }
    });*/

    this.handleClick = this.handleClick.bind(this);
    this.handleItemSelection = this.handleItemSelection.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.ListPage = this.ListPage.bind(this);
    this.DetailPage = this.DetailPage.bind(this);
    this.MapPage = this.MapPage.bind(this);
    this.endOfScroll = this.endOfScroll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    
    //this.state.table = "";
    this.GetTable();
    //this.state.table = table;//JSON.parse(this.GetTable()).abtests;
  }

  GetTable(id = this.state.searchByID)
  {
    /*console.log("http://localhost:8080/abtests?offset="+this.state.offset
    +"&limit="+this.state.limit
    +(this.state.searchByID!==""?"&byid="+this.state.searchByID:"")
    +(this.state.searchByName!==""?"&byname="+this.state.searchByName:"")
    +(this.state.searchByStart!==""?"&bystart="+this.state.searchByStart.split("-").reverse().join("-"):"")
    +(this.state.searchByEnd!==""?"&byend="+this.state.searchByEnd.split("-").reverse().join("-"):""))*/
    
    return (
      fetch("http://192.168.197.78:8080/abtests?offset="+this.state.offset
            +"&limit="+this.state.limit
            +(id!==""?"&byid="+id:"")
            +(this.state.searchByName!==""?"&byname="+this.state.searchByName:"")
            +(this.state.searchByStart!==""?"&bystart="+this.state.searchByStart.split("-").reverse().join("-"):"")
            +(this.state.searchByEnd!==""?"&byend="+this.state.searchByEnd.split("-").reverse().join("-"):""))
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is a parser json object received from url
        //console.log(jsonData, jsonData.abtests.data !== null)
        
        this.setState({count : jsonData.count})

        if (this.state.offset===0)
        {
          if (jsonData.abtests.data !== null)
          {
            this.setState({table : jsonData.abtests});
          }
          else
          {
            this.setState({table : this.tableInit});
          }
        }
        else if (jsonData.abtests.data !== null)
        {
          //console.log(this.state.table)
          let concat = {
            "title" : this.state.table.title,
            "data" : this.state.table.data.concat(jsonData.abtests.data),
          }
          this.setState({table : concat});
        }
        else
        {
          this.setState({endOfData : true})
        }
        if (jsonData.abtests.data == null || jsonData.abtests.data.length < 15)
        {
          this.setState({endOfData : true})
        }
        this.setState({offset : this.state.offset+this.state.limit})
        //return jsonData;
      })
      .catch((error) => {
        // handle errors
        console.error(error)
      })
    )
  }

  handleClick = (e) =>
  {
    if (typeof e === 'number')
    {
      this.setState({routingIndex : e, selected : -1});
    }
  }

  handleItemSelection(index)
  {
    this.setState({selected : index});
    //this.GetTable();
    this.history.push("/detail-"+index)
  }

  handleSearch()
  {
    this.setState({
      searchByID : document.getElementById("searchByID").value,
      searchByName : document.getElementById("searchByName").value,
      searchByStart : document.getElementById("searchByStart").value,
      searchByEnd : document.getElementById("searchByEnd").value,
      endOfData : false, 
      offset: 0
    },
    this.GetTable);
  }

  handleRefresh()
  {
    this.setState({endOfData : false, offset: 0})
    this.GetTable();
  }

  endOfScroll()
  {
    //console.log("x");
    this.GetTable();
  }

  ListPage()
  {
    return (
      <div>
        <AppMenuBar 
          changeRouteIndex={this.handleClick} 
          routingIndex={this.state.routingIndex} 
          page={config.routingList[0]}/>
        <ABTestList
          onScroll={this.handleScroll} 
          selectItem={this.handleItemSelection}
          table={this.state.table}
          handleRefresh={this.handleRefresh}
          count={this.state.count}
          endOfData={this.state.endOfData}
          searchByID={this.state.searchByID}
          searchByName={this.state.searchByName}
          searchByStart={this.state.searchByStart}
          searchByEnd={this.state.searchByEnd}
          handleSearch={this.handleSearch}
        />
      </div>
    )
  }

  DetailPage()
  {
    //this.setState({selected: this.history.location.subString(1)});

    return (
      <div>
        <AppMenuBar 
          changeRouteIndex={this.handleClick} 
          routingIndex={this.state.routingIndex} 
          page={"Detail : "+this.state.selected}
          />
        <Detail 
          id={this.state.selected}
          table={this.state.table}
          history={this.history}
        />
      </div>
    )
  }

  MapPage()
  {
    return (
      <div>
        <AppMenuBar 
          changeRouteIndex={this.handleClick} 
          routingIndex={this.state.routingIndex} 
          page={config.routingList[1]}
          table={this.state.table}
        />
        <Map 
          //table={this.state.table}
          selectItem={this.handleItemSelection}
          selectRow={this.handleItemSelection}
        />
      </div>
    )
  }

  dataExist(id)
  {
    //this.GetTable(id);

    for (let i=0; i<this.state.table["data"].length; i++)
    {
      if (this.state.table["data"][i]["id"]===id)
      {
        return true;
      }
    }

    if (isNaN(id))
    {
      alert('This is not a data ID');
    }
    else
    {
      alert('No data with the ID '+id+' was found');
    }
    return false;
  }

  render()
  {
    const l = this.history.location.pathname;
    let x="";
    if (!(l.includes("/detail-") || (l==="/list") || (l==="/map")))
    {
      x = <Redirect to="/list"/>;
    }

    return (
      <div>
        {!this.state.endOfData &&
          <BottomScrollListener debounce={0} onBottom={this.endOfScroll} />
        }
        <Router history={this.history}>
          {x}
          <Route path="/list" component={this.ListPage} />
          <Route path="/map" component={this.MapPage} />
          <Route path={"/detail-"+this.state.selected} component={this.DetailPage} />
        </Router>
      </div>
    );
  }
}

export default HydraApp;

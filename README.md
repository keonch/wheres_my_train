# wheres_my_train
**Where's my train?**  
See the subway trains moving within the boroughs of New York at realtime using this app.  
[See It Live](https://keonch.github.io/wheres_my_train/)  
![wmt1](https://media.giphy.com/media/4MXMSSySPh5N7QMVtq/giphy.gif)

# General Implementation
Here is a schematic diagram of this design.
<img src='https://i.imgur.com/wITDq8D.png'/>

## Data
The app fetches real-time transit data from the MTA datamine.  
MTA provides API endpoints for train arrival and departure times following the [GTFS](http://gtfs.org/) format.  
The list of MTA "feeds" can be found [here](http://datamine.mta.info/list-of-feeds).  

Extraction and implementation of data follow these basic steps:
> 1. Fetch serialized data from the MTA
> 2. Decode data using protobuf.js/gtfs-realtime.js
> 3. Parse and normalize the data
> 4. Construct train and map objects with new data

### Data for Stations and Static Routes  
MTA provides data of every station in NYCT including its name and geolocation.
Routes for individual train lines are also provided.  
Using these two datasets, a polyline can be generated on the map by plotting geolocations of stations corresponding to the static route data.

### Fetching Real-time Data  
A request to MTA is made through client-side scripting, hence, an Origin header is required. To bypass CORS on client-side, requests are made to an external proxy server (https://cors-anywhere.herokuapp.com/). Requests are asynchronous and makes updates to the app component when data is received with 200 status.

### Decoding Real-time Data  
The MTA serializes the transit data using GTFS and NYCT protocol buffers.  
Using Google's [GTFS-realtime Bindings](https://github.com/google/gtfs-realtime-bindings/blob/master/nodejs/README.md), the serialized data is parsed into JavaScript objects.

### The MTA Real-time Data Object  
MTA sets routes for each train with a tripId. Each id is used to reference a unique marker object on the map.  
Each route from the feed data is represented by an array (stopTimeUpdate) that lists the estimated time of arrivals at each station along with a stopId.  

An example of a train feed:
``` JavaScript
{
  stopTimeUpdate: [
    {
      arrival: StopTimeEvent,
      departure: StopTimeEvent,
      stopId: "701S"
    }, {
      arrival: StopTimeEvent,
      departure: StopTimeEvent,
      stopId: "701S"
    },

    ...

    }, {
      arrival: StopTimeEvent,
      departure: StopTimeEvent,
      stopId: "726S"
    }
  ],
  trip: {
    routeId: "7"
    startDate: date
    tripId: "128200_7..S"
  }
}
```  
[Link to MTA's feed document](http://datamine.mta.info/sites/all/files/pdfs/GTFS-Realtime-NYC-Subway%20version%201%20dated%207%20Sep.pdf)  

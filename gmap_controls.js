      
      var map, heatmap;
      
      //Global variables
      var mapRadius = 60;//Changes all map radius.
      var scatterShot = false;
      var scatterShotAmount = 30;//
      var pulseShot = false;
      var pulseShotAmount = 7;
      var shotDamage = 5;
      var circlesOnMap = 0;
      var circlesOnMapCenter = null;
      var circlesOnMapTimestamp = null;
     
      
      /* HUD CONTROLS */
      function HudControl(controlDiv, map) {

        // Set CSS for the My Location UI
        var myLocationUI = document.createElement('div');
        myLocationUI.id = 'myLocationUI';//ID for the DIV.
        myLocationUI.title = 'Click to go to My Location'; //Mouse over details.
        controlDiv.appendChild(myLocationUI);

        // Set CSS for the My Location Button
        var myLocationText = document.createElement('div');
        myLocationText.id = 'myLocationText';
        myLocationText.innerHTML = 'My Location';
        myLocationUI.appendChild(myLocationText);

        // go to users location button
        myLocationUI.addEventListener('click', function() {
          initMap();
        });
        
        //Disaster Location
        var disasterLocatorUI = document.createElement('div');
        disasterLocatorUI.id = 'disasterLocatorUI';
        disasterLocatorUI.title = "Click to Show Direction of a Disaster";
        controlDiv.appendChild(disasterLocatorUI);
        //set CSS for the Disaster Locator
        var disasterLocatorText = document.createElement('div');
        disasterLocatorText.id = 'disasterLocatorText';
        disasterLocatorText.innerHTML = 'Disaster Locator';
        disasterLocatorUI.appendChild(disasterLocatorText);
        
        disasterLocatorUI.addEventListener('click', function() {
          //function that shows the next disaster location.
          disasterLocator(map);
        })
       
       //To Add More Buttons to the HUD, just copy and paste everything above for anothe button.
       
       //Toggle ScatterShot Button
       var scatterShotUI = document.createElement('div');
       scatterShotUI.id = 'scatterShotUI';
       scatterShotUI.title = 'Toggle Scattershot On/Off'
       controlDiv.appendChild(scatterShotUI);
       var scatterShotText = document.createElement('div');
       scatterShotText.id = 'scatterShotText';
       scatterShotText.innerHTML = 'Scatter Shot';
       scatterShotUI.appendChild(scatterShotText);
       
       scatterShotUI.addEventListener('click', function() {
         //function to toggle a scatterShot() on click
         scatterShotToggle();
       })
       
       //Toggle PulseShot Button
       var pulseShotUI = document.createElement('div');
       pulseShotUI.id = 'pulseShotUI';
       pulseShotUI.title = 'Toggle Pulse Shot On/Off';
       controlDiv.appendChild(pulseShotUI);
       var pulseShotText = document.createElement('div');
       pulseShotText.id = 'pulseShotText';
       pulseShotText.innerHTML = "Pulse Shot";
       pulseShotUI.appendChild(pulseShotText);
       
       pulseShotUI.addEventListener('click', function() {
         //function to toggle pulseShot() on click
         pulseShotToggle();
       })
       
      }
      
      
      function HudControlRightSide(controlDiv, map) {
        
        //Toggle PulseShot Button
       var incommingTransmissionUI = document.createElement('div');
       incommingTransmissionUI.id = 'incommingTransmissionUI';
       incommingTransmissionUI.title = 'Mission Status';
       controlDiv.appendChild(incommingTransmissionUI);
       var incommingTransmissionText = document.createElement('div');
       incommingTransmissionText.id = 'incommingTransmissionText';
       incommingTransmissionText.innerHTML = "Mission Status Indicator";
       incommingTransmissionUI.appendChild(incommingTransmissionText);
       
       incommingTransmissionUI.addEventListener('click', function() {
         //function for clicking on this...
         //so far this is just a message really.
       })
       
      }//end HudControlLeftSide
      


      //Style the Map based on the users time.
      var usersTime = new Date();
      var hours = usersTime.getHours();
      var mapStyle = "";
      //if Between 7PM and 6AM use a dark map.  Else use a light map.
      if (hours < 6 || hours > 18)
      {
      mapStyle = 
      [
                  {
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#8ec3b9"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1a3646"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#4b6878"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#64779e"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#4b6878"
                      }
                    ]
                  },
                  {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#334e87"
                      }
                    ]
                  },
                  {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#023e58"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#283d6a"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#6f9ba5"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#023e58"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#3C7680"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#304a7d"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#98a5be"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "featureType": "road.arterial",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#2c6675"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#255763"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#b0d5ce"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#023e58"
                      }
                    ]
                  },
                  {
                    "featureType": "road.local",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#98a5be"
                      }
                    ]
                  },
                  {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#283d6a"
                      }
                    ]
                  },
                  {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#3a4762"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#0e1626"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#4e6d70"
                      }
                    ]
                  }
                ]
      }
      else
      {
        mapStyle = [
                    {
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#f5f5f5"
                        }
                      ]
                    },
                    {
                      "elementType": "labels.icon",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#616161"
                        }
                      ]
                    },
                    {
                      "elementType": "labels.text.stroke",
                      "stylers": [
                        {
                          "color": "#f5f5f5"
                        }
                      ]
                    },
                    {
                      "featureType": "administrative.land_parcel",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "administrative.land_parcel",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#bdbdbd"
                        }
                      ]
                    },
                    {
                      "featureType": "administrative.neighborhood",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "poi",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#eeeeee"
                        }
                      ]
                    },
                    {
                      "featureType": "poi",
                      "elementType": "labels.text",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "poi",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#757575"
                        }
                      ]
                    },
                    {
                      "featureType": "poi.park",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#e5e5e5"
                        }
                      ]
                    },
                    {
                      "featureType": "poi.park",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#9e9e9e"
                        }
                      ]
                    },
                    {
                      "featureType": "road",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#ffffff"
                        }
                      ]
                    },
                    {
                      "featureType": "road",
                      "elementType": "labels",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "road.arterial",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "road.arterial",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#757575"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#dadada"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway",
                      "elementType": "labels",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#616161"
                        }
                      ]
                    },
                    {
                      "featureType": "road.local",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "road.local",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#9e9e9e"
                        }
                      ]
                    },
                    {
                      "featureType": "transit.line",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#e5e5e5"
                        }
                      ]
                    },
                    {
                      "featureType": "transit.station",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#eeeeee"
                        }
                      ]
                    },
                    {
                      "featureType": "water",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#c9c9c9"
                        }
                      ]
                    },
                    {
                      "featureType": "water",
                      "elementType": "labels.text",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "water",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#9e9e9e"
                        }
                      ]
                    }
                  ]
      }



    //FireBase Setup
    /**
      * Reference to Firebase database.
      * @const
      */
      var firebase = new Firebase('https://azaz-3f0dd.firebaseIO.com');

      /**
      * Data object to be written to Firebase.
      */
      var data = {
        sender: null,
        timestamp: null,
        lat: null,
        lng: null
      };
      
            //Create Radius
      /*
      var vancouver =  {
        center: {lat: 49.25, lng: -123.1},
        population: 603502,
        radius: 1000000
      }
      */
      var circle = {
        health: 100.0,
        center: {lat: 49.25, lng: -123.1},
        radius: 600000,
        fillOpacity: 0.6,
        strokeOpacity: 0.8,
        strokeWeight: 2
      };
      
      
      
      

      
      
      // Heatmap data: 500 Points
      
      function getPoints() {
        return [
          new google.maps.LatLng(37.782551, -122.445368),
          new google.maps.LatLng(37.782745, -122.444586),
          new google.maps.LatLng(37.782842, -122.443688),
          new google.maps.LatLng(37.782919, -122.442815)]
      }
      
      
      
       /**
       * Set up a Firebase with deletion on clicks older than expirySeconds
       * @param {!google.maps.visualization.HeatmapLayer} heatmap The heatmap to
       * which points are added from Firebase.
       */
      function initFirebase(heatmap) {

        // 5 minutes before before current time.
        var startTime = new Date().getTime() - (60 * 10 * 1000);

        // Reference to the clicks in Firebase.
        var clicks = firebase.database().ref('clicks');

        // Listener for when a click is added.
        clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
          function(snapshot) {

            // Get that click from firebase.
            var newPosition = snapshot.val();
            var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
            var elapsed = new Date().getTime() - newPosition.timestamp;

            // Add the point to  the heatmap.
            heatmap.getData().push(point);

            // Requests entries older than expiry time (15 Seconds).//2.8
            var expirySeconds = Math.max(60 * 3 * 1000 - elapsed, 0);
            // Set client timeout to remove the point after a certain time.
            window.setTimeout(function() {
              // Delete the old point from the database.
              //window.alert("KEY IS: "  snapshot.key);
              clicks.child(snapshot.key).remove();//should delete
              var heatmapData = heatmap.getData();
              heatmapData.removeAt(0);
            }, expirySeconds);
          }
        );

        // Remove old data from the heatmap when a point is removed from firebase.
        clicks.on('child_removed', function(snapshot, prevChildKey) {
          var heatmapData = heatmap.getData();
          //delete at index 0 everytime.  deletes the from the bottom of the stack.
          //heatmapData.pop();//Removes last entry in the heatmapData
          /* Debugging information. 
          var length = heatmapData.getLength();
          var arr = heatmapData.getArray();
          
          var str = "";
          for (var i = 0; i < length; i++)
          {
            str = str + "\n"+arr[i] + "("+i+")";
          }
          window.alert(str);
          */ 
          heatmapData.removeAt(0);
        });
        
      }
      
      
       /**
       * Updates the last_message/ path with the current timestamp.
       * @param {function(Date)} addClick After the last message timestamp has been updated,
       *     this function is called with the current timestamp to add the
       *     click to the firebase.
       */
      function getTimestamp(addClick) {
        // Reference to location for saving the last click time.
        var ref = firebase.database().ref('last_message/' + data.sender);

        ref.onDisconnect().remove();  // Delete reference from firebase on disconnect.

        // Set value to timestamp.
        ref.set(Firebase.ServerValue.TIMESTAMP, function(err) {
          if (err) {  // Write to last message was unsuccessful.
            console.log(err);
          } else {  // Write to last message was successful.
            ref.once('value', function(snap) {
              addClick(snap.val());  // Add click with same timestamp.
            }, function(err) {
              console.warn(err);
            });
          }
        });
      }

      /**
       * Adds a click to firebase.
       * @param {Object} data The data to be added to firebase.
       *     It contains the lat, lng, sender and timestamp.
       */
      function addToFirebase(data) {
        getTimestamp(function(timestamp) {
          // Add the new timestamp to the record data.
          data.timestamp = timestamp;
          var ref = firebase.database().ref('clicks').push(data, function(err) {
            if (err) {  // Data was not written to firebase.
              console.warn(err);
            }
          });
        });
      }
        
        
      /**
      * Starting point for running the program. Authenticates the user.
      * @param {function()} onAuthSuccess - Called when authentication succeeds.
      */
      function initAuthentication() {
        firebase.auth().signInAnonymously().catch(function(error) {
          if (error) {
            console.log('AZ - Login Failed!', error);
          } else {
            console.log('AZ - Login Successful!');
            data.sender = authData.uid;
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
              // User is signed in.
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;
              // ...
              } else {
              // User is signed out.
              // ...
              }
              // ...
            });
          }
        });
      }
        
        
        
        
      function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12, 
          streetViewControl: false,
          mapTypeControl: false,
          styles: mapStyle,
          maxZoom: 6, //12
          minZoom: 1, //12
          disableDoubleClickZoom: true
        });
                

        
        

        // Menu HudControl
        
        var centerControlDiv = document.createElement('div');
        centerControlDiv.style['padding-top'] = '10px';
        var centerControl = new HudControl(centerControlDiv, map);
        centerControlDiv.index = 1;
        //This code is the part that adds to the google map...
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
       
        var rightControlDiv = document.createElement('div');
        rightControlDiv.style['padding-top'] = '10px';
        var rightControl = new HudControlRightSide(rightControlDiv, map);
        rightControlDiv.index = 1;
        //This code is the part that adds to the google map...
        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(rightControlDiv);
        
       
        // Geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geopos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(geopos);
          }, function() {
            // Error Handling
          });
        } else {
          // Browser doesn't support Geolocation
          // Error Handling
        }
        
        
        
        
        var center;
       //Listen for clicks and add the location of the click to firebase.
        map.addListener('click', function(e) {
         shotFired(e);
        });
        
        

        // Create a heatmap.
        heatmap = new google.maps.visualization.HeatmapLayer({
          map: map,
          radius: mapRadius
        });
        
        //check for circle every 20 seconds.
        setInterval(function(e){
          if (circlesOnMap == 0){
            //call incomming transmission to populate circles on a map.
            incommingTransmission();
            
          }
          else {
            //debugging
            //window.alert("circlesOnMap="+circlesOnMap + "circleHealth="+circle.health);
            //update location to find a disaster area.
            //window.alert(pos.lat);
            
          }
          incommingTransmissionUI()
        }, 20 * 1000);
      
        
        
        
        
        
        
        initAuthentication(initFirebase(heatmap));
        
      }//initMap()
      
    
     
      
      
      
      
    //Game Functions:
    
    //When a clikc is made map to shoot at some thiing.
    function shotFired(e){
       data.lat = e.latLng.lat();
          data.lng = e.latLng.lng();
          
          if (scatterShot) {
            //do a scatterShot when you click.
            //set shot damage to ScatterShot Damage.
            shotDamage = 25
            addToFirebaseScatterShot(data, scatterShotAmount, data.lat, data.lng);
          }
          else if (pulseShot)
          {
            //set shot damage to pulseshot damage
            shotDamage = 10;
            addToFirebasePulseShot(data, pulseShotAmount);
          }
          else {
            //Single Fire Click
            shotDamage = 6;
            addToFirebase(data);
          }
    }
    
    //code for damaging a circle and eventually removing from the map.
    function damageCircle(circles) {
          if ((circle.health - shotDamage) > 15.0) {
            //Update the health of the circle based on users shotDamage
            circle.health = circle.health - shotDamage;
            var newOpacity = circle.health/100.0;
            //window.alert("newOpacity="+newOpacity);
            //update the graphics of the circle.
            circle.fillOpacity = newOpacity;
            circle.strokeOpacity = newOpacity;
            //window.alert("fillOpacity is: "+circle.fillOpacity);
          
          circles.setOptions({fillOpacity: circle.fillOpacity, strokeOpacity: circle.strokeOpacity});
          }
          else {
            //animate the circle to colapse on itself....
            circleAnimationDeath(circles);
            circlesOnMap = 0;//remove the circle from the map.
            //circlesOnMapCenter = null;
          }
    }
    
    function circleAnimationDeath(circle){
      //make the circle implode on itself
      //Example animation code.
      circle.setRadius(circle.radius);
      var circleRadiusOriginal  = circle.getRadius();
      var circleRadius15percent = circleRadiusOriginal * 0.1;
          window.setInterval(function() {
            ///first colapse circle to 15% of its size.  
            if (circle.getRadius() > circleRadius15percent){
              circle.setRadius(circle.getRadius()*0.97);
            }
            //then grow circle to 70% of its original size. Then colapse and die.
            else {
                circle.setMap(null);//whipe out the circle
                return;
            }
            return;
        }, 20);
    }
    
    //Possibly like Incomming transmission.
    function newCircle()
    {
        //create data for a circle.
        //create an array of circle data
        //Latitude: -84 to +84 (actually -85.05115 for some reason)
        //Longitude: -179 to +179
        var randLat = ((Math.random() * 85) + 1);
        var randlng = ((Math.random() * 179) + 1);
        var randRadius = ((Math.random() * 1000000) + 10000);
        //addin If to randomly inverse the +/- value.  Leaving out for testing...
        
        
        // I think javascript remembers this variable.  So since the code gets re used, the variables end up not being updated.
        //I add this as a check to ensure that the circle health gets reset to 100%.
        if (circle.health != 100){
          //debugging
          //window.alert("circle health needed to be adjusted");
          circle.health = 100.0;
        }
        
        
        var circleData = {
        health: 100.0,
        center: {lat: randLat, lng: randlng},
        radius: randRadius,
        fillOpacity: 0.6,
        strokeOpacity: 0.8,
        strokeWeight: 2
      };
        
        //Circles
        var newCircle = new google.maps.Circle({
            strokeColor: '#b35ae2',
            strokeOpacity: circleData.strokeOpacity,
            strokeWeight: circleData.strokeWeight,
            fillColor: '#b35ae2',
            fillOpacity: circleData.fillOpacity,
            map: map,
            center: circleData.center,
            radius: circleData.radius
          });
          return newCircle;
          
        //Random generate number of circles to create.
        //set circles ont o the map.
        /*
        for (var city in citymap) {
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: citymap[city].center,
            radius: Math.sqrt(citymap[city].population) * 100
          });
        }
        */
    }
    
    function incommingTransmission(){
      //Load Multiple circles onto the map.
      
      //load one circle onto the map.
       var circles = newCircle();
       circlesOnMap++;
       circlesOnMapCenter = circles.center;
       var date = new Date();
       circlesOnMapTimestamp = date.getTime();
       
       //window.alert(circles.center);
      
      //loop through this.
      //Radius onlick Event function.
        circles.addListener('click', function(e){
          shotFired(e);
          damageCircle(circles);
          //circles.push(generateCircle());
        });
    }
    
    //Functoin to update the UI based on incomming transmission.
    function incommingTransmissionUI(){
      //if circlesOnMap is true.
      if (circlesOnMap == 0){
        
        //Change text and Background Color.
        document.getElementById("incommingTransmissionUI").style.backgroundColor = "#c8cbd1";
        
      }
      else if (circlesOnMap == 1){
        //if circle was just recently put on a map. Update to pink.  Else change color back to grey.
        var date = new Date();
        if ((circlesOnMapTimestamp + 5000) > date.getTime()) {
          document.getElementById("incommingTransmissionUI").style.backgroundColor = "#f731ea";
        }
        else {
            document.getElementById("incommingTransmissionUI").style.backgroundColor = "#c8cbd1";
        }
          
      }
      else {
        //Revert to default.
      }
      
      
    }//end incommingTransmisionUI()
    
    
    function disasterLocator(map) {
    //update the arrows based on users current screen location.  
    var center = map.getCenter();
    
    var disasterLocation = [
          center,
          circlesOnMapCenter
        ];
        window.alert(center);
        window.alert(circlesOnMapCenter);
        
        var disasterLocation = new google.maps.Polyline({
          path: disasterLocation,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        disasterLocation.setMap(map);
    }
    
    
    //ScatterShotToggle.  This is Toggle on/off button for the hud.
    function scatterShotToggle()
    {
      if (scatterShot){
        scatterShot = false;
        //do other stuff
        //set css backgroud color to grey #c8cbd1
        document.getElementById("scatterShotUI").style.backgroundColor = "#c8cbd1";
      }
      else {
        scatterShot = true;
        pulseShot = false;//Disable other Shots
        //do other stuff
        //set css background color to green (for on)
      //Debugging
      //window.alert("AZ - ScatterShot is :" + scatterShot);
      //change color of background color on button. red:  #dd4230 green: #44996d
      document.getElementById("scatterShotUI").style.backgroundColor = "#dd4230";
      //PulseShot to False.
      document.getElementById("pulseShotUI").style.backgroundColor = "#c8cbd1";
      }
    }
    
    //ScatterShot code to add a bunch of points into the firebase.
    
    function addToFirebaseScatterShot(data, i, original_lat, original_lng) {
      //if out out of scattershots then break out of recursive.
      if ((i-1) < 0) return;

      //coord example: 
      //52.62972886718355
      //00.5658267301273225
      //-119.22802534521364
      //Modify coordinates lat and lng
      /*  The problem is something to do with the random generators */
      
      var lat_new_part = ((Math.random() * 3.14159)).toFixed(14);
      //window.alert(lat_new_part);
      var lat_new_part = parseFloat(lat_new_part);
      //window.alert("2 - "+lat_new_part);
      
      //seems to be a bug where the coord wont get deleted if the parseFloat is used.
      //parseInt works no problem though
      
      //Fibonacci: 1.61803
      //pi: 3.14159
      var lng_new_part = ((Math.random() * 3.14159)).toFixed(14);
      var lng_new_part = parseFloat(lng_new_part);
      //window.alert("lat_new_part: " + lat_new_part + "\nlng_new_part: " + lng_new_part);
      
      //Use random() to randomize add/sub value for lat.
      if ( Math.floor( ((Math.random() * 2) + 1) -1) ) {
        //add lat
        var tmp_lat = original_lat + lat_new_part
        tmp_lat = tmp_lat.toFixed(13);
        data.lat = tmp_lat;
      }
      else {
        //subtract lat
        var tmp_lat = original_lat - lat_new_part;
        tmp_lat = tmp_lat.toFixed(13);
        data.lat = tmp_lat;
      }
      
      //Uses random() to randomize add/sub value for lng.
      if ( Math.floor( ((Math.random() * 2) + 1) -1) ) {
        //add lat
        var tmp_lng = original_lng + lng_new_part;
        tmp_lng = tmp_lng.toFixed(13);
        data.lng = tmp_lng;
      }
      else {
        //subtract lat
        var tmp_lng = original_lng - lng_new_part;
        tmp_lng = tmp_lng.toFixed(13);
        data.lng = tmp_lng;
      }
      //window.alert("original then modified\n"+"lat="+original_lat+"\nlat="+data.lat+"\nlng="+original_lng+"\nlng="+data.lng);
      
      
      setTimeout(function() {
      /*
      window.alert("Loop Interval: " + i 
      + "\n data.lat="+data.lat +" data.lng="+data.lng
      + "\n lat_adjust="+lat_adjust);
      *
      */
        getTimestamp(function(timestamp) {
          // Add the new timestamp to the record data.
            data.timestamp = timestamp;
            // Add the point to  the heatmap.
            var point = new google.maps.LatLng(data.lat, data.lng);
            heatmap.getData().push(point);
            //add Point to firebase
            var ref = firebase.database().ref('clicks').push(data, function(err) {
            if (err) {  // Data was not written to firebase.
              console.warn(err);
            }
          });
        });
        --i;
        addToFirebaseScatterShot(data, i, original_lat, original_lng)
      }, 75)//timeout
      
   
    }//function addToFirebaseScatterShot(data)
    
    
    
    //PulseShotToggle.  This is Toggle on/off button for the hud.
    function pulseShotToggle()
    {
      if (pulseShot){
        pulseShot = false;
        //do other stuff
        //set css backgroud color to grey #c8cbd1
        document.getElementById("pulseShotUI").style.backgroundColor = "#c8cbd1";
    }
      else {
        pulseShot = true;
        scatterShot = false;//Disable other Shot Types.
        //do other stuff
        //set css background color to green (for on)
      //Debugging
      //window.alert("AZ - PulseShot is :" + pulseShot);
      //change color of background color on button. red:  #dd4230 green: #44996d
      document.getElementById("pulseShotUI").style.backgroundColor = "#dd4230";
      //ScatterShot to False.
      document.getElementById("scatterShotUI").style.backgroundColor = "#c8cbd1";
      }
    }
    
    //PulseShot code to add a bunch of points into the firebase.
    function addToFirebasePulseShot(data, i) {
      if (i < 1) return;
      
      setTimeout(function() {
        getTimestamp(function(timestamp) {
          // Add the new timestamp to the record data.
            data.timestamp = timestamp;
            var ref = firebase.database().ref('clicks').push(data, function(err) {
            if (err) {  // Data was not written to firebase.
              console.warn(err);
            }
          });
        });
        addToFirebasePulseShot(data, --i)
      }, 75)//timeout
      
      
    }//function addToFirebasePulseShot(data)
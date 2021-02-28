(function (){
    
    const https = require('https');
    const towns = require('./towns.json');
    var fs = require('fs');

    let id = 0;
    const languages = [ "JavaScript", "ReactJS", "NodeJS", "Python", "HTML", "CSS", "C++", "TypeScript",
                        "Rust", "Java", "Kotlin", "C#", "Perl", "PHP", "Scala", "Swift", "MATLAB",
                        "SQL", "Go", "Ruby"]

    
    
    
    function get(){

        https.get('https://api.namefake.com/deutschland/', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
            //console.log(JSON.parse(data));
            loadData(JSON.parse(data));
        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

    let featuresCollection = {"type": "FeatureCollection", "features": []}
    let feature = {
            "type":"Feature",
            "id": "",
            "geometry":{
                "coordinates":[],
                "type":"Point"},
            "properties":{
                "city":"",
                "about":"",
                "state":"",
                "name": "",
                "username":"",
                "img" : "",
                "company":""
            }
    }
    

    function loadData(data){
    
        let positionInfo = getTown();

        feature.id = id;
        feature.geometry.coordinates = [positionInfo.lng, positionInfo.lat];
        feature.properties.name = data.name;
        feature.properties.username = data.username;
        feature.properties.city = positionInfo.city
        feature.properties.state = positionInfo.admin_name;
        feature.properties.about = getAbout(data.sport);
        feature.properties.company = data.company;
        
        console.log(feature)

        fs.readFile('./demo.json', function(err, data) {
            if (err) throw err;

            var json = JSON.parse(data)                
            json.features.push(feature);


            fs.writeFile('./demo.json', JSON.stringify(json), err => {
                if (err) {
                  console.error(err)
                  return
                }
            })
            
        });        

        id++;

    }

    function getRandom(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    function getAbout(sport){        
        let about = ''
        let random = getRandom(languages);
        about = random;
        random = getRandom(languages);
        random == about ? getRandom(languages): about = about+', '+ random;
        about = about + ', ' + sport;
        return about;
    }

    function getTown(){
        return  getRandom(towns)
    }


    async function generate(){
        await get(); 
    }
    
    var timer = setInterval(
        
        function(){ 
            
            generate();       

            if(id==1000){
                
                clearInterval(timer);
                
            }
        }, 2000);
    

    
})()
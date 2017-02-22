var express = require('express');
var app = express();

function month (m){
    switch (m){
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
        
    }
}

function checkDate(d){
    if (Object.prototype.toString.call(d) === "[object Date]"){
        if (isNaN(d.getTime())) {
            return false
        } else {
            return true
        }
    } else {
        return false
    }
}
app.get('/', function(req,res){
        res.sendFile(__dirname + '/index.html');
})
app.get('*', function(req, res){
    if (req.url == '/'){
        res.sendFile(__dirname + '/index.html');
    }
    var request = req.url.slice(1, req.url.length);
    if (!isNaN(request)){
        var date = new Date(request*1000);
    }
    if (date){
        //we have unix date and can process it
        var response = {
            'unix': request,
            'natural': month(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear()
        }
        res.send(response);
    }
    request = request.split('%20').join(' ');
    //var date = request.match(/January|February|March|April|May|June|July|August|Septemper|October|November|December\s\d{2}[,]\s\d{4}/);
    if (request.match(/January|February|March|April|May|June|July|August|Septemper|October|November|December\s\d{2}[,]\s\d{4}/)) {
        //we have natural date
        var date = new Date(request);
        if (checkDate(date) && date.getDate() == request.split(' ')[1].substring(0,2)) {
            var response = {
                'unix' : ((new Date(request)).getTime()/1000).toString(),
                'natural': request
            }
            res.send(response);
        } else res.send('Not valid date!');
    } else {
        res.send('Not valid date!');
    }
    
})

app.listen(8080, function(){
    console.log('app listening on port 8080');
});
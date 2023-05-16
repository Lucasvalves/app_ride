function createNewRide(){ //função que cria registros
  const rideID = Date.now(); //pega o momento exato que o usuario apertar start
  const rideRecord = { //registra 
      data:[],
      startTime: rideID,
      stopTime: null
  }  
  saveRideRecord(rideID, rideRecord);
  return rideID
}
function deleRide(rideID){
  localStorage.removeItem(rideID) //deletando dado de percuso do localStorage
}

function getAllRides(){ //gunção que pega todos os dados do localStorage
  return Object.entries(localStorage) //transformandos os dados do localStorage em uma array 
}
function getRideRecord (rideID){
  return JSON.parse(localStorage.getItem(rideID))
}
function saveRideRecord(rideID, rideRecord){
  localStorage.setItem(rideID, JSON.stringify(rideRecord));
}

function addPosition(rideID, position){

  const rideRecord = getRideRecord(rideID);
  const newData = {
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed,
    timestamp: position.timestamp
}
  rideRecord.data.push(newData);
  saveRideRecord(rideID, rideRecord);
}

function updateStopTime(rideID){
  const rideRecord = getRideRecord(rideID);
  rideRecord.stopTime = Date.now();
  saveRideRecord(rideID, rideRecord)
}


async function getLocationData(latitude, longitude){ //função para pegar achar a cidade que iniciou a corrida através da localização
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en` //consumindo api de localização
    const response = await fetch(url)
    return await response.json()

}

function getMaxSpeed(positions){//função que pega a velocidade maxima
    let maxSpeed = 0

    positions.forEach(position =>{
        if(position.speed != null && position.maxSpeed > maxSpeed){ //se a velocidade atual do position speed for diferente de nullo e maior que a ultima velocidade resgistrada
            maxSpeed = position.speed //a velocidade maxima registrada recebe a possition speed
        }
    })

    return (maxSpeed * 3.6).toFixed(1) //transformando a velocidade em km/h e limitando as casa decimais
}


function getDistance(positions){ //função que pega a distancia percorrida
    const earthReadiusKm = 6371 //o raio de quilometros da terra
    let totalDistence = 0
    for (let i= 0; i< positions.length-1; i++) {
        const p1 = {
            latitude:positions[i].latitude,
            longitude:positions[i].longitude
        };
        const p2 = {
            latitude:positions[i+1].latitude,
            longitude:positions[i+1].longitude
        };

        const deltaLatitude = toRad(p2.latitude - p1.latitude) 
        const deltaLongitude = toRad(p2.longitude - p1.longitude)
        
        const a = Math.sin(deltaLatitude/2) * 
        Math.sin(deltaLatitude / 2) +
        Math.sin(deltaLongitude / 2) * 
        Math.sin(deltaLongitude/ 2) * 
        Math.cos(toRad(p1.latitude)) * 
        Math.cos(toRad(p2.latitude))

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) 
        
        const distance = earthReadiusKm * c

        totalDistence += distance
    }
    
    function toRad(degree){
        return degree * Math.PI / 180;
    }
    return totalDistence.toFixed(2) //quilometros percorridos
}

function getDuration(ride){//função para saber a duração da corrida

    function format(number, digits){
        return String(number.toFixed(0)).padStart(2, '0')
    }
    const interval = (ride.stopTime - ride.startTime) /1000 //transformando em segundos
    
    const minutes = Math.trunc(interval / 60)
    const seconds = interval % 60

    return `${format(interval, 2)}: ${format(seconds, 2)}`

}


function getStartDate(ride) { //função para saber a data
    d = new Date(ride.startTime)

    const day = d.toLocaleString("en-US", {day:"numeric"}) //pegando dia //const day = d.localeScrint("pr-BR", {day:"numeric"}) se quier exibir em portugues
    const month = d.toLocaleString("en-US", {month:"short"}) //pegando mês
    const year = d.toLocaleString("en-US", {year:"numeric"}) //pegando ano
    
    const hour = d.toLocaleString("en-US", {hour:"2-digit", hour12:false}) //pegando hora
    const minute = d.toLocaleString("en-US", {year:"2-digit"}) //pegando minuto

    return `${hour}:${minute}-${month} ${day}, ${year}`
}
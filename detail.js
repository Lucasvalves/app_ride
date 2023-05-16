const params =  new URLSearchParams(window.location.search)
const rideID = params.get("id")

const ride = getRideRecord(rideID)

    document.addEventListener("DOMContentLoaded", async ()=>{

    const fristPosition = ride.data[0]//pegando a posição que a corrida começou
    const fristLocationData = await getLocationData(fristPosition.latitude, fristPosition.longitude) //mandando a localização que foi pega no data


    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"

    const cityDiv = document.createElement("div")
    cityDiv.innerText =  `${fristLocationData.city} - ${fristLocationData.countryCode}`
    cityDiv.className = "text-primary mb-2"

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} Km/h`// exibindo a velocidade maxima
    maxSpeedDiv.className = "h5"

    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`

    const durationDiv = document.createElement("div") //criando a duração da corrida
    durationDiv.innerText = `Distance: ${getDuration(ride)} Km`

    const dateDiv = document.createElement("div") //mostrando a data da corrida
    dateDiv.innerText = getStartDate(ride)
    dateDiv.className = "text-secondary mt-2"

    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)  
    dataElement.appendChild(distanceDiv) 
    dataElement.appendChild(durationDiv) 
    dataElement.appendChild(dateDiv) 

    document.querySelector("#data").appendChild(dataElement)

    const deleteButton = document.querySelector("#deleteBtn")

    deleteButton.addEventListener("click", ()=>{
        deleRide(rideID) //deletando dado de percuso
        window.location.href = "./" //voltando pra tela inicial
    })

    const map = L.map("mapDetail", { //criando o mapa
        attributionControl: false //tirando o simbolo do leaflet
    })
    //https://leaflet-extras.github.io/leaflet-providers/preview/ // para ver opções de mapas

    map.setView([fristPosition.latitude, fristPosition.longitude],13)
    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 20,
    }).addTo(map);
    
    const positionsArray = ride.data.map(position=>{ //pegando o percurso feito
        return [position.latitude, position.longitude]
    })

    const polyline = L.polyline(positionsArray, {color:"#F00"}) //marcando o percurso feito
    polyline.addTo(map)


    map.fitBounds(polyline.getBounds()) //para dar um zoom maior no trajeto
})  
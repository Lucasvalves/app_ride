const rideListElement = document.querySelector("#rideList")
const allRides = getAllRides();// pegando getAllRides() e atribuindo ama variavel

allRides.forEach( async([id,value])=>{
    const ride =JSON.parse(value)
    ride.id =id

    const itemElement = document.createElement("li")//const itemElement = `<li> valor</li>` mesma coisa
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3"
    rideListElement.appendChild(itemElement)
    
    itemElement.addEventListener("click", ()=>{
        window.location.href = `./detail.html?id=${ride.id}`
    })

    const fristPosition = ride.data[0]//pegando a posição que a corrida começou
    const fristLocationData = await getLocationData(fristPosition.latitude, fristPosition.longitude) //mandando a localização que foi pega no data

    const mapID = `map${ride.id}`
    const mapElement = document.createElement("div")
    mapElement.id = mapID
    mapElement.style = "width:100px;height:100px;"
    mapElement.classList.add("bg-secondary")
    mapElement.classList.add("rounded-4")

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
    
    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    const map = L.map(mapID, { //criando o mapa
        attributionControl: false, //tirando o simbolo do leaflet
        zoomControl: false, //tirandoo os controles de zoom do mapa
        dragging: false, //bloquendo para o mapa não poder ser mexido
        scrollWheelZoom: false //tirando o scrool
    })    
    map.setView([fristPosition.latitude, fristPosition.longitude],13)
    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 20,
    }).addTo(map);
    L.marker([fristPosition.latitude, fristPosition.longitude]).addTo(map)//colcoando um marcador no mapa
})

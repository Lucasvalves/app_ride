const speedElement = document.querySelector("#speed")
const startButton =  document.querySelector("#start")
const stopButton =  document.querySelector("#stop")


let watchID = null;
let currentRide = null;

//função que trata o evento de click no botão start
startButton.addEventListener("click", ()=>{
  if(watchID)
    return

  function handleSuccess(position){ //função para retornar a velocidade
    addPosition(currentRide, position); 
    console.log(position)
    speedElement.innerText = position.coords.speed ?
     (position.coords.speed * 3.6).toFixed(1) : 0 //acessando a propriedade de velocidade e transformando de metros por segundos para quilometros por hora
  }
  function handleError(error){//função caso retorne erro
    console.log(error.msg, "erro")
  }
  const options = {enableHighAccuracy:true}
  currentRide = createNewRide();//passando a função que cria resgistros de velocidade
  watchID = navigator.geolocation.watchPosition(handleSuccess,handleError,options)  //navigation é o objeto que trás a api de geolocalização
  startButton.classList.add("d-none")  // assim que o botão start é clicado ele sai adicionando a class d-none
  stopButton.classList.remove("d-none") //e o stop é exibido removendo a class d-none
})

//função que trata o evento de click no botão stop
stopButton.addEventListener("click", () => {
  if(!watchID)
    return
  navigator.geolocation.clearWatch(watchID) 
  watchID = null;
  updateStopTime(currentRide);
  currentRide = null;
  startButton.classList.remove("d-none") //e o start é exibido removendo a class d-none
  stopButton.classList.add("d-none")  // assim que o botão stop é clicado ele sai adicionando a class d-none

  window.location.href = "./" //voltando pra tela inicial
})
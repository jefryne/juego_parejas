let cantidadCartas=8;
let parar=4;
let pararAuxliar=parar;
let numeroRamdom= Math.floor(Math.random() * 150+1); 
let numeroRamdom2= Math.floor(Math.random() * parar); 
let cartasseleccionadas=[];
let ordenCartas=[];
let ordenCartas2=[];
let cartasComparar=[];
let valorIndexOf = ordenCartas.indexOf(numeroRamdom)
let valorIndexOf2 = ordenCartas.indexOf(numeroRamdom2)
let pokemones=[];
for(let j = 0;j<parar;j++){
    valorIndexOf = ordenCartas.indexOf(numeroRamdom)
    if(valorIndexOf==-1){
        ordenCartas.push(numeroRamdom);
    }else{
        parar++;
    }
    numeroRamdom= Math.floor(Math.random() * 150+1)
}
parar=pararAuxliar
for(let j = 0;j<parar;j++){
    valorIndexOf2 = ordenCartas2.indexOf(numeroRamdom2)
    if(valorIndexOf2==-1){
        ordenCartas2.push(numeroRamdom2);
    }else{
        parar++;
    }
    numeroRamdom2= Math.floor(Math.random() * pararAuxliar)
}
parar=pararAuxliar

const fechinData2 = async () =>{
    try{
        for(let l =0; l<cantidadCartas; l++){
            if(l<parar){
                const  res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ordenCartas[l]}`);
                const data = await res .json();
                pokemones.push(data)
            }else{
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ordenCartas[ordenCartas2[l-parar]]}`);
                console.log(ordenCartas[ordenCartas2[l-parar]]);
                const data = await res .json();
                pokemones.push(data)
            }
        }
    
        crearCartas(pokemones)
        animarCartas()
    }catch (err){
        console.log(err)
    }
}
fechinData2()




console.log(ordenCartas);
console.log(ordenCartas2)

let cartas = document.getElementsByClassName("card-grid");
let cartasConLaClaseVolteo = document.getElementsByClassName("volteo");
function animarCartas(){
        $(".card-grid").flip({
            trigger: 'manual'
        });
        $(".card-grid").flip(true);
}

const crearCartas = (pokemon) => {
    return new Promise((resolve, reject) => {
        for(let i=0; i<cantidadCartas; i++){
            if(i<parar){
                let carta = `<div class="front">
                <figure>
                    <img src="`+pokemon[i].sprites.other.dream_world.front_default+`" class="card-img-top img-fluid colo9rfondo  " alt="...">
                    <figcaption >
                        <p class="text-center">`+ordenCartas[i]+`</p>
                    </figcaption>
                </figure>
                </div>
                <div class="back">
                    <img src="img/partedeatras.jpg"  class="card-img-top colo9rfondo" alt="...">
                </div>`;
                cartas[i].innerHTML=carta; 
            }else{
                let carta = `<div class="front">
                <figure>
                    <img src="`+pokemon[i].sprites.other.dream_world.front_default+`" class="card-img-top img-fluid  colo9rfondo" alt="...">
                    <figcaption >
                        <p class="text-center">`+ordenCartas[ordenCartas2[i-parar]]+`</p>
                    </figcaption>
                </figure>
                </div>
                <div class="back">
                    <img src="img/partedeatras.jpg"  class="card-img-top colo9rfondo" alt="...">
                </div>`;
                cartas[i].innerHTML=carta; 
            }
            
        }
        resolve (crearCartas);
        
    });
}

for(let k=0; k<cantidadCartas; k++){
    cartas[k].addEventListener('click', () => {
        $("#carta_"+(k+1)).flip(false);
        cartasComparar.push(cartas[k].textContent);
        cartasseleccionadas.push(k);
        if(cartasComparar.length==2){
            if(cartasComparar[0]==cartasComparar[1]){
                cartas[cartasseleccionadas[0]].classList.remove('volteo');
                cartas[cartasseleccionadas[1]].classList.remove('volteo');
                cartasComparar=[];
                cartasseleccionadas=[];
            }else{
                
                setTimeout(()=>{
                    $(".volteo").flip(true);
                }, 500)
                cartasComparar=[];
                cartasseleccionadas=[];
            }
        }
        cartasConLaClaseVolteo = document.getElementsByClassName("volteo");
        
        if(16-cantidadCartas==cartasConLaClaseVolteo.length){
            Swal.fire({
                title: 'Ganaste!',
                text: 'Haz ganado un PoKemon.',
                imageUrl: 'img/ganador.png',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                html: `<button onclick="recargar()">
    <span class="button_top"> Volver a jugar
    </span>
    </button>`
                })
        }
    })
}



let botonesLuz1 = document.getElementById("onoff1");
let botonesLuz2 = document.getElementById("onoff2");
let botonesLuz3 = document.getElementById("onoff3");
  

botonesLuz1.addEventListener('click', ()=>{
    location.href ='index.html';
})
botonesLuz2.addEventListener('click', ()=>{
    location.href ='prueba.html';
})
botonesLuz3.addEventListener('click', ()=>{
    location.href ='prueba2.html';
})
function recargar(){
    window.location.reload();
}
  
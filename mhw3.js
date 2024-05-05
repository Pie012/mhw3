/// funzioni barra di ricerca a comparsa
function BarraOn(event){
    const barra = event.currentTarget;  /// gestisce l'evento


    const logo = document.querySelector('#logo');  // con questo selettore selezioniamo il div con id = logo
    logo.classList.add("nascosto");                // con add gli aggiungiamo la classe nascosto

    const cerca = document.querySelector('#barra-ricerca');
    cerca.classList.remove("nascosto");
    event.preventDefault();

}

function BarraOff(event){
    const barra = event.currentTarget;  /// gestisce l'evento


    const logo = document.querySelector('#logo');  // con questo selettore selezioniamo il div con id = logo
    logo.classList.remove("nascosto");                // con add gli rimuoviamo la classe nascosto

    const cerca = document.querySelector('#barra-ricerca');
    cerca.classList.add("nascosto");
    event.preventDefault();

}

const barra = document.querySelector("#cerca");  //creata la costante barra è associata al selettore #cerca
barra.addEventListener('click',BarraOn);         //barra è in attesa (ascolto) dell'evento


const barra1 = document.querySelector("#ricerca");  //creata la costante barra1 è associata al selettore #ricerca
barra1.addEventListener('click',BarraOff);         //barra1 è in attesa dell'evento

/// fine barra di ricerca/////

// funzione che se passo sopra un imagine la sostiituisce con un altra nella galleria 'mouseenter' e 'mouseleave' ////
function CambioImage(event){
    const image = event.currentTarget;
    console.log('sono dentro');

    image.src = 'immagini/muso2.jpg'; 
}


const image = document.querySelector('#macchina');
image.addEventListener('mouseenter',CambioImage);



function RicambioImg(event){
    const image1 = event.currentTarget;
    console.log('sono fuori');

    image1.src = 'immagini/muso.jpg';
    
}


const image1 = document.querySelector('#macchina');
image1.addEventListener('mouseleave',RicambioImg);


//fare uno slider di immagini in modalità desktop
/// zona funzioni ///////

function slideDx(event){
    const destra = event.currentTarget;

    const contenitore = document.querySelector('#prod-item1');
    contenitore.classList.add('hidden');

    const contenitore1 = document.querySelector('#prod-item2');
    contenitore1.classList.remove('hidden');
    event.preventDefault();

}


function slideSx(event){
    const sinistra = event.currentTarget;

    const contenitore = document.querySelector('#prod-item1');
    contenitore.classList.remove('hidden');

    const contenitore1 = document.querySelector('#prod-item2');
    contenitore1.classList.add('hidden');
}

/// dichiarazione delle variabili che scatenano eventi ///

const destra = document.querySelector('#b_destra');
destra.addEventListener('click',slideDx);

const sinistra = document.querySelector('#b_sinistra');
sinistra.addEventListener('click',slideSx);

//slider immagini modalita telefono

function slideDx1(event){
    const destra = event.currentTarget;

    const contenitore = document.querySelector('#prod-item11');
    contenitore.classList.add('hidden');

    const contenitore1 = document.querySelector('#prod-item22');
    contenitore1.classList.remove('hidden');
    event.preventDefault();

}


function slideSx1(event){
    const sinistra = event.currentTarget;

    const contenitore = document.querySelector('#prod-item11');
    contenitore.classList.remove('hidden');

    const contenitore1 = document.querySelector('#prod-item22');
    contenitore1.classList.add('hidden');
}

/// dichiarazione delle variabili che scatenano eventi ///

const destra1 = document.querySelector('#b_destra');
destra1.addEventListener('click',slideDx1);

const sinistra1 = document.querySelector('#b_sinistra');
sinistra1.addEventListener('click',slideSx1);

//------ mwh3.js-----//
function visualizzaRisultatoGara(json) {
    console.log('adesso elaboro una risposta');

    const gara = json.MRData.RaceTable.Races[0];
    console.log(gara);

    const nomeGara = gara.raceName;
    const dataGara = gara.date;
    const vincitore = gara.Results[0].Driver.givenName + " " + gara.Results[0].Driver.familyName;
    const tempoVincitore = gara.Results[0].Time.time;

    console.log(nomeGara);
    console.log(dataGara);
    console.log(vincitore);
    console.log(tempoVincitore);

    const conteniroreRisultato = document.createElement('div');
    conteniroreRisultato.innerHTML = "<h2>Dettagli gara</h2>";

    const elementoNomeGp = document.createElement('p');
    elementoNomeGp.textContent = "Nome Gran Premio:" + nomeGara;
    conteniroreRisultato.appendChild(elementoNomeGp);
    
    const elementoDataGp = document.createElement('p');
    elementoDataGp.textContent = "Data Gran Premio:" + dataGara;
    conteniroreRisultato.appendChild(elementoDataGp);

    const elementoVincitoreGp = document.createElement('p');
    elementoVincitoreGp.textContent = "Vincitore:" + vincitore;
    conteniroreRisultato.appendChild(elementoVincitoreGp);

    const elementoTempoGp = document.createElement('p');
    elementoTempoGp.textContent = "Tempo del Pilota:" + tempoVincitore;
    conteniroreRisultato.appendChild(elementoTempoGp);

    const risultatoGara = document.querySelector('#risultatoGara');
    risultatoGara.innerHTML = '';
    risultatoGara.appendChild(conteniroreRisultato);

    
}

function Onresponse(response){
    console.log('Rischiesta effettuata in maniera corretta!')
    return response.json();
}
  
function trovaPilota(event){ 
    event.preventDefault(); // Impedisce il comportamento predefinito del form
    
    const position = document.querySelector('#position').value;
    const anno = document.querySelector('#anno').value;
    const round = document.querySelector('#round').value;

    const url = 'http://ergast.com/api/f1/' +  anno  + '/' + round + '/results/'+ position +'.json';
    console.log(url);
    
   
    const response = fetch(url)
        .then(Onresponse)      
        .then(visualizzaRisultatoGara);

    document.querySelector('#position').value = valoreSelectCamp.position;
    document.querySelector('#anno').value = valoreSelectCamp.serie;
    document.querySelector('#round').value = valoreSelectCamp.round;
    
    
}

const cerca = document.querySelector('#search') 
cerca.addEventListener('submit', trovaPilota);


const valoreSelectCamp = {
    serie : document.querySelector('#anno').value,
    round : document.querySelector('#round').value,
    position : document.querySelector('#position').value
};

//mw3.js Oauth2///
function onJson(json) {
    console.log('JSON ricevuto');
    console.log(json);

    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    const results = json.albums.items;
    let num_results = results.length;
    if(num_results > 12)
      num_results = 12;
    for(let i=0; i<num_results; i++)
    {
      const album_data = results[i]

      const title = album_data.name;
      const selected_image = album_data.images[0].url;
      const album = document.createElement('div');
      album.classList.add('album');

      const img = document.createElement('img');
      img.src = selected_image;

      const caption = document.createElement('span');
      caption.textContent = title;

      album.appendChild(img);
      album.appendChild(caption);

      library.appendChild(album);
    }
  }
  
  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function search12(event){
    event.preventDefault();
    const album_input = document.querySelector('#album');
    const album_value = encodeURIComponent(album_input.value);
    console.log('Eseguo ricerca: ' + album_value);

    fetch( url_spotify + album_value,
      {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse).then(onJson);

    document.querySelector('#album').value = '';

  }
  
  function onTokenJson(json)
  {
    console.log(json)
    // Imposta il token global
    token = json.access_token;
  }
  
  function onTokenResponse(response)
  {
    return response.json();
  }
  
  const client_id = '9d7a8d6278524a4a9823e47e539b9b31';
  const client_secret = 'e57f6b76291a4276a597020fff96c6ea'; 

  let token;
  // All'apertura della pagina, richiediamo il token
  fetch("https://accounts.spotify.com/api/token",
      {
     method: "post",
     body: 'grant_type=client_credentials',
     headers:
     {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
     }
    }
  ).then(onTokenResponse).then(onTokenJson);
  const form = document.querySelector('#spotify');
  form.addEventListener('submit', search12)
  const url_spotify = "https://api.spotify.com/v1/search?type=album&q=";
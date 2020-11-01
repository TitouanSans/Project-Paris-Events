
const favStorage = localStorage;
let favEvents = [];
console.log(favStorage);

// IMPLEMENTATION DU TERME RECHERCHE DANS UN URL PERSONNALISE
$('#submit').on('click', function (e) {
    e.preventDefault();
    let title = $('#title').val();
    let url = `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?search=${title}`

    console.log(url);
    onSubmit(url);
});

// AFFICHAGE DES 3 EVENEMENTS LES + RECENTS 
jQuery.ajax({
    url : 'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records', // La ressource ciblée
    dataType : 'jsonp' // Le type de la requête HTTP.
 })
.then((result) => {
    const results = result.records;
    console.log(results);

    for (let i = 0; i < 5; i++) {
        $('#new_events').append(`
            <article>
                <div id="${results[i].record.id}" onclick="detailsEvent(id)">
                    <img src="${results[i].record.fields.cover_url}" class="eventsCov"></img>
                    <h2>${results[i].record.fields.title}</h2>
                    <p>${results[i].record.fields.date_description}</p>
                    <p>${results[i].record.fields.lead_text}</p>
                </div>
                <button class="unfav btnFav" onclick="favClick(id)">Favoris</button>
            </article>
        `);
        
    };

});

function favClick(result) {
    console.log(result);
    if ($(`#btnFav`).attr('class') === 'unfav') {
        addFav(result);
        setFav(result);
    } else if ($(`#btnFav`).attr('class') === 'fav') {
        setUnfav(result);
        delFav(favEvents, result);
    }
};


// AFFICHAGE DES EVENEMENTS CORRESPONDANTS AUX TERMES DANS LA RECHERCHE
function onSubmit(url) {
    $('#events').empty();

    $.ajax({
        url: url,
        dataType: 'jsonp',
    }).then((result) => {

        const results = result.records;
        console.log(results);
        console.log(results.length);

        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                $('#resultMsg').empty();
                $('#resultMsg').append(
                    `Résultat(s)`
                );

                $('#events').append(`
                    <article>
                        <div id="${results[i].record.id}" onclick="detailsEvent(id)">
                            <img src="${results[i].record.fields.cover_url}" class="eventsCov"></img>
                            <h2>${results[i].record.fields.title}</h2>
                            <p>${results[i].record.fields.date_description}</p>
                            <p>${results[i].record.fields.lead_text}</p>
                        </div>
                        <button class="unfav btnFav" onclick="favClick(id)">Favoris</button>
                    </article>
                `);
        
            };
            // SI AUCUN EVENEMENTS CORRESPONDANTS
        } else {
            $('#resultMsg').empty();
            $('#resultMsg').append(
                `Aucun résultat, essayez d'autres mots-clés.`
            );
        }
    })
};

// AFFICHAGE D'UN EVENEMENTS EN DETAILS
function detailsEvent(id) {

    $('#page_title').empty();
    $('#new_events').empty();
    $('#events').empty();

    $.ajax({
        url: `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`,
        dataType: 'jsonp',
    }).then((result) => {

        const results = result.record.fields;
        
        $('#page_title').append(`
            <article class="flexDetails artDetails">
            
                <section class="secDetails">
                    <a href="javascript:history.go(0)"><button class="btnReload">Retour</button></a>
                    <h1>${results.title}</h3>
                    <img class="imgDetails" src="${results.cover_url}"></img>
                    <h2>${results.lead_text}</h2>
                    <p>${results.description}</p>
                    <button class="unfav btnFav">Favoris</button>
                </section>

                <section class="secDetails">
                    <h2>Dates</h2>
                    <p>${results.date_description}</p>
                    <h2>Prix</h2>
                    <p>${results.price_type}</p>
                    <p>${results.price_detail}</p>
                    <h2>Adresse</h2>
                    <p>${results.address_name}</p>
                    <p>${results.address_stree}</p>
                    <p>${results.address_zipcode} ${results.address_city}</p>
                    <h2>Contact</h2>
                    <i class="fas fa-home"></i> <a href="${results.contact_url}" target="blank">${results.contact_url}</a>
                    <p><i class="fas fa-phone-alt"></i> ${results.contact_phone}</p>
                    <p><i class="fas fa-envelope"></i> ${results.contact_mail}</p>
                    <a href="${results.contact_facebook}" target="blank"><i class="fab fa-facebook-square"></i> ${results.contact_facebook}</a>
                    <br><a href="${results.contact_twitter}" target="blank"><i class="fab fa-twitter"></i> ${results.contact_twitter}</a>
                </section>
            </article>
        `);
    })
};

// function addFav(result) {

//     if ($(`#${result.id}`).attr('class') === 'unfav') {
//         favEvents.push(result);
//         favStorage.setItem('favoris', JSON.stringify(favEvents));
//     }
// }

// function delFav(favEvents, result) {

//     let index;

//     for (let i = 0; i < favEvents.length; i++) {
//         if (favEvents[i].id === result.id) {
//             index = i
//         }
//     }
//     favEvents.splice(index, 1);
//     favStorage.setItem('favoris', JSON.stringify(favEvents));
// }

// function setFav(result) {
//     $(`#${result.id}`).empty();
//     $(`#${result.id}`).removeClass('unfav').addClass('fav');
// }

// function setUnfav(result) {
//     $(`#${result.id}`).empty();
//     $(`#${result.id}`).html('<i class="fas fa-plus fa-lg">');
//     $(`#${result.id}`).removeClass('fav').addClass('unfav');
// }
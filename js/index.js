
const favStorage = localStorage;
let favEvents = [];
console.log(favEvents);

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

    // AFFICHER 5 EVENEMENTS MAX
    for (let i = 0; i < 5; i++) {
        $('#newEvents').append(`
            <article>
                <div id="${results[i].record.id}" onclick="detailsEvent(id)">
                    <img src="${results[i].record.fields.cover_url}" class="eventsCov"></img>
                    <h2>${results[i].record.fields.title}</h2>
                    <p>${results[i].record.fields.date_description}</p>
                    <p>${results[i].record.fields.lead_text}</p>
                </div>
                <button class="btnUnfav" onclick="addFav(${results[i].record})">Favoris</button>
            </article>
        `);
        
    };

});

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
                        <button class="btnUnfav" onclick="addFav(${results[i].record})">Favoris</button>
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
    $('#newEvents').empty();
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
                    <button class="btnUnfav">Favoris</button>
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

        // ERREUR EN CAS DE VALEUR INEXISTANTE
        // if (document.querySelectorAll('p').innerHTML = 'null') {
        //     document.querySelectorAll('p').innerHTML = '';
        // } else if (document.querySelectorAll('p').innerHTML = 'undefined') {
        //     document.querySelectorAll('p').innerHTML = '';
        // }

    })
};

//[EN COURS]
// AFFICHAGE DES FAVORIS
if (favStorage.getItem('favoris')) {

    if (JSON.parse(favStorage.favoris).length > 0) {

        favEvents = JSON.parse(favStorage.getItem('favoris'));
        $.each(favEvents, function (index, fav) {
            $('#favEvents').append(`
                <article class='track'>
                    <div id="${fav.id}" onclick="detailsEvent(id)">
                        <img src="${fav.fields.cover_url}" class="eventsCov"></img>
                        <h2>${fav.fields.title}</h2>
                        <p>${fav.fields.date_description}</p>
                        <p>${fav.fields.lead_text}</p>
                    </div>
                    <button class="btnUnfav" onclick="addFav(${fav.id})">Favoris</button>
                </article>`
            )

        })

    } else {
        $('#favEvents').append(
            `<h2>Vous n'avez aucun favoris</h2>`
        )
    }

} else {
    $('#favEvents').html(`<h2>Vous n'avez aucun favoris</h2>`)
}

function addFav(result) {
    console.log(result);

    favEvents.push(result);
    favStorage.setItem('favoris', JSON.stringify(favEvents));
}


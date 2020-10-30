
const favStorage = localStorage;

jQuery.ajax({
    url : 'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records', // La ressource ciblée
    dataType : 'jsonp' // Le type de la requête HTTP.
 })
.then((result) => {
    const results = result.records;
    console.log(results);

    for (let i = 0; i < 3; i++) {
        $('#event').append(`
            <article>
                <img src="${results[i].record.fields.cover_url}" class="eventsCov"></img>
                <h2>${results[i].record.fields.title}</h2>
                <p>${results[i].record.fields.date_description}</p>
                <p>${results[i].record.fields.lead_text}</p>
                <a><button class="btnFav">Favoris</button></a>
            </article>
        `);

    };
});


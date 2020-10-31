
const favStorage = localStorage;

$('#submit').on('click', function (e) {
    e.preventDefault();
    let title = $('#title').val();
    let url = `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?search=${title}`

    console.log(url);
    onSubmit(url);
});

jQuery.ajax({
    url : 'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records', // La ressource ciblée
    dataType : 'jsonp' // Le type de la requête HTTP.
 })
.then((result) => {
    const results = result.records;
    console.log(results);

    for (let i = 0; i < 3; i++) {
        $('#new_events').append(`
            <article>
                <div id="${results[i].record.id}, eventID">
                    <img src="${results[i].record.fields.cover_url}" class="eventsCov"></img>
                    <h2>${results[i].record.fields.title}</h2>
                    <p>${results[i].record.fields.date_description}</p>
                    <p>${results[i].record.fields.lead_text}</p>
                </div>
                <a><button class="btnFav">Favoris</button></a>
            </article>
        `);

    };

    
});

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
                        <a href="event.html">
                            <img src="${results[i].record.fields.cover_url}" class="eventsCov"></img>
                            <h2>${results[i].record.fields.title}</h2>
                            <p>${results[i].record.fields.date_description}</p>
                            <p>${results[i].record.fields.lead_text}</p>
                        </a>
                        <a><button class="btnFav">Favoris</button></a>
                    </article>
                `);
        
            };
        } else {
            $('#resultMsg').empty();
            $('#resultMsg').append(
                `Aucun résultat, essayez d'autres mots-clés.`
            );
        }
    })
};

$('#eventID').on('click', function (e) {
    e.preventDefault();
    let id = $('#eventID').id;
    let url = `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?search=${id}`

    console.log(id);
    console.log(url);
});

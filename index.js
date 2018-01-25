var myLocation = 'Chicago';
var xmlHttp = new XMLHttpRequest();

function getEvents(callback, page=1, events) {
    console.log(`Getting page ${page}`);

    $.get('https://www.eventbriteapi.com/v3/events/search/', {
            token: 'UTQGSUSZYKSMOZK6VSC3',
            subcategories: 2004,
            sort_by: 'date',
            'start_date.keyword': 'next_week',
            'location.address': myLocation,
            page
    }).done(function( body ) {

        events = events ? events.concat(body.events) : body.events;

        if (body.pagination.page_count <= page) {
            callback(events);
        } else {
            getEvents(callback, page + 1, events);
        }

    	$( ".result" ).html(data);
	  alert( "Load was performed." );
	}).fail(function(data) {
            console.log('Error:', data);
  });
}

function writeData(events) {
    console.log('Writing');
    let htmlEvents = '';
    let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentDay = -1;

    for (let i = 0; i < events.length; ++i) {
        let date = new Date(events[i].start.utc);
        let day = date.getDay();

        htmlEvents += `
        <div>
            <h1 style="text-align: center">${currentDay !== day ? weekday[day] : ''}</h1>
            <h2><a href="${events[i].url}">${events[i].name.text}...</a></h2>
            Date: ${date}<br/>
            ${events[i].description.text}
            <hr/>
        </div>`;

        currentDay = day;
    }

    $('#root').append(htmlEvents);
}

getEvents(writeData);
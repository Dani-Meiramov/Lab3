document.addEventListener('DOMContentLoaded', () => {
    let xhr = new XMLHttpRequest();
    let Events = {};
    let Body = document.getElementsByTagName('body')[0];
    let url = "https://www.eventbriteapi.com/v3/events/search/?q=learning&sort_by=date&location.address=BOSTON&start_date.keyword=next_week&token=UTQGSUSZYKSMOZK6VSC3"

    xhr.open("GET", url, true);  
    xhr.onload = function () {
        Events = JSON.parse(xhr.response).events;
	    Events.forEach((event) => {
		    Body.innerText = Body.innerText + event.start.local + ' ' + event.name.text + '\n' + event.description.text + '\n\n';
	    })
    };
    xhr.send();
});

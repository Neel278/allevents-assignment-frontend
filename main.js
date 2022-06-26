const baseUrl = 'https://allevents-backend.herokuapp.com'
function fetchEvents() {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/getEvents`)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            }).catch(e => {
                console.error(e)
                reject([])
            });
    })
}
function fetchKeywords() {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/getEventsCount`)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            }).catch(e => {
                console.error(e)
                reject([])
            });
    })
}

async function renderEvents() {
    let events = await fetchEvents();
    events = Object.values(events)
    const eventsList = document.getElementById('events-list');
    for (let event of events) {
        const node = document.createElement('div');
        node.innerHTML = `
            <div class="row mt-3">
            <h3>${event[0].day}</h3>
            <hr />
            <div class="col-sm-6">
                <div class="row no-gutters py-2">
                    <div class="col-auto">
                        <img src=${event[0].banner_url} class="img-fluid" alt="" style="height: 100px;width:200px">
                    </div>
                    <div class="col">
                        <div class="px-2">
                            <h5 class="text-secondary">${event[0].eventname}</h5>
                            <a href="#" class="btn btn-primary">I'm interested</a>
                        </div>
                    </div>
                </div>
                <div class="row no-gutters py-2">
                    <div class="col-auto">
                        <img src=${event[1].banner_url} class="img-fluid" alt="" style="height: 100px;width:200px">
                    </div>
                    <div class="col">
                        <div class="px-2">
                            <h5 class="text-secondary">${event[0].eventname}</h5>
                            <a href="#" class="btn btn-primary">I'm interested</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="row no-gutters py-2">
                    <div class="col-auto">
                        <img src=${event[2].banner_url} class="img-fluid" alt="" style="height: 100px;width:200px">
                    </div>
                    <div class="col">
                        <div class="px-2">
                            <h5 class="text-secondary">${event[0].eventname}</h5>
                            <a href="#" class="btn btn-primary">I'm interested</a>
                        </div>
                    </div>
                </div>
                <div class="row no-gutters py-2">
                    <div class="col-auto">
                        <img src=${event[3].banner_url} class="img-fluid" alt="" style="height: 100px;width:200px">
                    </div>
                    <div class="col">
                        <div class="px-2">
                            <h5 class="text-secondary">${event[0].eventname}</h5>
                            <a href="#" class="btn btn-primary">I'm interested</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
        eventsList.appendChild(node);
    }
}

async function renderTable() {
    if (window.location.href.includes('table.html')) {
        // proceed only if rendering table.html
        let tableRow = document.getElementById('table-rows');
        const keywords = await fetchKeywords();
        for (let [key, value] of Object.entries(keywords)) {
            let node = document.createElement('tr');
            node.innerHTML = `
                <td>${key}</td>
                <td>${value}</td>
            `
            tableRow.appendChild(node)
            // console.log(key)
        }
    }
}
renderTable()

renderEvents()
// script to add data from a csv file
function addDataFromCsv() {
    $(document).ready(async function () {
        let csvData = await $.get("./files/backend_task_sample_data.csv");
        let { data } = Papa.parse(csvData, { header: true });
        for (let val of data) {
            try {
                await fetch("https://allevents-backend.herokuapp.com/insertEvent", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ eventData: val }),
                });
            } catch (e) {
                // return false;
            }
        }
    });
}

// uncomment this to test script
// addDataFromCsv();

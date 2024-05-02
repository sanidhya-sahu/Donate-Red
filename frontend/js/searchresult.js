window.addEventListener('load', () => {
    fetch(`/listresults`)
        .then(resp => resp.json())
        .then((response) => {
            if (response.res == true) {
                const city = response.req.city
                const state = response.req.state
                document.getElementById('searchedCityName').innerText = city
                Object.keys(response.data).forEach(key => {
                    if (key != city) {
                        for (let index = 0; index < response.data[key].length; index++) {
                            const ele = response.data[key][index];
                            fetch(`/findDonorDetails?accID=${ele}`)
                                .then(resp => resp.json())
                                .then((found) => {
                                    document.getElementById('table2').innerHTML += `
                                <tr>
                                    <th>${found.city}</th>
                                    <th>${found.name}</th>
                                    <th>${found.phone}</th>
                                    <th>${found.email}</th>
                                </tr>
                            `
                                })
                        }
                    }
                }); 
                for (let index = 0; index < response.data[city].length; index++) {
                    const element = response.data[city][index];
                    fetch(`/findDonorDetails?accID=${element}`)
                        .then(resp => resp.json())
                        .then((found) => {
                            document.getElementById('table1').innerHTML += `
                                <tr>
                                    <th>${found.name}</th>
                                    <th>${found.phone}</th>
                                    <th>${found.email}</th>
                                </tr>
                            `
                        })
                }
            }
            else {
                window.location.href = '/error'
            }

        })
})
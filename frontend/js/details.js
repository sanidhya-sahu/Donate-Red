window.addEventListener('load',()=>{
    fetch('/fetchDetails')
    .then(resp => resp.json())
    .then((response) =>{
        if (response.stat == true) {
            const user = response.data.user
            document.getElementById('name').innerText = user.name
            document.getElementById('phone').innerText = user.phone
            document.getElementById('email').innerText = user.email
            document.getElementById('age').innerText = user.age
            document.getElementById('bloodGrp').innerText = user.bloodGrp
            document.getElementById('state').innerText = user.state
            document.getElementById('city').innerText = user.city
        }
        else{
            window.location.href = "/error"
        }
    })
})
window.addEventListener('load',()=>{
    fetch('/fetchDetails')
    .then(resp => resp.json())
    .then((response) =>{
        if (response.stat == true) {
            const user = response.data.user
            const details1 = response.data.details1
            const details2 = response.data.details2
            document.getElementById('name').innerText = user.name
            document.getElementById('phone').innerText = user.phone
            document.getElementById('email').innerText = user.email
            document.getElementById('age').innerText = user.age
            document.getElementById('bloodGrp').innerText = user.bloodGrp
            document.getElementById('state').innerText = user.state
            document.getElementById('city').innerText = user.city
            document.getElementById('firstdonar').innerText = details1.donartype
            document.getElementById('medicine').innerText = details1.medicine
            document.getElementById('lastdonate').innerText = details1.lastdonation
            document.getElementById('immu').innerText = details1.immunizations
            document.getElementById('malaria').innerText = details1.Malaria
            document.getElementById('recieveblood').innerText = details1.recieveblood
            document.getElementById('jaundice').innerText = details1.Rabies
            document.getElementById('Rabies').innerText = details1.jaundice
            document.getElementById('Diabetes').innerText = details2.Diabetes
            document.getElementById('Cancer').innerText = details2.Cancer
            document.getElementById('Tuberculosis').innerText = details2.Tuberculosis
            document.getElementById('asthma').innerText = details2.asthma
            document.getElementById('liver').innerText = details2.liver
            document.getElementById('kidney').innerText = details2.kidney
            document.getElementById('clot').innerText = details2.clot
            document.getElementById('Heart').innerText = details2.Heart
            document.getElementById('Allergy').innerText = details2.Allergy
        }
        else{
            window.location.href = "/error"
        }
    })
})

function registerdonar() {
    const input = document.getElementById('concent').checked
    if (input == true) {
        fetch(`/validateDonar`)
        .then(resp=>resp.json())
        .then((response)=>{
            if (response.stat == true) {   
                if (response.valid == true) {
                    window.location.href = '/thank'
                }
                else{
                    window.location.href = "/rejected"
                }
            }
            else{
                window.location.href = "/error"
            }
        })
    }
    else{
        alert('Give concent to register as a donar')
    }
}
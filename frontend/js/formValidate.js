async function validateAndAlertForm1() {
    var donartype = document.getElementById('donartype').value
    var medicine = document.getElementById('medicine').value
    var lastdonation = document.getElementById('lastdonation').value
    var immunizations = document.getElementById('immunizations').value
    var Malaria = document.getElementById('Malaria').value
    var recieveblood = document.getElementById('recieveblood').value
    var jaundice = document.getElementById('jaundice').value
    var Rabies   = document.getElementById('Rabies').value
    if (donartype == "" || donartype == "Are You First Time Donar") {
        alert("Fill all details")
    }
    else if (medicine == "" || medicine == "Are You Taking Any Medicines") {
        alert("Fill all details")
    }
    else if (lastdonation == "" || lastdonation == "When did you last donated Blood") {
        alert("Fill all details")
    }
    else if (immunizations == "" || immunizations == "Have you received any immunizations in the past month?") {
        alert("Fill all details")
    }
    else if (Malaria == "" || Malaria == "Have you been treated for Malaria in the past 3 months?") {
        alert("Fill all details")
    }
    else if (recieveblood == "" || recieveblood == "Have you received blood in the past 6 months?") {
        alert("Fill all details")
    }
    else if (jaundice == "" || jaundice == "Have you had close contact with someone diagnosed with hepatitis or yellow jaundice in the past 6 months?") {
        alert("Fill all details")
    }
    else if (Rabies == "" || Rabies == "Have you been treated for Rabies or received Hepatitis B immune globulin in the past year?") {
        alert("Fill all details")
    }
    else {
        const queryObj = {
            "donartype": donartype,
            "medicine": medicine,
            "lastdonation": lastdonation,
            "immunizations": immunizations,
            "Malaria": Malaria,
            "recieveblood": recieveblood,
            "Rabies": Rabies,
            "jaundice": jaundice
        }
        fetch(`/donarDetailsSave1?res=${queryObj}`)
        .then(resp => resp.json())
        .then((response) => {
            if (response.stat == true) {
                window.location.href = "/check3"
            }
            else{
                window.location.href = "/error"
            }
        })
    }
}

async function validateAndAlertForm2() {
    var Diabetes = document.getElementById('Diabetes').checked
    var Cancer = document.getElementById('Cancer').checked
    var Tuberculosis = document.getElementById('Tuberculosis').checked
    var asthma = document.getElementById('asthma').checked
    var liver = document.getElementById('liver').checked
    var kidney = document.getElementById('kidney').checked
    var clot = document.getElementById('clot').checked
    var Heart = document.getElementById('Heart').checked
    var Allergy = document.getElementById('Allergy').checked
    var queryObj = {
        "Diabetes": false,
        "Cancer": false,
        "Tuberculosis": false,
        "asthma": false,
        "liver": false,
        "kidney": false,
        "clot": false,
        "Heart": false,
        "Allergy": false
    }
    if (Diabetes == true) {
        queryObj.Diabetes = true
    }
    else if(Cancer == true){
        queryObj.Cancer = true
    }
    else if(Tuberculosis == true){
        queryObj.Tuberculosis = true
    }
    else if(asthma == true){
        queryObj.asthma = true
    }
    else if(liver == true){
        queryObj.liver = true
    }
    else if(kidney == true){
        queryObj.kidney = true
    }
    else if(clot == true){
        queryObj.clot = true
    }
    else if(Heart == true){
        queryObj.Heart = true
    }
    else if(Allergy == true){
        queryObj.Allergy = true
    }
    fetch(`/donarDetailsSave2?res=${queryObj}`)
        .then(resp => resp.json())
        .then((response) => {
            if (response.stat == true) {
                window.location.href = "/showDetails"
            }
            else{
                window.location.href = "/error"
            }
        })
}
async function validateAndAlertForm() {
    var donartype = document.getElementById('donartype').value
    var medicine = document.getElementById('medicine').value
    var lastdonation = document.getElementById('lastdonation').value
    var immunizations = document.getElementById('immunizations').value
    var Malaria = document.getElementById('Malaria').value
    var recieveblood = document.getElementById('recieveblood').value
    var jaundice = document.getElementById('jaundice').value
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
    else if ( Malaria == "" ||  Malaria  == "Have you been treated for Malaria in the past 3 months?") {
        alert("Fill all details")
    }
    else if (recieveblood == "" || recieveblood == "Have you received blood in the past 6 months?") {
        alert("Fill all details")
    }
    else if (jaundice == "" || jaundice == "Have you had close contact with someone diagnosed with hepatitis or yellow jaundice in the past 6 months?") {
        alert("Fill all details")
    }
    else {
        // document.getElementById('loader').hidden = false
        fetch(`/validatePerspective?text=${detail}`)
            .then(response => response.json())
            .then(async (validated) => {
                // document.getElementById('loader').hidden = true
                if (validated.res == true) {
                    confirmWarningAlert('Attention:  Kindly be informed that all complaints will be forwarded to the respective authority for proper handling. Please refrain from using inappropriate language or submitting frivolous complaints, as actions may be taken against the issuer. Thank you for your understanding and cooperation.        Do you want to raise this complaint ?')
                    await waitConfirmation()
                        .then((result) => {
                            if (result) {
                                document.getElementById('name').value = name
                                document.getElementById('email').value = email
                                document.getElementById('complaint_location_select').value = location
                                document.getElementById('block_select').value = block
                                document.getElementById('complaint_type_select').value = type
                                document.getElementById('complaint_details').value = detail
                                document.getElementById('form').submit()
                            }
                            else {
                                window.location.reload()
                            }
                        })
                        .catch((err) => {
                            errorAlert('Some error occured, try again.')
                        })
                }
                else if (validated.res == false) {
                    window.location = '/errorframe'
                }
                else {
                    const result = validated.res
                    errorAlert(`We've detected ${result} in your complaint. Please revise it accordingly`)
                    document.getElementById('name').value = name
                    document.getElementById('email').value = email
                    document.getElementById('complaint_location_select').value = location
                    document.getElementById('block_select').value = block
                    document.getElementById('complaint_type_select').value = type
                    document.getElementById('complaint_details').value = detail
                }
            })
    }
}


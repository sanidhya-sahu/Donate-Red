window.addEventListener('load',()=>{
    fetch(`/loggedin`)
    .then(resp => resp.json())
    .then((res)=>{
        if (res.stat == true) {
            document.getElementById('headLoginButton').style.display = "none"
            document.getElementById('nav').innerHTML += `
            <h5 style="font-family: var(--ff-poppins);color: white;font-weight: 500;font-size: medium;"><a style=" color: white; text-decoration: none; "href='/logout'>Logout</a></h5>&nbsp;&nbsp;&nbsp;
            <h3 style="font-weight: bold;font-family: var(--ff-poppins);color: white;margin-left: 20px;">Sanidhya</h3>
            `
            document.getElementById('regButton').style.display = "none"
            document.getElementById('mainButton').innerHTML = `
            <button
                style="color: white; background-color: hsl(225, 68%, 53%)"
                class="Register"
                id="findButton"
                onclick="window.location.href='/find'">
                    Find Blood
            </button>
            &nbsp;
            <button
                style="color: white; background-color: hsl(225, 68%, 53%)"
                class="Register"
                id="donateButton"
                onclick="window.location.href='/donate'">
                    Donate
            </button>
            `
        }
    })
})
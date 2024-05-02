window.addEventListener('load',()=>{
    fetch('/stateCityData')
    .then(resp => resp.json())
    .then((response)=>{
        const data = response
        function populateStateAndCity(stateSelectId, citySelectId) {
            const stateSelect = document.getElementById(stateSelectId);
            const citySelect = document.getElementById(citySelectId);
          
            // Populate state options
            for (const state in data) {
              const option = document.createElement('option');
              option.value = state;
              option.textContent = state;
              stateSelect.appendChild(option);
            }
          
            // Add event listener for state select
            stateSelect.addEventListener('change', () => {
              // Clear city options
              citySelect.innerHTML = '';
          
              // Populate city options based on selected state
              const selectedState = stateSelect.value;
              const cities = data[selectedState];
              for (const city of cities) {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
              }
            });
          }
          populateStateAndCity('state', 'city');
    })
})
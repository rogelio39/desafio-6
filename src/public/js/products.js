const logout = document.getElementById('logout');



logout.addEventListener('submit', async(e) => {
    e.preventDefault();

    try{
        const response = await fetch('/static', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response.json())
        .then(data => console.log(data))

    }catch(error){
        console.log('error', error);
    }
})

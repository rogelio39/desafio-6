const logout = document.getElementById('logout');


logout.addEventListener('click', async() => {
    try{
        const response = await fetch('/api/sessions/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.status === 200){
            window.location.href = '/static';
        }

    }catch(error){
        console.log('error', error);
    }
})

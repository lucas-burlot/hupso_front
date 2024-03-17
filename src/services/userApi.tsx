// API file Book entity


export const ApiUserLogin = async (email: string, password: string) => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    return response;
}

export const ApiUserRegister = async (email: string, password: string) => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    return response;
}

// API file Book entity


export const ApiGetBooks = async (title: string, category: string, date: string) => {
    const books = await fetch(import.meta.env.VITE_API_URL + `/books?title=${title}&category=${category}&publicationYear=${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
        },
    });
    return books;
}

export const ApiGetBookById = async (id: string) => {
    const book = await fetch(import.meta.env.VITE_API_URL + `/books/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
        },
    });
    return book;
}
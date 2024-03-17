// API file Booking entity

export const ApiGetBookingByUser = async () => {
    const bookings = await fetch(import.meta.env.VITE_API_URL + '/bookings/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
        },
    });
    return bookings;
}

export const ApiGetBookings = async () => {
    const bookings = await fetch(import.meta.env.VITE_API_URL + '/bookings', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
        },
    });
    return bookings;
}

export const ApiCreateBooking = async (book_id: number, start_date: string, end_date: string) => {
    const booking = await fetch(import.meta.env.VITE_API_URL + '/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
        },
        body: JSON.stringify({
            book_id,
            start_date: start_date,
            end_date: end_date,
        }),
    });
    return booking;
}

export const ApiCancelBooking = async (id: number) => {
    const booking = await fetch(import.meta.env.VITE_API_URL + `/bookings/${id}/cancel `, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
        },
    });
    return booking;
}
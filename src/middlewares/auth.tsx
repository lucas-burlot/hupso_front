import { useEffect } from "react";

function isUserConnected() {

    useEffect(() => {
        const jwt = localStorage.getItem("token");

        // verifier si le jwt n'est pas expiré sinon rediriger vers la page de connexion
        if (jwt) {
            const jwtData = JSON.parse(atob(jwt.split('.')[1]));
            console.log(jwtData);
            console.log(Math.floor(Date.now() / 1000));
            if (Math.floor(Date.now() / 1000) >= jwtData.exp) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }

        if (!jwt) {
            window.location.href = "/login";
        }
    }, []);

}

export default isUserConnected;
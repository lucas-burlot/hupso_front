import { useState } from 'react';
import logo from '../../assets/logo.svg'
import Input from '../../components/auth/input'
import { Link } from 'react-router-dom';
import { ApiUserRegister } from '../../services/userApi';
import Loader from '../../components/loader';

function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event: any) => {
        setLoading(true);
        event.preventDefault();
        if(email === '' || password === ''){
            setError('Veuillez remplir tous les champs');
            setLoading(false);
            return;
        }

        if(password !== confirmPassword){
            setError('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }
        
        const response = await ApiUserRegister(email, password);

        if(response.status === 201){
            window.location.href = '/login';
        } else {
            const data = await response.json();
            setError(data.message);
        }
        setLoading(false);
    }
    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                    <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                        <img className="h-32 w-32 mx-auto" src={logo} alt='logo' />
                        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        <div className="px-5 py-7">
                            <Input labelName="Email" inputType="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Input labelName="Password" inputType="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <Input labelName="Confirm password" inputType="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <p className="text-sm text-red-500 pb-3">{error}</p>
                            <button type="submit" className="transition duration-200 bg-orange-500 hover:bg-orange-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                                S'enregistrer
                            </button>
                            <Link to="/login" className="block text-center text-xs text-blue-500 pt-5">Déjà inscrit ?</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </form>
            { loading && <Loader />}
        </>
    )
}

export default Register
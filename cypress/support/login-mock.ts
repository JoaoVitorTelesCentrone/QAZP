import axios from "axios";

export const loginByApi = async (username: string, password: string): Promise<void> => 
{
    const apiUrl = 'http://localhost:5196/api/User/login';

    try
    {
        const response = await axios.post(apiUrl, { username, password}); 

        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log('Login bem-sucedido');
    } catch ( error ) 
    {
        if (axios.isAxiosError(error)) 
        {
            console.error('Erro no login: ', error.response?.data || error.message);
        } 
        else 
        {
            console.error('Erro inesperado: ', error);
        }
    }
};
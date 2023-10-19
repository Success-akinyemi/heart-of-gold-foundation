import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { getUser } from '../helpers/apis'

axios.defaults.baseURL = 'http://localhost:8080'


/**Get User Details Hooks */
export function useFetch(query){
    const [data, setData] = useState({ isLoading: true, apiData: null, status: null, serverError: null})

    useEffect(() => {
        const fetchData =  async () => {
            try {
                const { id } = !query ? await getUser() : await getUser();
                
                const config = {
                    headers: {
                      Authorization: `Bearer ${id}`,
                    },
                  };            

                const { data, status} = !query ? await axios.get(`/api/user/${id}`, config) : await axios.get(`/api/getUsers/${id}`)
                console.log('Data from Hooks>>>', data)

                if(status === 200){
                    setData({ isLoading: false, apiData: data, status: status, serverError: null})
                } else{
                    setData({ isLoading: false, apiData: null, status: status, serverError: null})
                }
            } catch (error) {
                setData({ isLoading: false, apiData: null, status: null, serverError: error})
            }
        };
        fetchData()
    }, [query])

    return data
}
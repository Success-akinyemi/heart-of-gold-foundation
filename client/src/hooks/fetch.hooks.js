import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { getUser } from '../helpers/api'

//axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.baseURL = 'https://heart-of-gold-foundation.onrender.com'


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

                const { data, status} = !query ? await axios.get(`/api/user/${id}`, config) : await axios.get(`/api/getUsers/${id}`, config)
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

/**Get Campaign */
export function useFetchCampaign(query){
    const [campaignData, setCampaignData] = useState({ isLoadingCampaign: true, apiCampaignData: null, campaignDataStatus: null, campaignServerError: null})

    useEffect(() => {
        const fetchCampaignData =  async () => {
            try {
                console.log('query', query)

                const { data, status} = !query ? await axios.get(`/api/campaign`) : await axios.get(`/api/getCampaign/${query}`)
                console.log('Data from Campaign Hooks>>>', data)

                if(status === 200){
                    setCampaignData({ isLoadingCampaign: false, apiCampaignData: data, campaignDataStatus: status, campaignServerError: null})
                } else{
                    setCampaignData({ isLoadingCampaign: false, apiCampaignData: null, campaignDataStatus: status, campaignServerError: null})
                }
            } catch (error) {
                setCampaignData({ isLoadingCampaign: false, apiCampaignData: null, campaignDataStatus: null, campaignServerError: error})
            }
        };
        fetchCampaignData()
    }, [query])

    return campaignData
}

/**Get Gallery */
export function useFetchGallery(query){
    const [galleryData, setGalleryData] = useState({ isLoadingGallery: true, apiGalleryData: null, GalleryDataStatus: null, GalleryServerError: null})

    useEffect(() => {
        const fetchGalleryData =  async () => {
            try {
                console.log('query', query)

                const { data, status} = !query ? await axios.get(`/api/getGallery`) : await axios.get(`/api/getCampaign/${query}`)
                console.log('Data from Gallery Hooks>>>', data)

                if(status === 200){
                    setGalleryData({ isLoadingGallery: false, apiGalleryData: data, GalleryDataStatus: status, GalleryServerError: null})
                } else{
                    setGalleryData({ isLoadingGallery: false, apiGalleryData: null, GalleryDataStatus: status, GalleryServerError: null})
                }
            } catch (error) {
                setGalleryData({ isLoadingGallery: false, apiGalleryData: null, GalleryDataStatus: null, GalleryServerError: error})
            }
        };
        fetchGalleryData()
    }, [query])

    return galleryData
}
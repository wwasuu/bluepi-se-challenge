import { AxiosResponse } from 'axios'
import { HttpClient } from '../libs'

// create game session
function create (): Promise<AxiosResponse> {
    return HttpClient.post('/games')
}

function update (id: number, data: any): Promise<AxiosResponse> {
    return HttpClient.put(`/games/${id}`, data)
}

export default {
    create,
    update
}
import { AxiosResponse } from 'axios'
import { HttpClient } from '../libs'

interface IGetQuery {
    params: {
        limit: number
    }
}

// get leaderboard
function get (query: IGetQuery): Promise<AxiosResponse> {
    return HttpClient.get('/leaderboard', query)
}

export default {
    get
}
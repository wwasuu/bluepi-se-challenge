import { AxiosResponse } from 'axios'
import { HttpClient } from '../libs'

// get me
function get (): Promise<AxiosResponse> {
    return HttpClient.get('/me')
}

export default {
    get
}
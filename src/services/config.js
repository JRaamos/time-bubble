import { GET, POST, PUT, DELETE } from './api'


export const Read = async () => {
    return await GET(`/config`, true);
}

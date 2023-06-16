import {$authHost, $host} from "./index";

export const createType = async (type) =>{
    const {data} = await $authHost.post('api/type', type)
    return data

}
export const fetchTypes = async () =>{
    const {data} = await $host.get('api/type')
    return data

}

export const createBrend = async (brend) =>{
    const {data} = await $authHost.post('api/brand', brend)
    return data

}
export const fetchBrends = async () =>{
    const {data} = await $host.get('api/brand' ,{params: {

        }})
    return data

}

export const createDevice = async (device) =>{
    const {data} = await $authHost.post('api/device', device)
    return data

}
export const fetchDevice = async (typeId, brendId, page, limit=5) =>{
    const {data} = await $host.get('api/device', {params:{
            typeId, brendId, page, limit
        }})
    return data

}
export const fetchOneDevice = async (id) =>{
    const {data} = await $host.get('api/device/' + id)
    return data

}


export const deleteOne = async (id) =>{
    const {data} = await $host.delete('api/device/' + id)
    return data

}
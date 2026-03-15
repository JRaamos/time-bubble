import { ReadObject, SaveObject } from './storage'

export const DEVELOPMENT_MODE = true

export const API_ENDPOINT = ''

export const GetHeaders = async (authenticated) => {
	const headers = { 'Content-Type': 'application/json' }
	const authentication = await ReadObject('authentication')
	if (authenticated && authentication?.jwt) {
		headers.Authorization = `Bearer ${authentication?.jwt}`
	}
	return { headers }
}

export const ServerFetch = async (url, options, authenticated) => {
	const { headers } = await GetHeaders(authenticated)
	try{
		const response = await fetch(url, { ...options, headers })
		if (response?.statusCode === 403 && authenticated) {
			await SaveObject('authentication', {})
		}
		try{
			return await response.json()
		}catch(err){
			console.log('ServerParseError', err)
			return { error:true, message:response }
		} 
	}catch(error){
		console.log('ServerFetchError', error)
		return false
	}
}

export const GET = async (path, authenticated = false) => {
	return await ServerFetch(
		`${API_ENDPOINT}${path}`,
		{
			method: 'GET'
		},
		authenticated
	)
}

export const POST = async (path, body, authenticated = false) => {
	return await ServerFetch(
		`${API_ENDPOINT}${path}`,
		{
			method: 'POST',
			body: JSON.stringify(body)
		},
		authenticated
	)
}

export const PUT = async (path, body, authenticated = false) => {
	return await ServerFetch(
		`${API_ENDPOINT}${path}`,
		{
			method: 'PUT',
			body: JSON.stringify(body)
		},
		authenticated
	)
}

export const DELETE = async (path, authenticated = false) => {
	return await ServerFetch(
		`${API_ENDPOINT}${path}`,
		{
			method: 'DELETE'
		},
		authenticated
	)
}

// Uploads

export const ResolveUri = (result) => {
    const path = result?.path ? result?.path 
                : result?.fileCopyUri ? result?.fileCopyUri 
                : result?.uri ? result?.uri 
                : result?.croppedImage ? result?.croppedImage 
                : typeof result === 'string' ? result : null     
    return path?.indexOf('file://') === -1 ? `file://${ path }` : path
}

export const PrepareFile = result => {
    const uri = ResolveUri(result)
    const name = uri.split('/').pop()
    const match = /\.(\w+)$/.exec(name)
    const type = match ? `image/${match[1]}` : `image`
    return { uri, name, type }
}

export const ServerUploadImage = async (result) => {  
      return await PostImage(PrepareFile(result))
}

export const PostImage = async (fileToUpload) => {
	const formData = new FormData()
    formData.append('files', fileToUpload, fileToUpload.name)  
    let { headers } = await GetHeaders(true) 
    delete headers['Content-Type']
	try{
		let response = await fetch(`${API_ENDPOINT}/upload`, { method: 'POST', body: formData, headers });   
		try{
			let responseJson = await response.json()
			return responseJson?.[0]; 
		}catch(err){
			console.log('parse exception', err)
			return false
		}
	}catch(er){
		console.log('fetch exception', er)
		return false
	}
}

// Thirdy

export const ReadAddressesByZipCode = async (zipCode) => {
    try{
        let result = await fetch(`https://viacep.com.br/ws/${ zipCode }/json/`);
        return result.json();
    }catch(err){ return false; }
}

export const ReadVehidleByPlate = async (plate) => {
    try{
        let result = await fetch(`https://wdapi2.com.br/consulta/${plate}/cf395de1a3265253a6ef2795cedff347`);
        return result.json();
    }catch(err){ return false; }
}

export const getUserIp = async () => {
	const response = await fetch('https://api.ipify.org?format=json');
	const data = await response.json();
	return data.ip;
};

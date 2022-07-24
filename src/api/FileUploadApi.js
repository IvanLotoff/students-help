import Config from '../config'

const c = new Config();

function handleErrors(response) {
    if (!(response.status === 200 || response.status === 204 )) {
        return response.json()
            .then(response => {
                return Promise.reject({code: response.status, message: response.message});
            })
            .catch(err => {
                throw err;
            });
    } else {
        return response.status === 200 ? response.json() : new Promise(function (resolve, reject) {
            resolve();
        });
    }
}

export default {
    uploadFile: (file, name, telegram, message, isRefund) => {
        const url = c.serverUrl + '/api/v1/upload';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('telegram', telegram);
        formData.append('message', message);
        formData.append('isRefund', isRefund)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        
        console.log(c.serverUrl + " SERVER URL")

        return fetch(c.serverUrl + '/api/v1/upload', {
            method: 'POST',
            body: formData,
            config: config
        })
            .then(handleErrors);

    }

}
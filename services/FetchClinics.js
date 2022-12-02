const URL = 'http://10.0.2.2:8000';

export default {
    async fetchClinics() {
        try {
                let response = await fetch(URL + '/api/clinics');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }
}
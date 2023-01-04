class PharmacyService {

    async getPharmacies () {
        const response = await fetch("http://localhost:8000/api/pharmacies").then(r => r.json())
        return response
    }

    async getPharmacy (id) {
        const response = await fetch(`http://localhost:8000/api/pharmacies/${id}/`).then(r => r.json())
        return response
    }

}

export default new PharmacyService()
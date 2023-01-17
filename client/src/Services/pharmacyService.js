class PharmacyService {

    async getPharmacies () {
        const response = await fetch("/api/pharmacies", { credentials: 'include' }).then(r => r.json())
        return response
    }

    async getPharmacy (id) {
        const response = await fetch(`/api/pharmacies/${id}`, { credentials: 'include' }).then(r => r.json())
        return response
    }

}

export default new PharmacyService()
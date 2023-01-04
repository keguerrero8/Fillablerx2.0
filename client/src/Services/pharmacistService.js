class PharmacistService {

    async getPharmacists (pharmacy_id) {
        const response = await fetch(`http://localhost:8000/api/pharmacies/${pharmacy_id}/pharmacists`).then(r => r.json())
        return response
    }

    async createPharmacist (pharmacy_id, obj) {
        const createStatus = await fetch(`http://localhost:8000/api/pharmacists`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...obj, pharmacy: pharmacy_id})
          })
          .then(r => r.json())
        return createStatus
    }

    async updatePharmacist (pharmacist_id, obj) {
        const response = await fetch(`http://localhost:8000/api/pharmacists/${pharmacist_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        }).then(r => r.json())

        return response
    }

    async deletePharmacist (pharmacist_id) {

        const isDeleted = await fetch(`http://localhost:8000/api/pharmacists/${pharmacist_id}`, {
            method: "DELETE"
        })
        .then(r => {
            if (r.ok) return true
            else return false
        })

        return isDeleted
    }

}

export default new PharmacistService()
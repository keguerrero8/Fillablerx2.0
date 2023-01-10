import Cookies from "js-cookie"

class PharmacistService {

    async getPharmacists (pharmacy_id) {
        const response = await fetch(`http://localhost:8000/api/pharmacies/${pharmacy_id}/pharmacists`, { credentials: 'include' }).then(r => r.json())
        return response
    }

    async createPharmacist (pharmacy_id, obj) {
        const createStatus = await fetch(`http://localhost:8000/api/pharmacists`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")
            },
            body: JSON.stringify({...obj, pharmacy: pharmacy_id, phone_number: "+1" + obj["phone_number"]})
          })
          .then(r => r.json())
        return createStatus
    }

    async updatePharmacist (pharmacist_id, obj) {
        const response = await fetch(`http://localhost:8000/api/pharmacists/${pharmacist_id}`, {
            credentials: "include",
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken") 
            },
            body: JSON.stringify(obj)
        }).then(r => r.json())

        return response
    }

    async deletePharmacist (pharmacist_id) {

        const isDeleted = await fetch(`http://localhost:8000/api/pharmacists/${pharmacist_id}`, {
        credentials: "include",    
        method: "DELETE",
            headers: { 
                "X-CSRFToken": Cookies.get("csrftoken") 
            },
        })
        .then(r => {
            if (r.ok) return true
            else return false
        })

        return isDeleted
    }

}

export default new PharmacistService()
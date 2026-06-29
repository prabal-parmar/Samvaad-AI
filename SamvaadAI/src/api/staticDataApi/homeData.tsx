import { api } from "../auth/axiosInterseptor"
// data, message, error

export const fetchScenarioLibrary = async () => {
    try {
        const response = await api.get('/data/goal');
        return [response.data.data, response.data.message, response.data.error]
    } catch (error) {
        console.log(error)
        // Response to be added
        return [null, "", "Something went wrong!"]
    }
}
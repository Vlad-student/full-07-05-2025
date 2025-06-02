import axios from "axios";
import CONSTANTS from "../constants";

const apiClient = axios.create({
  baseURL: CONSTANTS.API_BASE_URL,
});

export const fetchAllSports = () => apiClient.get("/sports");
export const fetchSportById = (id) => apiClient.get(`/sports/${id}`);
export const fetchCreateSport = (formData) =>
  apiClient.post("/sports", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteSportById = (id) => apiClient.delete(`/sports/${id}`);
export const updateSportById = ({ id, formData }) =>
  apiClient.patch(`/sports/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAthleteById = (id) => apiClient.get(`/athletes/${id}`);
export const fetchCreateAthlete = (formData) =>
  apiClient.post("/athletes", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateAthleteById = ({ id, formData }) =>
  apiClient.patch(`/athletes/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const fetchAthletesBySport = () =>
  apiClient.get("/analitics/amount-athletes-by-sport");
export const fetchAthletesByCountry = () =>
  apiClient.get("/analitics/amount-athletes-by-country");
export const fetchAverageAgeAthletesBySport = () =>
  apiClient.get("/analitics/average-athletes-by-country");
export const fetchSportsByCountry = () =>7
  apiClient.get("/analitics/amount-sports-by-country");

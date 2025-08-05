export const urlServerSide = "https://datamanagerment.anhkiet.xyz";
export const urlSignalR = "https://datamanagerment.anhkiet.xyz";

const apiLinks = {
  user: {
    login: `${urlServerSide}/login`,
  },
  station: {
    getAll: `${urlServerSide}/monitoring_stations/`,
    getByName: `${urlServerSide}/historical_wqi_data/by_station_name`,
    searchByName: `${urlServerSide}/monitoring_stations/search/name`,
    searchByLocation: `${urlServerSide}/monitoring_stations/search/location`,
    searchByDescription: `${urlServerSide}/monitoring_stations/search/description`,
    getActive: `${urlServerSide}/monitoring_stations/active`,
    getInactive: `${urlServerSide}/monitoring_stations/inactive`,
    getById: `${urlServerSide}/monitoring_stations`,
    create: `${urlServerSide}/monitoring_stations/`,
    update: `${urlServerSide}/monitoring_stations`,
    delete: `${urlServerSide}/monitoring_stations`,
  },
  kafka: {
    produceBatch: `${urlServerSide}/produce-batch`,
  },
};

export default apiLinks;

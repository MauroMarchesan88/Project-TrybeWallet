const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const requestAPI = async () => {
  const response = await fetch(APIURL);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default requestAPI;

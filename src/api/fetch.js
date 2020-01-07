import axios from 'axios';

export const post = async (endpoint, data) => {
  return await axios
    .post(`http://localhost:3006/${endpoint}`, data)
    .then(({ data }) => ({ data, err: undefined }))
    .catch(({ response }) => ({
      data: undefined,
      err: response
    }));
}
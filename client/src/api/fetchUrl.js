import axios from 'axios';

const fetchUrl = async (slug, url) => {
  const URL = 'https://shorti-fy.herokuapp.com/url';
  const reqData = slug ? { slug: slug, url: url } : { url: url };

  try {
    const { data } = await axios({
      method: 'POST',
      url: URL,
      data: reqData,
      responseType: JSON,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUrl;

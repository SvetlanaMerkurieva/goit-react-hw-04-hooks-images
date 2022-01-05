import axios from 'axios';

const getImages = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '24078076-056bd2e530cc19b75a9dfc811',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export async function fetchImages(q = '', page = 1) {
  const params = { q, page };
  try {
    const { data } = await getImages('', { params });
    return data.hits;
  } catch (error) {
    alert(`Нет результатов по запросу ${q}`);
  }
}

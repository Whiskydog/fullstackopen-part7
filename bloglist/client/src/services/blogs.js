import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => (token = `Bearer ${newToken}`);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const giveLike = async (blog) => {
  const data = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id,
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, data);
  return response.data;
};

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
    comment,
  });
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export default { addComment, create, getAll, giveLike, setToken, remove };

import api from './api';
import header from './header';

export const ServicesPosts = {
  save: async (formData) => {
    try {
      const response = await api.post('/create', formData, {
        headers: { ...header, 'Content-Type': 'multipart/form-data' },
      });
      console.log('Publicação realizada com sucesso!', response.data);
    } catch (error) {
      handleApiError(error, 'Ocorreu um erro ao realizar a publicação.');
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get('/posts', { headers: header });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Ocorreu um erro ao obter os dados.');
    }
  },

  update: async (post) => {
    try {
      await api.put(`/posts/${post.id}`, post, { headers: header });
    } catch (error) {
      handleApiError(error, 'Ocorreu um erro ao atualizar os dados.');
    }
  },

  delete: async (postId) => {
    try {
      const response = await api.delete(`/posts/${postId}`, { headers: header });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Ocorreu um erro ao excluir os dados.');
    }
  },
};

const handleApiError = (error, defaultMessage) => {
  if (error.response && error.response.data && error.response.data.message) {
    console.error(error.response.data.message);
  } else {
    console.error(defaultMessage);
  }
};
import axios from 'axios';

export const fetchProgrammingLanguages = async () => {
  const { data } = await axios.get('/programmingLanguage');
  return data;
};

export const fetchCategories = async (programmingLanguageId) => {
  const { data } = await axios.get(
    `/programmingLanguage/${programmingLanguageId}/categories`,
  );
  return data;
};

export const fetchStages = async (programmingLanguageId, categoryId) => {
  const { data } = await axios.get(
    `/programmingLanguage/${programmingLanguageId}/categories/${categoryId}/stages`,
  );
  return data;
};

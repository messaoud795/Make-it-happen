export const configHeaders = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return { headers: { authorization: `Bearer ${token}` } };
  }
};

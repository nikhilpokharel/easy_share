export default function payload(response) {
  const { loading = false, data = [], error = false, message = "" } = response;
  const payload = {
    loading: loading,
    data: data,
    error: error,
    message: message,
  };
  return payload;
}

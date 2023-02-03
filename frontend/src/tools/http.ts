import loadingStore from "../components/Loading/loadingStore";

interface postOptions {
  loading?: boolean;
}

export const post = async (apiName: String, content: Object, { loading }: postOptions = {}) => {
  if (loading) {
    loadingStore.setLoading(true);
  }

  const response = await fetch('/api', {
    method: 'post',
    body: JSON.stringify({
      apiName,
      content,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
    })
  });

  if (loading) {
    loadingStore.setLoading(false);
  }

  if (response.status !== 200) {
    alert(`请求出错：${apiName}`);
    throw new Error(`请求出错：${apiName}`);
  }

  return await response.json();
}

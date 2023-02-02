
export const post = async (apiName: String, content: Object) => {
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

  if (response.status !== 200) {
    alert(`请求出错：${apiName}`);
    throw new Error(`请求出错：${apiName}`);
  }

  return await response.json();
}

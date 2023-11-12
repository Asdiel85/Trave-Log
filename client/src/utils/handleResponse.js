export async function handleResponse(response) {
  if (response && response.ok) {
      return await response.json();
  } else {
    const message = await response.json()
      throw new Error(message);
  }
};


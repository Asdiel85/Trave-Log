export function handleResponse(response) {
  if (!response || !response.ok) {
    throw new Error(response);
  }
}



export const getAlbums = async() => {
  try{
    const response = await fetch("https://jsonplaceholder.typicode.com/photos")

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  }
  catch(error) {
    throw error
  }
}
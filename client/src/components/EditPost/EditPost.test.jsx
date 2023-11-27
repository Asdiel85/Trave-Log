// import * as postService from '../../service/postService';
// import { BASE_URL, POSTS } from '../../utils/constants';

// const post = {
//   _id: '65579776286ee71f5cbf1021',
//   userAvatar: 'https://i.ytimg.com/vi/IQ5TQn5gE7o/maxresdefault.jpg',
//   country: 'Usa',
//   city: 'Portland',
//   imageUrl: 'https://media.timeout.com/images/105937857/750/562/image.jpg',
//   cost: 6983,
//   description: 'Portland is known for many things: its eccentric culture, its incredibly creative restaurants its theater and arts scene, and its outdoor beauty top the list of reasons to visit.',
//   likes: [],
//   owner: '65579551286ee71f5cbf0fff',
//   createdAt: '2023-11-17T16:40:22.748Z',
//   updatedAt: '2023-11-17T16:40:22.748Z',
// };

// const token = 'token';
// const id = post._id;

// global.fetch = jest.fn();

// function fetchResponse(data) {
//   return { json: () => new Promise((resolve) => resolve(data)) };
// }

// test('Testing if edit post form will be filled with the correct data', async () => {
//   fetch.mockResolvedValue(fetchResponse(post));
//   const currentPostResponse = await postService.getPostDetails(id);
//   const currentPost = await currentPostResponse.json();

//   expect(fetch).toBeCalledWith(`${BASE_URL}${POSTS}/${id}`);
//   expect(currentPost).toStrictEqual(post);
// });

// import * as postService from '../../service/postService';

// jest.mock('../../service/postService', () => ({
//   getAllPosts: jest.fn(),
// }));

// let data;

// describe('Testing feed component', () => {
//   it('should return posts', async () => {
//     // Your mock data
//     const mockData = [
//       {
//         "_id": {
//           "$oid": "65579776286ee71f5cbf1021"
//         },
//         "userAvatar": "https://i.ytimg.com/vi/IQ5TQn5gE7o/maxresdefault.jpg",
//         "country": "Usa",
//         "city": "Portland",
//         "imageUrl": "https://media.timeout.com/images/105937857/750/562/image.jpg",
//         "cost": 6983,
//         "description": "Portland is known for many things: its eccentric culture, its incredibly creative restaurants its theater and arts scene, and its outdoor beauty top the list of reasons to visit.",
//         "likes": [],
//         "owner": {
//           "$oid": "65579551286ee71f5cbf0fff"
//         },
//         "createdAt": {
//           "$date": "2023-11-17T16:40:22.748Z"
//         },
//         "updatedAt": {
//           "$date": "2023-11-17T16:40:22.748Z"
//         },
//         "__v": 0
//       },
//     ];

//     data = { data: mockData };

//     postService.getAllPosts.mockResolvedValue(data);

//     const posts = await postService.getAllPosts();

//     expect(posts).toEqual(data);
//   });
// });

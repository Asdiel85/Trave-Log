import { describe, expect, it, vi } from "vitest";
import * as userService from '../../service/userService'

const dataArray = [  {
    "_id": "65649b1b2834ac660cf7c8cf",
    "userAvatar": "https://wow.zamimg.com/modelviewer/live/webthumbs/outfit/127/298111.jp…",
    "country": "Usa",
    "city": "Boston",
    "imageUrl": "https://media.timeout.com/images/105937857/750/562/image.jpg",
    "cost": 22232,
    "description": "sdasdDSFASDFASDFASDFASDFASFASDFASDF",
    "likes": [],
    "owner": "65579551286ee71f5cbf0fff",
    "createdAt": "2023-11-27T13:35:23.777+00:00",
    "updatedAt": "2023-11-28T12:50:34.458+00:00",
    "__v": 0
  },
  {
    "_id": "6564d2a82834ac660cf7c947",
    "userAvatar": "https://wow.zamimg.com/modelviewer/live/webthumbs/outfit/127/298111.jp…",
    "country": "UsaEdit",
    "city": "Boston",
    "imageUrl": "https://media.timeout.com/images/105483065/750/562/image.jpg",
    "cost": 2222,
    "description": "dadasdasdasdasdsddsadas",
    "likes": [],
    "owner": "65579551286ee71f5cbf0fff",
    "createdAt": "2023-11-27T17:32:24.109+00:00",
    "updatedAt": "2023-11-28T12:50:34.458+00:00",
    "__v": 0
  }]
  
describe('testing user posts component', () => {
    it('should render posts correctly', async () => {
        global.fetch = vi.fn()

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) }
}

fetch.mockResolvedValue(createFetchResponse(dataArray))
const data = await ( await userService.getUserPosts('65579551286ee71f5cbf0fff')).json()
    expect(data).toStrictEqual(dataArray)
    })
})
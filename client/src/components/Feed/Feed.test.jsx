import { describe, expect, it, vi } from "vitest";
import { render, waitFor } from '@testing-library/react';
import * as postService from '../../service/postService'
import { BrowserRouter } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorContext.jsx";
import { UserContext } from "../../contexts/AuthContext.jsx";
import Feed from "./Feed.jsx";

const posts = [
    {
      _id: "6557985c286ee71f5cbf1041",
      userAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lj6Uv0ddAQ8LHb…",
      country: "Usa",
      city: "Seatle",
      imageUrl: "https://media.timeout.com/images/106030305/750/562/image.jpg",
      cost: 5678,
      description: "From its emerald parks to the endless views of Puget Sound, Seattle is…",
      likes: [],
      owner: "655795e0286ee71f5cbf1014",
      createdAt: "2023-11-17T16:44:12.834+00:00",
      updatedAt: "2023-11-24T09:25:12.767+00:00",
      __v: 0
    },
    {
      _id: "6564d2a82834ac660cf7c947",
      userAvatar: "https://wow.zamimg.com/modelviewer/live/webthumbs/outfit/127/298111.jp…",
      country: "UsaEdit",
      city: "Boston",
      imageUrl: "https://media.timeout.com/images/105483065/750/562/image.jpg",
      cost: 2222,
      description: "dadasdasdasdasdsddsadas",
      likes: [],
      owner: "65579551286ee71f5cbf0fff",
      createdAt: "2023-11-27T17:32:24.109+00:00",
      updatedAt: "2023-11-28T12:50:34.458+00:00",
      __v: 0
    },
  ];
  

describe('Tesing feed component', () => {
  const loggedUser = 'Pesho';
  const setLoggedUser = vi.fn();
  const errorMessage = '';
  const setErrorMessage = vi.fn();
    it('should render all the data', async () => {
     vi.spyOn(postService, 'getAllPosts').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(posts)
      })

      const { getByText } = render(
        <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <UserContext.Provider value={[loggedUser, setLoggedUser]}>
            <Feed />
          </UserContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
      );

      await waitFor(() => {
        expect(getByText('Usa')).toBeTruthy()
        expect(getByText('UsaEdit')).toBeTruthy()
      })
    })
})
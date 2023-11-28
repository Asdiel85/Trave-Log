import React from 'react';
import Router from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import EditPost from './EditPost';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('testing edit user component', () => {
    it('shoul render with correct data', async () => {
        global.fetch = vi.fn();

  function createFetchResponse(data) {
    return { json: () => new Promise((resolve) => resolve(data)) };
  }

  const user = {
    _id: "655795e0286ee71f5cbf1014",
    userAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lj6Uv0ddAQ8LHb…",
    firstName: "Martina",
    lastName: "Hristova",
    email: "asdiel4@abv.bg",
    password: "$2b$10$T0lL5K.4HGj7R5ar5BNjQOtho/Kb8HRSjqmA6Z5AqMZ/DdHmqWh1S",
    isAdmin: false,
    createdAt: "2023-11-17T16:33:36.929+00:00",
    updatedAt: "2023-11-17T16:33:36.929+00:00",
    __v: 0
  };

  fetch.mockResolvedValue(createFetchResponse(user));

  vi.spyOn(Router, 'useParams').mockReturnValue({
    id: '655795e0286ee71f5cbf1014',
  });

    })
})
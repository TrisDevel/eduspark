import { http, HttpResponse } from "msw";
import { profileFixture } from "../fixtures/profile";

export const profileHandlers = [
  // GET /api/profile - Get current user profile
  http.get("*/api/profile/:userId", ({ params }) => {
    const userId = String(params.userId);
    if (userId === profileFixture.userId) {
      return HttpResponse.json(profileFixture, { status: 200 });
    }
    return HttpResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }),

  // GET /api/profile/:username - Get profile by username
  http.get("*/api/profile/:username", ({ params }) => {
    const username = String(params.username);
    
    if (username === profileFixture.username) {
      return HttpResponse.json(profileFixture, { status: 200 });
    }
    
    return HttpResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }),

  // PUT /api/profile - Update profile
  http.put("*/api/profile", async ({ request }) => {
    const updates = await request.json() as Partial<typeof profileFixture>;
    
    const updatedProfile = {
      ...profileFixture,
      ...updates,
    };
    
    return HttpResponse.json(updatedProfile, { status: 200 });
  }),
];



import { z } from "zod";

export const changeUsernameSchema = z.object({
  username: z.string().min(3).max(20),
});

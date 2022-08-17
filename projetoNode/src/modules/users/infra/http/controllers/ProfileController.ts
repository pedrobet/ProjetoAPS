import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";

import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import ShowProfileService from "@modules/users/services/ShowProfileService";

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return res.json({
      username: user.username,
      role: user.role,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { username, name, email, password, old_password } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      username,
      name,
      email,
      old_password,
      password,
      user_id,
    });

    return res.json(instanceToInstance(user));
  }
}

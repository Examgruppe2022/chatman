import type { User } from "@/models/User";

export interface Room{
  uuid: string;
  name: string;
  user: User;
}

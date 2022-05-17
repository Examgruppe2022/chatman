import { PartialType } from '@nestjs/swagger'
import { CreateFriendRequestDto} from "./create-friend-requests.dto";

export class UpdateFriendRequestDto extends PartialType(CreateFriendRequestDto) {}
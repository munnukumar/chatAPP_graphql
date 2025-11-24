import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { BaseSchema } from "../common/dto/base.dto";

export class SendMessageDto extends BaseSchema {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsString()
  @IsOptional()
  roomId: string = "general";
}

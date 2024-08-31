import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginPostDto {
  @ApiProperty({ type: String, example: "demo@gmail.com" })
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ type: String, example: "string" })
  @IsString()
  @IsNotEmpty()
  @Length(8)
  public password: string;
}

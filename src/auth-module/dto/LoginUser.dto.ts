import { IsNotEmpty, Min, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @MinLength(4)
    username: string;
    @MinLength(8)
    password: string;
}
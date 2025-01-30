// import { IsEmail, IsNotEmpty } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

// export class LoginDto {
//     @IsNotEmpty()
//     @IsEmail()
//     email: string;

//     @IsNotEmpty()
//     password: string;
// }
// OR

export class LoginDto extends PartialType(CreateUserDto) {}
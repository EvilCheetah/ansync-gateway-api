import { IsNumber, IsString } from "class-validator";
import { IsTax } from "@/decorator";


export class TransactionDTO
{
    @IsString()
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    quantity:    number;

    @IsNumber({ maxDecimalPlaces: 2 })
    unit_price:  number;

    @IsTax({ maxDecimalPlaces: 2 })
    tax:         string | number;
}

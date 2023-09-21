import { IsNumberOptions, ValidateBy, ValidationOptions, buildMessage, isNumber } from "class-validator";
import { TAX_EXEMPT } from "@/constant";


export const IS_TAX = 'IS_TAX';


export function isTax(value: unknown, options: IsNumberOptions = {})
{
    return (
        ( isNumber(value, options) ) || 
        ( typeof value === 'string' && value.toLocaleUpperCase() === TAX_EXEMPT )
    )
}


export function IsTax(options: IsNumberOptions = {}, validation_options?: ValidationOptions)
{
    return ValidateBy({
        name: IS_TAX,
        constraints: [options],
        validator: {
            validate: (value, args): boolean => isTax(value, args.constraints[0]),
            defaultMessage: buildMessage(
                each_prefix => each_prefix + '$property must be a valid tax rate',
                validation_options
            )
        }
    }, validation_options);
}
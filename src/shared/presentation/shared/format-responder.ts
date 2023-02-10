import  { FormatResponderInterface, ResponsePayloadInterface } from './format-response.interface';

export class FormatResponder implements FormatResponderInterface
{
    getFormatData = (data: unknown, metadata: Record<string, unknown>): ResponsePayloadInterface =>
    {
        return {
            data,
            metadata: metadata ?? undefined
        };
    };
}

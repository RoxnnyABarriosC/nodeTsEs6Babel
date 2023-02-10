export interface ResponsePayloadInterface
{
    data: unknown;
    metadata?: unknown;
}

export interface FormatResponderInterface
{
    getFormatData(data: unknown, metadata: Record<string, unknown> | null): ResponsePayloadInterface
}

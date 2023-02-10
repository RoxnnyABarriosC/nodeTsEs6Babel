import { ErrorMessageInterface } from './error-message.interface';

export class ErrorException extends Error
{
    public metadata: Record<string, any>;
    public errorCode: string | null;

    constructor(errorMessage: ErrorMessageInterface, name = ErrorException.name, metadata: Record<string, any> = {})
    {
        super();
        this.name = name;
        this.metadata = metadata;
        this.message = errorMessage.message;
        this.errorCode = errorMessage?.errorCode ?? null;
    }
}

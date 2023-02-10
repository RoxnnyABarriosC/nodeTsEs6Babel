import {
    PaginatorTransformer,
    Transformer
} from '@digichanges/shared-experience';
import { IHttpStatusCode } from '@digichanges/shared-experience/src/InterfacesAdapters';
import { Request, Response } from 'express';
import { Paginator } from '../../../modules/user/infrastructure/shared/paginator';
import { FormatError } from './format-error';
import { FormatResponder } from './format-responder';
import { FormatResponderInterface } from './format-response.interface';

export class Responder
{
    private formatResponder: FormatResponderInterface;
    private formatError: FormatError;

    constructor()
    {
        this.formatResponder = new FormatResponder();
        this.formatError = new FormatError();
    }

    public async send(data: any, request: Request | any, response: Response, status: IHttpStatusCode, transformer?: Transformer)
    {
        let metadata = null;

        if (request)
        {
            metadata = {
                refreshToken: request.refreshToken
            };
        }

        if (!transformer)
        {
            return response.status(status.code).send({ data: { ...data, metadata } });
        }

        data = await transformer.handle(data);

        await response.status(status.code).send(this.formatResponder.getFormatData(data, metadata));
    }

    // TODO: Refactor to encapsulate this logic
    public async paginate(paginator: Paginator<any>, request: Request | any, response: Response, status: IHttpStatusCode, transformer?: Transformer)
    {
        const data = await paginator.paginate();
        const metadata = paginator.getMetadata();
        const result = this.formatResponder.getFormatData(data, metadata);

        if (!transformer)
        {
            return response.status(status.code)
                .send({
                    data,
                    metadata
                });
        }

        result.data = await transformer.handle(data);

        if (paginator.getExist())
        {
            const paginatorTransformer = new PaginatorTransformer();
            paginator = await paginatorTransformer.handle(paginator);

            const pagination = { pagination: paginator };

            Object.assign(result, pagination);
        }

        await response.status(status.code).send(result);
    }

    public error(data: any, request: Request | any, response: Response, status: IHttpStatusCode, metadata?: Record<string, any>)
    {
        response.status(status.code).send({ ...this.formatError.getFormat(data), metadata });
    }
}

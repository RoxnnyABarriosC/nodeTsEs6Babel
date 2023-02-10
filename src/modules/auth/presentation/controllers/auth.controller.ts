import { StatusCode } from '@digichanges/shared-experience';
import { DELETE, GET, PATCH, POST, PUT, route } from 'awilix-express';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { ConfigInterface } from '../../../../config/config.interface';
import { DtoValidator } from '../../../../shared/presentation/shared/dto-validator';
import { Responder } from '../../../../shared/presentation/shared/responder';
import { LoginUseCase } from '../../domain/useCases/login.useCase';
import { LoginDto } from '../dtos/loginDto';
import { AuthTransform } from '../transformers/Auth.transform';

type Dependencies = {
    loginUseCase: LoginUseCase,
    config: ConfigInterface
}

@route('/auth')
export default class AuthController
{
    private responder: Responder;
    private config: ConfigInterface;
    private loginUseCase: LoginUseCase;


    constructor({ loginUseCase, config }: Dependencies)
    {
        this.responder = new Responder();
        this.config = config;
        this.loginUseCase = loginUseCase;
    }

    @POST()
    @route('/login')
    async login(req: Request, res: Response)
    {
        const dto = new LoginDto(req.body);
        await DtoValidator.handle([dto]);
        const data = await this.loginUseCase.handle(dto);

        res.cookie(
            'refreshToken',
            data.getRefreshHash(),
            {
                expires: dayjs.unix(data.getExpires()).toDate(),
                maxAge: data.getExpires(),
                path: `${this.config.server.prefix}${this.config.server.version}`,
                secure: this.config.setCookieSecure,
                httpOnly: true,
                sameSite: this.config.setCookieSameSite as any
            });

        return await this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new AuthTransform());
    }
}

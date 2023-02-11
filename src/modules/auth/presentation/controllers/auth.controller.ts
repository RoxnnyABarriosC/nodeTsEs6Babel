import { StatusCode } from '@digichanges/shared-experience';
import { AwilixContainer } from 'awilix/lib/container';
import { GET, PATCH, POST, PUT, before, route } from 'awilix-express';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { ConfigInterface } from '../../../../config/config.interface';
import { DtoValidator } from '../../../../shared/presentation/shared/dto-validator';
import { Responder } from '../../../../shared/presentation/shared/responder';
import { DefaultTransform } from '../../../../shared/presentation/transformers/default.transform';
import { UserTransform } from '../../../user/presentation/transformers/user.transform';
import { DecodeTokenInterface } from '../../domain/services/decode-token.interface';
import { ChangeMyPasswordUseCase } from '../../domain/useCases/change-my-password.useCase';
import { LoginUseCase } from '../../domain/useCases/login.useCase';
import { LogoutUseCase } from '../../domain/useCases/logout.useCase';
import { RefreshTokenUseCase } from '../../domain/useCases/refresh-token.useCase';
import { RegisterUseCase } from '../../domain/useCases/register.useCase';
import { UpdateMeUseCase } from '../../domain/useCases/update-me.useCase';
import { RegisterDto } from '../dtos/Register.dto';
import { ChangeMyPasswordDto } from '../dtos/change-my-password.dto';
import { LoginDto } from '../dtos/login.dto';
import { MeDto } from '../dtos/me.dto';
import { AuthenticateMiddleware } from '../middlewares/authenticate.middleware';
import { RefreshTokenMiddleware } from '../middlewares/refresh-token.middleware';
import { AuthTransform } from '../transformers/Auth.transform';

type Dependencies = {
    config: ConfigInterface
    loginUseCase: LoginUseCase,
    registerUseCase: RegisterUseCase,
    logoutUseCase: LogoutUseCase,
    refreshTokenUseCase: RefreshTokenUseCase,
    updateMeUseCase: UpdateMeUseCase,
    changeMyPasswordUseCase: ChangeMyPasswordUseCase
}

@route('/auth')
export default class AuthController
{
    private readonly config: ConfigInterface;
    private readonly responder: Responder;
    private readonly loginUseCase: LoginUseCase;
    private readonly registerUseCase: RegisterUseCase;
    private readonly logoutUseCase: LogoutUseCase;
    private readonly refreshTokenUseCase: RefreshTokenUseCase;
    private readonly updateMeUseCase: UpdateMeUseCase;
    private readonly changeMyPasswordUseCase: ChangeMyPasswordUseCase;


    constructor({ config, loginUseCase, registerUseCase, logoutUseCase, refreshTokenUseCase, updateMeUseCase, changeMyPasswordUseCase }: Dependencies)
    {
        this.responder = new Responder();
        this.config = config;
        this.loginUseCase = loginUseCase;
        this.registerUseCase = registerUseCase;
        this.logoutUseCase = logoutUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.updateMeUseCase = updateMeUseCase;
        this.changeMyPasswordUseCase = changeMyPasswordUseCase;
    }

    @GET()
    @route('/me')
    @before([AuthenticateMiddleware()])
    async me(req: Request, res: Response)
    {
        const container: AwilixContainer = (req as any).container;
        return await this.responder.send(container.resolve('authUser'), req, res, StatusCode.HTTP_OK, new UserTransform());
    }

    @PUT()
    @route('/me')
    @before([AuthenticateMiddleware()])
    async updateMe(req: Request, res: Response)
    {
        const dto = new MeDto(req.body);
        await DtoValidator.handle([dto]);
        const data = await this.updateMeUseCase.handle(dto);

        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransform());
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
                path: `${this.config.server.prefix}${this.config.server.version}/auth`,
                secure: this.config.setCookieSecure,
                httpOnly: true,
                sameSite: this.config.setCookieSameSite
            });

        return await this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new AuthTransform());
    }

    @POST()
    @route('/register')
    async register(req: Request, res: Response)
    {
        const dto = new RegisterDto(req.body);
        await DtoValidator.handle([dto]);
        const data = await this.registerUseCase.handle(dto);

        return await this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new DefaultTransform());
    }

    @POST()
    @route('/logout')
    @before([AuthenticateMiddleware()])
    async logout(req: Request & { refreshToken: string, decodeToken: DecodeTokenInterface }, res: Response)
    {
        const data = await this.logoutUseCase.handle(req.refreshToken, req.decodeToken);

        res.cookie(
            'refreshToken',
            null,
            {
                expires: dayjs.unix(0).toDate(),
                maxAge: 0,
                path: `${this.config.server.prefix}${this.config.server.version}`,
                secure: this.config.setCookieSecure,
                httpOnly: true,
                sameSite: this.config.setCookieSameSite
            });

        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new DefaultTransform());
    }

    @POST()
    @route('/refresh-token')
    @before([RefreshTokenMiddleware])
    async refreshToken(req: Request & { refreshToken: string }, res: Response)
    {
        const data = await this.refreshTokenUseCase.handle(req.refreshToken);

        res.cookie(
            'refreshToken',
            data.getRefreshHash(),
            {
                expires: dayjs.unix(data.getExpires()).toDate(),
                maxAge: data.getExpires(),
                path: `${this.config.server.prefix}${this.config.server.version}/auth`,
                secure: this.config.setCookieSecure,
                httpOnly: true,
                sameSite: this.config.setCookieSameSite
            });

        return await this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new AuthTransform());
    }

    @PATCH()
    @route('/change-my-password')
    @before([AuthenticateMiddleware()])
    async changeMyPassword(req: Request & { refreshToken: string }, res: Response)
    {
        const dto = new ChangeMyPasswordDto(req.body);
        await DtoValidator.handle([dto]);
        const data = await this.changeMyPasswordUseCase.handle(dto);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransform());
    }
}

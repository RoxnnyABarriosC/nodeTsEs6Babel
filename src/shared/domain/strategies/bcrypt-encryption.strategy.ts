import { IEncryption } from '@digichanges/shared-experience';
import bcrypt from 'bcrypt';
import { configuration } from '../../../config/configuration';
import { DecryptForbiddenException } from '../exceptions/decrypt-forbidden.exception';

const config = configuration();

export class BcryptEncryptionStrategy implements IEncryption
{
    async compare(chain: string, chainHashed: string): Promise<boolean>
    {
        return await bcrypt.compare(chain, chainHashed);
    }

    async decrypt(chain: string): Promise<string>
    {
        throw new DecryptForbiddenException();
    }

    async encrypt(chain: string): Promise<string>
    {
        const saltRounds: number = config.encryption.bcrypt.saltRounds;
        return await bcrypt.hash(chain, saltRounds);
    }
}


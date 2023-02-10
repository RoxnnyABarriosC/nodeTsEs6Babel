import { IEncryption } from '@digichanges/shared-experience';
import md5 from 'md5';
import { DecryptForbiddenException } from '../exceptions/decrypt-forbidden.exception';

export class Md5EncryptionStrategy implements IEncryption
{
    async compare(chain: string, chainHashed: string): Promise<boolean>
    {
        return md5(chain) === chainHashed;
    }

    async decrypt(chain: string): Promise<string>
    {
        throw new DecryptForbiddenException();
    }

    async encrypt(chain: string): Promise<string>
    {
        return md5(chain);
    }
}

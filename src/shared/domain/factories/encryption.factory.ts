import { IEncryption } from '@digichanges/shared-experience';
import { configuration } from '../../../config/configuration';
import { BcryptEncryptionStrategy } from '../strategies/bcrypt-encryption.strategy';
import { Md5EncryptionStrategy } from '../strategies/md5-encryption.strategy';

const config = configuration();

export class EncryptionFactory
{
    static create(encryptionConfig: string = config.encryption.default): IEncryption
    {
        const encryptions: Record<string, any>  = {
            bcrypt: BcryptEncryptionStrategy,
            md5: Md5EncryptionStrategy
        };

        return new encryptions[encryptionConfig]();
    }
}

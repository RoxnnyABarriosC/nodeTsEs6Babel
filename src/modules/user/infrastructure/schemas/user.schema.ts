import { EntitySchema } from 'typeorm';
import { BaseColumnsSchema } from '../../../../shared/infrastructure/schemas/base-columns.schema';
import { Entity } from '../../../../shared/types/entity';
import { User } from '../../domain/entities/user.entity';
import GenderEnum from '../../domain/enums/gender.enum';

export const UserSchema = new EntitySchema<Entity<User>>({
    name: 'User',
    target: User,
    tableName: 'User',
    columns: {
        ...BaseColumnsSchema,
        userName: {
            type: String,
            unique: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        gender: {
            type: String,
            enum: GenderEnum
        },
        enable: {
            type: Boolean,
            default: true
        },
        verify: {
            type: Boolean,
            default: false
        },
        birthday: {
            type: Date
        }
    }
});

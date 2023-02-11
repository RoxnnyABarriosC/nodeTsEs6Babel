import { EntitySchema } from 'typeorm';
import { BaseColumnsSchema } from '../../../../shared/infrastructure/schemas/base-columns.schema';
import { Entity } from '../../../../shared/types/entity';
import { Item } from '../../domain/entities/item.entity';

export const ItemSchema = new EntitySchema<Entity<Item>>({
    name: 'Item',
    target: Item,
    tableName: 'items',
    columns: {
        ...BaseColumnsSchema,
        name: {
            type: String,
            unique: true
        },
        description: {
            type: String
        }
    },
    relations: {
        createdBy: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: true,
            eager: true
        }
    }
});

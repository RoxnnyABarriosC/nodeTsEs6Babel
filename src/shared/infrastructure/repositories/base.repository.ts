import { EntitySchema, FindOneOptions, In, ObjectLiteral, Repository } from 'typeorm';
import { NotFoundException } from '../../domain/exceptions/not-found.exception';
import { dataSource } from '../shared/db-create-connection';
import { ByOptionsInterface } from './by-options.interface';

export abstract class BaseRepository<T extends ObjectLiteral>
{
    protected readonly entityName: string;
    protected readonly repository: Repository<T>;

    protected constructor(entityName: string, schema: EntitySchema)
    {
        this.entityName = entityName;
        this.repository = dataSource.getRepository<T>(schema);
    }

    async save(entity: T): Promise<T>
    {
        return await this.repository.save(entity as any);
    }

    async getOne(id: string, withDeleted = false): Promise<T>
    {
        const entity = await this.repository.findOne({ withDeleted, where: { _id: id } as any });

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async update(entity: T): Promise<T>
    {
        return await this.repository.save(entity);
    }

    async delete(id: string, softDelete = true, withDeleted = false): Promise<T>
    {
        const entity: any = await this.repository.findOne({ withDeleted, where: { _id: id } as any });

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        if (softDelete)
        {
            await this.repository.softDelete(id);
        }
        else
        {
            await this.repository.delete(id);
        }

        entity.deletedAt = new Date();

        return entity;
    }

    async getOneBy(condition: Record<string, any>, options: ByOptionsInterface = { initThrow: true }, withDeleted = false): Promise<T | null>
    {
        const { initThrow } = options;

        const entity = await this.repository.findOne({ withDeleted, where: condition as any });

        if (initThrow && !entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getBy(condition: Record<string, any>, options: ByOptionsInterface = { initThrow: false }): Promise<T[]>
    {
        const { initThrow } = options;

        const entities = await this.repository.findBy(condition as any);

        if (initThrow && entities.length === 0)
        {
            throw new NotFoundException(this.entityName);
        }

        return entities;
    }

    async getInBy(condition: Record<string, string[]>): Promise<T[]>
    {
        const [key] = Object.keys(condition);

        return await this.getBy({ [key]: In(condition[key]) });
    }

    async exist(condition: Record<string, any> | Record<string, any>[], select: string[], initThrow = false, withDeleted = false): Promise<any>
    {
        const conditionMap: FindOneOptions = {
            select,
            where: condition,
            loadEagerRelations: false,
            withDeleted
        };

        const exist = await this.repository.findOne(conditionMap as FindOneOptions<T>);

        if (initThrow && !exist)
        {
            throw new NotFoundException(this.entityName);
        }

        return exist;
    }

    async restore(id: string): Promise<T>
    {
        const entity: any = await this.repository.findOne({ withDeleted: true, where: { _id: id } as any });

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        void await this.repository.restore(id);

        entity.deletedAt = null;

        return entity;
    }
}


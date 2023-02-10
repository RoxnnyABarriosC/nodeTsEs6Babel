import { PrototypeToString, StringPrototypes } from './prototype-to-string';

declare type Fn = (value: any, key?: string) => any;

export function CloneDeepMap<I extends object = any>(
    object: I,
    copyPrototype = false,
    fn: Fn = (value) => value,
    ctx?: any
): I
{
    const prototypeString = PrototypeToString(object) as StringPrototypes;

    const validate = (val: any, key: any, toAssign?: any) =>
    {
        if (
            PrototypeToString(val, StringPrototypes.OBJECT) ||
            PrototypeToString(val, StringPrototypes.ARRAY))
        {
            const result = CloneDeepMap(val as any, copyPrototype, fn, ctx);
            if (toAssign)
            {
                toAssign[key] = result;
            }
            else
            {
                return result;
            }
        }
        else
        {
            const result = fn.call(ctx, val, key);

            if (toAssign)
            {
                toAssign[key] = result;
            }
            else
            {
                return result;
            }
        }
    };

    const mapObject = (data: object) =>
    {
        let res: any = {};

        if (copyPrototype)
        {
            res = Object.assign(Object.create(Object.getPrototypeOf(data)));
        }

        for (const key in object)
        {
            const val = object[key];
            validate(val, key, res);
        }
        return res;
    };

    const mapArray = (data: any[]) =>
    {
        return <I>(<unknown>data.map((val, key) => validate(val, key)));
    };

    const exec = {
        [StringPrototypes.OBJECT]: mapObject,
        [StringPrototypes.ARRAY]: mapArray
    };

    return exec[prototypeString] ? exec[prototypeString](object) : object;
}

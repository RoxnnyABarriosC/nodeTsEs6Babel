const Parse = <T = any>(value: any) =>
{
    try
    {
        return <T> JSON.parse(value);
    }
    catch (e)
    {
        return value;
    }
};

export default Parse;

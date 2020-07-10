const obj = { a: 1, b: 2, c: 3, d: 4 };
export const test = () => {
    console.log({ ...obj, a: 10 });
};

export default () => obj;

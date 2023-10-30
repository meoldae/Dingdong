import { atom } from 'recoil';

const letterIdAtom = atom({
    key: 'letterIdState',
    default: null
});

export { letterIdAtom }
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const userAtom = atom({
    key: "userAtom",
    default: {
        accessToken: "",
        nickname: "",
        roomId: null,
        avatarId: null
    },
    effects: [
        ({ setSelf, onSet }) => {
            const savedData = localStorage.getItem("userAtom");
            if (savedData) setSelf(JSON.parse(savedData));

            onSet((newValue, _, isReset) => {
                isReset
                    ? localStorage.removeItem("userAtom")
                    : localStorage.setItem("userAtom", JSON.stringify(newValue));
            });
        }
    ]
});

export { userAtom };
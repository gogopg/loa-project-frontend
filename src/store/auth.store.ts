import {
    atom,
} from 'recoil';

let loginState = atom({
   key: 'isLogin',
   default: false
});

export default loginState;
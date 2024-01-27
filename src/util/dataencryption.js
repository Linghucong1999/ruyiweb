import { JSEncrypt } from 'jsencrypt';
// 数据加密
export const encryption = (data, publicKey) => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const result = encrypt.encrypt(data);
    return result;
};
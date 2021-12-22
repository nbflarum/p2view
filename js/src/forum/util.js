export default class UTIL {
    static decodeContent(str) {
        let ret = null;
        
        ret = UTIL.decrypt("textToChars(salt)",str);
        if(ret.slice(0,2)!="||") 
        	ret = str;
        else
            ret = ret.slice(2)
        
        if (ret.indexOf('http://') != -1 || ret.indexOf('https://') != -1) 
            ret =`<a href='${ret}'>${ret}</a>`;
        
        return ret;
    }
    static encodeContent(str){
    	str = "||" + str;
    	return UTIL.crypt("textToChars(salt)",str)
    }
    static crypt(salt, text) {
        const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
        const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

        return text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
    }

    static decrypt(salt, encoded) {
        const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded
            .match(/.{1,2}/g)
            .map((hex) => parseInt(hex, 16))
            .map(applySaltToChar)
            .map((charCode) => String.fromCharCode(charCode))
            .join('');
    }
}

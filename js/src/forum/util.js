export default class UTIL {
    static decodeContent(str) {
        let ret = null;

        ret = UTIL.b64DecodeUnicode(str);
        if (ret.slice(0, 2) != '||') ret = str;
        else ret = ret.slice(2);

        if (ret.indexOf('http://') != -1 || ret.indexOf('https://') != -1) ret = `<a href='${ret}'>${ret}</a>`;

        return ret;
    }
    static encodeContent(str) {
        str = '||' + str;
        return UTIL.b64EncodeUnicode(str);
    }
    static b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(
            encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            })
        );
    }
    static b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        try{
	        const ret = decodeURIComponent(
	            atob(str)
	                .split('')
	                .map(function (c) {
	                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	                })
	                .join('')
	        );
	        return ret
    	}catch(e){
    		return str
    	}
    }
}

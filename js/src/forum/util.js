export default class UTIL{
	static decodeContent(str){
		let ret = null
		try{
			ret = atob(str)
		}catch(e){}
		if(ret.indexOf('http://')!=-1||ret.indexOf('https://')!=-1){
			return `<a href='${ret}'>${ret}</a>`
		}
		return ret
	}
}
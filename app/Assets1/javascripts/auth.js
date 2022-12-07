class Auth {
    get userInfo() {
        if (this._userInfo) {
            return this._userInfo;
        }else{
            const userInfoString = window.localStorage.getItem('USER_INFO');
            this._userInfo = JSON.parse(userInfoString);
            return this._userInfo;
        }
    }
    get accessToken(){
        return window.localStorage.getItem('ACCESS_TOKEN');
    }
    set accessToken(accessToken){
        window.localStorage.setItem('ACCESS_TOKEN', accessToken);
    }
    callbacks = {
        onTokenUpdate:()=>{console.log('you must define onTokenUpdate to call it');}
    }
    setUser(accessToken, userInfo) {
        window.localStorage.setItem('ACCESS_TOKEN', accessToken);
        this.callbacks.onTokenUpdate(accessToken);
        this.setCookie(accessToken);
        window.localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    }
    setCookie(accessToken){
        document.cookie = `Authorization=${accessToken}; SameSite=None`;
    }
    deleteCookie() {
        var d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*-1);
        document.cookie = "Authorization=null;path=/;expires=" + d.toGMTString();
    }
    logout(){
        window.localStorage.removeItem('ACCESS_TOKEN');
        this.deleteCookie();
        window.localStorage.removeItem('USER_INFO');
    }
}
export default new Auth();
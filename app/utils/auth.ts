export type UserInfo = any;
class Auth {
    //TODO: type this base on your app user info
    #userInfo:UserInfo
    get userInfo() {
        if (this.#userInfo) {
            return this.#userInfo;
        }else{
            const userInfoString = window.localStorage.getItem('USER_INFO');
            if(userInfoString){
                this.#userInfo = JSON.parse(userInfoString);
                return this.#userInfo;
            }

        }
    }
    get accessToken():string | null{
        return window.localStorage.getItem('ACCESS_TOKEN');
    }
    set accessToken(accessToken:string){
        window.localStorage.setItem('ACCESS_TOKEN', accessToken);
    }
    callbacks = {
        onTokenUpdate:(_:string)=>{console.log('you must define onTokenUpdate to call it');}
    }
    setUser(accessToken:string, userInfo:UserInfo) {
        window.localStorage.setItem('ACCESS_TOKEN', accessToken);
        this.callbacks.onTokenUpdate(accessToken);
        this.setCookie(accessToken);
        window.localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    }
    setCookie(accessToken:string){
        document.cookie = `Authorization=${accessToken}; SameSite=None`;
    }
    deleteCookie() {
        var d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*-1);
        document.cookie = "Authorization=null;path=/;expires=" + d.toISOString();
    }
    logout(){
        window.localStorage.removeItem('ACCESS_TOKEN');
        this.deleteCookie();
        window.localStorage.removeItem('USER_INFO');
    }
}
export const authManager =  new Auth();
function goToHome(history) {
    const revoker = history.listen((location)=>{
        if (location.pathname !== "/home") {
            history.goBack();
        }else{
            revoker();
        }
    });
    history.goBack();
}

export { goToHome };

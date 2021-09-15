

export const useToken = (pathName) => {

    const isLoggedIn = !!localStorage.getItem("token");
    let path = "";

    if(!isLoggedIn) {
        path = "/admin/login";
        console.log('works!!!!!!!!!!')
    } else {
        path = pathName;
        console.log('doesnt work!!!!!!!!!!')
    }

    return [path, isLoggedIn];
};
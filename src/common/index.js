const backendDomin = "http://localhost:5000"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : "get"
    },
    allUser : {
        url : `${backendDomin}/api/allUsers`,
        method : "get"
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : "post"
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`, 
        method : "post"
    },
    productDetails : {
        url :  `${backendDomin}/api/product-details`,
        method : "post"
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : "post" 
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct` ,
        method : "get"
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : "get" 
    },
    updateCardProduct : {
        url : `${backendDomin}/api/update-card-product`,
        method : "post" 
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-card-product` ,
        method : "post" 
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    }
}

export default SummaryApi
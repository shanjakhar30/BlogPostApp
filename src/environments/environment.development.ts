export const environment = {
    production: false,
    apiUrl: 'https://localhost:44395/api/',
    imageUrl : "https://localhost:44395/blogs/",
    endpoints: {
        register: 'Users/Register',
        login: 'Users/Login',
        createBlog: 'Blog/CreateBlog',
        getAllBlogsList: 'Blog/GetAllBlogsList',
        getBlogsList: 'Blog/GetBlogsList',
        getBlogById: 'Blog/GetBlogById',
        updateBlog: 'Blog/UpdateBlog'
      } 
};

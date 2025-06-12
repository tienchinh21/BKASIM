const mapBlogListDTO = (blog) => {
    return {
        id: blog.id,
        title: blog.title,
        image: blog.image,
        summary: blog.summary,
        createdAt: blog.createdAt,
        category: blog.category ? {
            id: blog.category.id,
            name: blog.category.name
        } : null,
        status: blog.status,
        isFeatured: blog.isFeatured
    };
};

const mapBlogDetailDTO = (blog) => {
    return {
        id: blog.id,
        title: blog.title,
        summary: blog.summary,
        content: blog.content,
        image: blog.image,
        createdAt: blog.createdAt,
        category: blog.category ? {
            id: blog.category.id,
            name: blog.category.name
        } : null,
        author: blog.author ? {
            id: blog.author.id,
            name: blog.author.name
        } : null,
        status: blog.status,
        isFeatured: blog.isFeatured
    };
};

module.exports = {
    mapBlogListDTO,
    mapBlogDetailDTO
};
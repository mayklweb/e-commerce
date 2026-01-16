export const categoriesList = '/categorys'
export const bannersList = '/banner'
export const productsRecommendedList = '/products?isRecommended=true'
export const productOffersList = '/products?isOffer=true'
export const categoryRecommendedList = '/categorys?isRecommended=true'
export const recommendedCategoryProductsList = (arr) => `/products?${arr.map(id => `category_id[]=${id}`).join('&')}`
export const productsFilter = (arr) => `/products?${arr.map(id => `brand_id[]=${id}`).join('&')}`
export const brandsList = '/brands'
export const productWithCategoryId = (id) => `/products?category_id=${id}`
export const productWithSlug = (slug) => `/products?_relations=brands,categorys&slug=${slug}`

export const registerUrl = '/register'

export const orderPost = '/orders'
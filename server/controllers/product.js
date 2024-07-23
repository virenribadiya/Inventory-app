// import { Product } from "../models/index.js";

// export const productController = {
//     async getAllProducts(req, res) {
//         try {
//             const { searchData, categoryFilter, maxPrice, minPrice, sort } = req.body;
//             let page = Number(req.body.page) || 1;
//             let limit = Number(req.body.limit) || 9;
//             let searchQueryObject = { isDelete: false };
//             let orConditions = [];

//             // if (searchData) {
//             //     orConditions.push(
//             //         { name: { $regex: searchData, $options: 'i' } }, // Search in the name field
//             //         { price: parseFloat(searchData) || null }
//             //     );
//             // }

//             // const searchRegex = new RegExp(searchData, 'i'); // Case-insensitive regex
//             // orConditions.push(
//             //     { name: searchRegex }, // Search in the name field
//             //     { price: parseFloat(searchData) || null }
//             // );

//             // // Handle categories and subcategories
//             // if (categoryFilter && categoryFilter.length > 0) {
//             //     categoryFilter.forEach(cat => {
//             //         orConditions.push({
//             //             category: cat.categoryId,
//             //             subCategory: { $in: cat.subCategoryId }
//             //         });
//             //     });
//             // }

//             // // Combine $or conditions
//             // if (orConditions.length > 0) {
//             //     searchQueryObject.$or = orConditions;
//             // }

//             // searchQueryObject = {
//             //     // "name": new RegExp(searchData, 'i'),
//             //     // "$and": [
//             //     //     {
//             //     //         "category": "66472699e97e3b8f670f42ab",
//             //     //         "subCategory": {
//             //     //             "$in": [
//             //     //                 "66472699e97e3b8f670f42ac"
//             //     //             ]
//             //     //         }
//             //     //     }
//             //     // ],
//             //     // "price": {
//             //     //     "$lte": 100,
//             //     //     "$gte": 10
//             //     // }
//             // }

//             // // Handle maxPrice and minPrice
//             // if (maxPrice || minPrice) {
//             //     searchQueryObject.price = {};
//             //     if (maxPrice) {
//             //         searchQueryObject.price.$lte = parseFloat(maxPrice);
//             //     }
//             //     if (minPrice) {
//             //         searchQueryObject.price.$gte = parseFloat(minPrice);
//             //     }
//             // }

//             console.log("searchQueryObject:", JSON.stringify(searchQueryObject, null, 2));

//             let apiData = Product.find(searchQueryObject);

//             if (sort) {
//                 apiData = apiData.sort(sort);
//             }

//             const totalDocCount = await Product.countDocuments(searchQueryObject);
//             const totalPages = Math.ceil(totalDocCount / limit);

//             // Adjust the limit if it exceeds the total count of documents
//             limit = Math.min(totalDocCount, limit);

//             // Ensure page does not exceed total pages
//             page = Math.min(page, totalPages);

//             let skip = (page - 1) * limit;

//             const products = await apiData.skip(skip).limit(limit);

//             const response = {
//                 data: {
//                     products: products,
//                     page: page,
//                     limit: limit,
//                     skip: skip,
//                     totalPages: totalPages,
//                     hits: totalDocCount
//                 }
//             }
//             res.status(200).json(response);
//         } catch (error) {
//             return res.status(500).json({ error });
//         }

//     }
// }

// import { Product } from "../models/index.js";

// export const productController = {
//     async getAllProducts(req, res) {
//         try {
//             const { searchData, categoryFilter, maxPrice, minPrice, sort } = req.body;
//             let page = Number(req.body.page) || 1;
//             let limit = Number(req.body.limit) || 9;
//             let searchQueryObject = { isDelete: false };
//             let andConditions = [];

//             // Handle search data
//             if (searchData) {
//                 andConditions.push({
//                     $or: [
//                         { name: { $regex: searchData, $options: 'i' } },
//                         { price: parseFloat(searchData) || null }
//                     ]
//                 });
//             }

//             // Handle categories and subcategories
//             if (categoryFilter && categoryFilter.length > 0) {
//                 const categoryConditions = categoryFilter.map(cat => ({
//                     category: cat.categoryId,
//                     subCategory: { $in: cat.subCategoryId }
//                 }));
//                 andConditions.push({ $or: categoryConditions });
//             }

//             // Handle maxPrice and minPrice
//             if (maxPrice || minPrice) {
//                 const priceCondition = {};
//                 if (maxPrice) {
//                     priceCondition.$lte = parseFloat(maxPrice);
//                 }
//                 if (minPrice) {
//                     priceCondition.$gte = parseFloat(minPrice);
//                 }
//                 andConditions.push({ price: priceCondition });
//             }

//             // Combine all conditions into the search query object
//             if (andConditions.length > 0) {
//                 searchQueryObject.$and = andConditions;
//             }

//             console.log("searchQueryObject:", JSON.stringify(searchQueryObject, null, 2));

//             let apiData = Product.find(searchQueryObject);

//             // Handle sorting
//             if (sort) {
//                 apiData = apiData.sort(sort);
//             }

//             // Pagination
//             const totalDocCount = await Product.countDocuments(searchQueryObject);
//             const totalPages = Math.ceil(totalDocCount / limit);

//             limit = Math.min(totalDocCount, limit);
//             page = Math.min(page, totalPages);
//             let skip = (page - 1) * limit;

//             const products = await apiData.skip(skip).limit(limit);

//             const response = {
//                 data: {
//                     products: products,
//                     page: page,
//                     limit: limit,
//                     skip: skip,
//                     totalPages: totalPages,
//                     hits: totalDocCount
//                 }
//             };
//             res.status(200).json(response);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//             res.status(500).json({ error: error.message });
//         }
//     }
// };


import { Product } from "../models/index.js";

export const productController = {
    async getAllProducts(req, res) {
        try {
            const { searchData, category, subCategory, maxPrice, minPrice, sort } = req.body;
            let page = Number(req.body.page) || 1;
            let limit = Number(req.body.limit) || 9;
            let queryObject = { isDelete: false };

            if (searchData) {
                queryObject.name = { $regex: searchData, $options: 'i' }; // Case-insensitive search
            }

            if (category && category.length > 0) {
                queryObject.category = { $in: category };
            }

            if (subCategory && subCategory.length > 0) {
                queryObject.subcategory = { $in: subCategory };
            }

            // Handle maxPrice and minPrice
            if (maxPrice || minPrice) {
                query.price = {};
                if (maxPrice) {
                    query.price.$lte = maxPrice;
                }
                if (minPrice) {
                    query.price.$gte = minPrice;
                }
            }

            let apiData = Product.find(searchQueryObject);

            if (sort) {
                apiData = apiData.sort(sort);
            }

            const totalDocCount = await Product.countDocuments(searchQueryObject);
            const totalPages = Math.ceil(totalDocCount / limit);

            // Adjust the limit if it exceeds the total count of documents
            limit = Math.min(totalDocCount, limit);

            // Ensure page does not exceed total pages
            page = Math.min(page, totalPages);

            let skip = (page - 1) * limit;

            const products = await apiData.skip(skip).limit(limit);

            const response = {
                data: {
                    products: products,
                    page: page,
                    limit: limit,
                    skip: skip,
                    totalPages: totalPages,
                    hits: totalDocCount
                }
            };
            res.status(200).json(response);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: error.message });
        }
    }
};



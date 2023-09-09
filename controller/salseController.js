const createError = require("http-errors")
const { Sales } = require("../models/salesModel");
const { successResponse } = require("./responseController");

// create sale 
const createSales = async (req, res, next) => {
    try {
        const reqBody = req.body;

        const createSale = await (await Sales.create(reqBody)).save()

        successResponse(res,{
            statusCode : 200,
            message : res.message,
            payload : {
                createSale
            }
        })

    } catch (error) {
        next( createError(400, "Route Not Found"))
        throw error;
    }
}

// total sale revenue 
const totalSaleRevenue = async (req, res, next) => {
    try {
        const totalRevenue = await Sales.aggregate([
            {
                $group : {
                    _id : null,
                    totalRevenue : {$sum : { $multiply : ["$quantity", "$price"]}}
                }
            }
        ])
          res.json({ totalRevenue });
    } catch (error) {
        next( createError(404, "Route not Found"));
        throw error;
    }
}

// totalSaleByProductid 
const totalSelByProductId = async(req,res, next) => {
    try {
        const totalSaleByProductid = await Sales.aggregate([
            {
                $group : {
                    _id : "$product",
                    totalQuantity : {$sum : "$quantity"}
                }
            }
        ])

        successResponse(res, {
            statusCode : 200,
            message : res.message,
            payload : {
                totalSaleByProductid
            }
        })
    } catch (error) {
        next(createError(404, 'Route Not Found'))
        throw error 
    }
}

// sales/top-products
const salesTopProducts = async(req, res, next) => {
    try {
        const topProductSales = await Sales.aggregate([
            {
                $group : {
                    _id : "$product",
                    totalRevenue : {$sum : {$multiply : ["$quantity", "$price"]}}
                }
            },
            {
                $sort: { totalRevenue: -1 },
              },
              {
                $limit: 5,
              },
        
        ]);
        successResponse(res, {
            statusCode : 200,
            message : res.message,
            payload : {
                topProductSales
            }
        })
    } catch (error) {
        next(createError(404, "Route Not Found"))
        throw error;
    }
}

// sale avarage price 
const saleAvaragePrice = async (req, res, next) => {
    try {
        const saleAvgPrice = await Sales.aggregate([
            {
                $group : {
                    _id : null,
                    avaragePrice : {$avg : "$price"}
                }
            }
        ]) 

        successResponse(res, {
            statusCode : 200,
            message : res.message,
            payload : {
                saleAvgPrice 
            }
        })
    } catch (error) {
        next(createError(404, "Route Not Found"))
        throw error;
    }
}

// sales/revenue-by-month
const salesRevenueByMonth = async (req, res, next) => {
    try {
        const revenueByMonth = await Sales.aggregate([
            {
              $group: {
                _id: {
                  year: { $year: '$date' },
                  month: { $month: '$date' },
                },
                totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
              },
            },
          ]);
        successResponse(res, {
            statusCode : 200,
            message : res.message,
            payload : {
                revenueByMonth
            }
        })
    } catch (error) {
        next(createError(404, "Route Not Foune"))
        throw error;
    }
}

// sales/highest-quantity-sold
const highestQuantitySold = async (req, res, next) => {
    try {
        const highestQtySold = await Sales.aggregate([
            {
                $group : {
                    _id : "$product",
                    maxQuantity : {$max : "$quantity"}
                }
            },
            {
                $sort: { maxQuantity: -1 },
              },
              {
                $limit: 1,
              },
        ])

        successResponse(res, {
            statusCode : 200,
            message : res.message,
            payload : {
                highestQtySold
            }
        })
    } catch (error) {
        next(createError(404, "Route not Foune..."))
        throw error
    }
}

module.exports = {
    createSales,
    totalSaleRevenue,
    totalSelByProductId,
    salesTopProducts,
    saleAvaragePrice,
    salesRevenueByMonth,
    highestQuantitySold
}
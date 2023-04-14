import express, { json } from "express";
import {
    AddCategory,
    AddProduct,
    deleteProductById,
    getAllProduct,
    getAllProductById,
    getCate,
    getProductById,
    getProductBySlug,
    updateProductById,
    ViewCategory,
    ViewProduct,
} from "./helper.js"

const router = express.Router();
// ---------------------Category------------------------//
router.post("/category", async function (req, res) {
    const { id, name, slug, descript, status, meta_title, meta_keyword, meta_description } = req.body;
    try {
         const result = await AddCategory({
            id,
            name,
            slug,
            descript,
            status,
            meta_title,
            meta_keyword,
            meta_description,
        })
        res.send({ status: "ok" })
        console.log(result);
    } catch (error) {
        res.send({ status: "error" })
    }
})

router.get("/viewcategory", async function (req, res) {
    const category = await ViewCategory()
    if (!category) {
        return res.status(401).send({
            message: "Something went wrong"
        });
    }
    res.status(200).send(category);
    
})

router.get("/getCategory", async function (req, res) {
    const cate = await getCate()
    if (!cate) {
        return res.status(401).send({
            message: "Something went wrong"
        });
    }
    res.status(200).send(cate);
})

// -------------------------------------------------------------//
                        // ----------------//

// ----------------------------Product-----------------------//
router.post("/addProduct", async function (req, res) {
    const { id, category_name, name, slug, descript, status, meta_title, meta_keyword, meta_description,
        price, original_price, qty, brand,rating, img, featured, popular } = req.body;

    try {

        const result = await AddProduct({
            id,
            category_name,
            slug,
            name,
            descript,
            meta_title,
            meta_keyword,
            meta_description,
            price,
            original_price,
            qty,
            rating,
            brand,
            img,
            featured,
            popular,
            status,
        })
        res.send({ status: "ok" })
        console.log(result);
    } catch (error) {
        res.send({ status: "error" })
    }
})

router.get("/editpro/:id", async function (req, res) {
    const { id } = req.params;
    console.log(id);
    try {
        const product = await getProductById(id);
        console.log(product)
        res.send(product)

    } catch (err) {
        res.status(404).send({ msg: "product not found" });
    }
})

router.put("/updateProduct/:id", async function (req, res) {
    const { id } = req.params;
    console.log(req.params, id);
    try {
        const data = req.body;
        const result = await updateProductById(id, data);
        console.log(result)
        res.send({ status: 'ok', data: result });
    } catch (error) {
        res.send({ status: "error" })
    }
})

router.get("/getProd/:slug", async function (req, res) {
    const { slug } = req.params;
    const prod = await getProductBySlug(slug)
    console.log(prod)
    res.send({ message: "success", prod: prod })
})

router.get("/viewproduct", async function (req, res) {
    const product = await ViewProduct()
    if (!product) {
        return res.status(401).send({
            message: "Something went wrong"
        });
    }
    res.status(200).send(product);
    
})

router.get("/allProduct", async function (request, response) {
    if(request.query.rating){
        request.query.rating=+request.query.rating;
       }
    //    console.log(request.query)

    const product = await getAllProduct(request)
    // console.log(product)
    response.send(product);
})

router.get("/cart/:id", async function (request, response) {

    const { id } = request.params;
    console.log(request.params, id);
    //    console.log(request.query)

    const product = await getAllProductById(id)
    console.log(product)
    response.send(product);
})

router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    console.log(id);
    console.log(request.params, id)
    const result = await deleteProductById(id)
    console.log(result);
    result.deletedCount > 0
        ? response.send({ msg: "Product delete successfully" })
        : response.status(404).send({ msg: "Product not found" })
})



export const adminRouter = router;
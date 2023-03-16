const e = require('express');
const mysql = require('mysql');
const categories = require('../helpers/categories');
require('dotenv').config();
const db = require('../helpers/db');

const product_category = (req, res) => {
  if (req.query.search)
    return res.redirect('/products?search=' + req.query.search);

  const category = categories.find(
    (el) => el.name === req.params.category?.toLowerCase()
  );

  let query = `SELECT * FROM products.${category.name}`;
  db.query(query, function (err, allProducts) {
    let args = [];
    if (req.query.color && req.query.color !== 'any') {
      query = `${query} WHERE FIND_IN_SET(?,colour_filter) > 0`;
      args = [...args, req.query.color];
      if (req.query.search) {
        query = `${query} AND product_name LIKE '%${req.query.search}%'`;
        // args = [...args, req.query.search];
      }
    } else if (req.query.search) {
      query = `${query} WHERE product_name LIKE '%${req.query.search}%'`;
      // args = [...args, req.query.search];
    }

    console.log('query', query);
    console.log('args', args);
    db.query(query, args, function (err, total_products) {
      if (req.query.page) {
        query = `${query} order by  product_id LIMIT ?,? `;
        args = [...args, (req.query.page - 1) * 8, 8];
      } else {
        query = `${query} order by  product_id LIMIT 0,8 `;
      }

      db.query(query, args, function (err, result) {
        if (err) throw err;

        console.log('allProducts.length', allProducts.length);
        let colour_filter = Array.from(allProducts);

        colour_filter = colour_filter.map((el) => el.colour_filter);

        let colors = [];
        colour_filter.forEach((el) => {
          let el_colors = el.split(',');

          el_colors.forEach((color) =>
            colors.push(color?.toLowerCase().trim() || color.trim())
          );
        });

        colour_filter = [...new Set(colors)];

        console.log('colors_available2', colour_filter);

        res.render('category', {
          url: req.originalUrl.split('?')[0],
          title: ' | products',
          products: result,
          colour_filter,
          length: total_products.length,
          category,
          userId: '',
          username: '',
        });
      });
    });
  });
};

const product_subCategory = (req, res) => {
  if (req.query.search)
    return res.redirect('/products?search=' + req.query.search);
  const category = categories.find(
    (el) => el.name === req.params.category?.toLowerCase()
  );
  const subCat = req.params.sub_cat;

  let query = `SELECT * FROM products.${category.name} WHERE sub_cat=?`;
  let args = [subCat];
  db.query(query, args, function (err, allProducts) {
    if (req.query.color && req.query.color !== 'any') {
      query = `${query} && FIND_IN_SET(?,colour_filter) > 0`;
      args = [...args, req.query.color];
    }

    if (req.query.search) {
      query = `${query} && product_name LIKE '%${req.query.search}%'`;
      // args = [...args, req.query.search];
    }

    console.log('args', args);
    db.query(query, args, function (err, total_products) {
      console.log('query', query);
      if (req.query.page) {
        query = `${query} order by  product_id LIMIT ?,? `;
        args = [...args, (req.query.page - 1) * 8, 8];
      } else {
        query = `${query} order by  product_id LIMIT 0,8 `;
      }

      db.query(query, args, function (err, result) {
        if (err) throw err;

        console.log('allProducts.length', allProducts.length);

        let colour_filter = Array.from(allProducts);

        colour_filter = colour_filter.map((el) => el.colour_filter);

        let colors = [];
        colour_filter.forEach((el) => {
          let el_colors = el.split(',');

          el_colors.forEach((color) =>
            colors.push(color?.toLowerCase().trim() || color.trim())
          );
        });

        colour_filter = [...new Set(colors)];

        console.log('colors_available2', colour_filter);
        res.render('category', {
          url: req.originalUrl.split('?')[0],
          title: ' | products',
          products: result,
          colour_filter,
          length: total_products.length,
          category,
          userId: '',
          username: '',
        });
      });
    });
  });
};

const product_sub_subCategory = (req, res) => {
  if (req.query.search)
    return res.redirect('/products?search=' + req.query.search);
  const subCat = req.params.sub_cat;
  const subCat_0 = req.params.sub_cat_0;
  const category = categories.find(
    (el) => el.name === req.params.category?.toLowerCase()
  );

  let query = `SELECT * FROM products.${category.name} WHERE sub_cat=? && sub_cat_0=?`;
  let args = [subCat, subCat_0];

  db.query(query, args, function (err, allProducts) {
    if (req.query.color && req.query.color !== 'any') {
      query = `${query} && FIND_IN_SET(?,colour_filter) > 0`;
      args = [...args, req.query.color];
    }

    if (req.query.search) {
      query = `${query} && product_name LIKE '%${req.query.search}%'`;
      // args = [...args, req.query.search];
    }

    db.query(query, args, function (err, total_products) {
      if (req.query.page) {
        query = `${query} order by  product_id LIMIT ?,? `;
        args = [...args, (req.query.page - 1) * 8, 8];
      } else {
        query = `${query} order by  product_id LIMIT 0,8 `;
      }

      db.query(query, args, function (err, result) {
        if (err) throw err;

        let colour_filter = Array.from(allProducts);

        colour_filter = colour_filter.map((el) => el.colour_filter);

        let colors = [];
        colour_filter.forEach((el) => {
          let el_colors = el.split(',');

          el_colors.forEach((color) =>
            colors.push(color?.toLowerCase().trim() || color.trim())
          );
        });

        colour_filter = [...new Set(colors)];

        console.log('colors_available2', colour_filter);

        res.render('category', {
          url: req.originalUrl.split('?')[0],
          title: ' | products',
          length: total_products.length,
          products: result,
          colour_filter,
          category,
          userId: '',
          username: '',
        });
      });
    });
  });
};

const product_details = (req, res) => {
  if (req.query.search) {
    res.redirect('/products?search=' + req.query.search);
  }
  let id = req.params.id;
  let category = categories.find(
    (el) => el.name === req.params.category?.toLowerCase()
  );

  if (!category)
    category = {
      name: 'promotions',
    };

  let query = `SELECT * FROM products.${category.name} WHERE product_id=?;`;
  let args = [id];

  db.query(query, args, function (err, result) {
    if (err) throw err;
    res.render('details', {
      url: undefined,
      category: undefined,
      title: ' | details',
      products: result,
      userId: '',
      username: '',
    });
  });
};

const promo_details = (req, res) => {
  let id = req.params.id;

  db.query(
    `SELECT * FROM products.promotions WHERE product_id=?;`,
    [id],
    function (err, result) {
      if (err) throw err;
      res.render('details', {
        url: undefined,
        category: undefined,
        title: ' | details',
        products: result,
        userId: '',
        username: '',
      });
    }
  );
};
const index = (req, res) => {
  if (req.query.search)
    return res.redirect('/products?search=' + req.query.search);
  db.query(
    'SELECT * FROM products.promotions_1; SELECT * FROM products.promotions_2',
    [1, 2],
    function (err, result) {
      if (err) throw err;
      res.render('index', {
        url: undefined,
        category: undefined,
        title: ' | Home',
        products_0: result[0],
        products_1: result[1],
        userId: '',
        username: '',
      });
    }
  );
};

const getAllProducts = (req, res) => {
  console.log('searchAll');
  let args = [];

  let query;
  let query1 = `SELECT description,price1,product_photo,product_name,product_id,colour_filter,category FROM products.bags WHERE product_name LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,price1,product_photo,product_name,product_id,colour_filter,category FROM products.writing  WHERE product_name LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,price1,product_photo,product_name,product_id,colour_filter,category FROM products.writing  WHERE product_name LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,price1,product_photo,product_name,product_id,colour_filter,category FROM products.promotions  WHERE product_name LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,price1,product_photo,product_name,product_id,colour_filter,category FROM products.promotions_1  WHERE product_name LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,price1,product_photo,product_name,product_id,colour_filter,category FROM products.promotions_2  WHERE product_name LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,price1,product_photo,product_name,product_id,colour_filter,category FROM products.clothing  WHERE product_name LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,price1,product_photo,product_name,product_id,colour_filter,category FROM products.drinkware  WHERE product_name LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,price1,product_photo,product_name,product_id,colour_filter,category FROM products.safety  WHERE product_name LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%'
  `;
  if (req.query.color && req.query.color !== 'any') {
    query = `SELECT product_name,product_id,category,colour_filter,product_photo FROM products.bags WHERE (product_name LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%' ) AND FIND_IN_SET(?,colour_filter) > 0
  union SELECT product_name,product_id,category,colour_filter,product_photo FROM products.writing  WHERE (product_name LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%' ) AND FIND_IN_SET(?,colour_filter) > 0
  union SELECT product_name,product_id,category,colour_filter,product_photo FROM products.writing  WHERE (product_name LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%' ) AND FIND_IN_SET(?,colour_filter) > 0
  union SELECT product_name,product_id,category,colour_filter,product_photo FROM products.promotions  WHERE (product_name LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%' ) AND FIND_IN_SET(?,colour_filter) > 0
  union SELECT product_name,product_id,category,colour_filter,product_photo FROM products.promotions_1  WHERE (product_name LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%' ) AND FIND_IN_SET(?,colour_filter) > 0
  union SELECT product_name,product_id,category,colour_filter,product_photo FROM products.promotions_2  WHERE (product_name LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%' ) AND FIND_IN_SET(?,colour_filter) > 0
  union SELECT product_name,product_id,category,colour_filter,product_photo FROM products.clothing  WHERE (product_name LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%' ) AND FIND_IN_SET(?,colour_filter) > 0
  union SELECT product_name,product_id,category,colour_filter,product_photo FROM products.drinkware  WHERE (product_name LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%' ) AND FIND_IN_SET(?,colour_filter) > 0 
  union SELECT product_name,product_id,category,colour_filter,product_photo FROM products.safety  WHERE (product_name LIKE '%${req.query.search}%' OR sub_cat_0 LIKE '%${req.query.search}%' OR sub_cat_1 LIKE '%${req.query.search}%' OR category LIKE '%${req.query.search}%' ) AND FIND_IN_SET(?,colour_filter) > 0 
  `;
    args = [
      ...args,
      req.query.color,
      req.query.color,
      req.query.color,
      req.query.color,
      req.query.color,
      req.query.color,
      req.query.color,
      req.query.color,
    ];
  } else {
    query = query1;
  }

  console.log('query1', query1);

  db.query(query1, args, function (err, total_products5) {
    db.query(query, args, function (err, total_products) {
      if (err) {
        console.log('err', err);
      }

      console.log('query1', query1);
      console.log('total_products.length', total_products.length);
      console.log('total_products5.length', total_products5.length);
      let colour_filter = Array.from(total_products5);

      // console.log('colour_filter1', colour_filter);

      colour_filter = colour_filter.map((el) => el.colour_filter);

      console.log('colour_filter2', colour_filter);

      let colors = [];
      colour_filter.forEach((el) => {
        let el_colors = el.split(',');

        el_colors.forEach((color) =>
          colors.push(color?.toLowerCase().trim() || color.trim())
        );
      });

      colour_filter = [...new Set(colors)];

      console.log('colors_available2', colour_filter);

      if (req.query.page) {
        query = `${query} order by  product_id LIMIT ?,? `;
        args = [...args, (req.query.page - 1) * 8, 8];
      } else {
        query = `${query} order by  product_id LIMIT 0,8 `;
      }

      db.query(query, args, function (err2, result2) {
        if (err2) {
          console.log('err2', err2);
          console.log('query', query);
          console.log('args', args);
        }
        res.render('all_products', {
          products: result2,
          title: 'Search Products',
          url: req.originalUrl.split('?')[0],
          colour_filter,
          length: total_products.length,
          category: '',
          userId: '',
          username: '',
        });
      });
    });
  });
};
const searchAll = (req, res) => {
  searchAllProducts(req, res);
};

const suggestion_product_category = (req, res) => {
  searchAllProducts(req, res);
};

const suggestion_product_subCategory = (req, res) => {
  searchAllProducts(req, res);
  return;
};

const suggestion_product_sub_subCategory = (req, res) => {
  searchAllProducts(req, res);
};

const searchAllProducts = (req, res) => {
  let query = `SELECT description,category,price1,product_photo,product_name,product_id,colour_filter FROM products.bags WHERE product_name LIKE '%${req.body.search}%' OR sub_cat_1 LIKE '%${req.body.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,category,price1,product_photo,product_name,product_id,colour_filter FROM products.writing  WHERE product_name LIKE '%${req.body.search}%' OR sub_cat_1 LIKE '%${req.body.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,category,price1,product_photo,product_name,product_id,colour_filter FROM products.writing  WHERE product_name LIKE '%${req.body.search}%' OR sub_cat_1 LIKE '%${req.body.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,category,price1,product_photo,product_name,product_id,colour_filter FROM products.promotions  WHERE product_name LIKE '%${req.body.search}%' OR sub_cat_1 LIKE '%${req.body.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,category,price1,product_photo,product_name,product_id,colour_filter FROM products.promotions_1  WHERE product_name LIKE '%${req.body.search}%' OR sub_cat_1 LIKE '%${req.body.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,category,price1,product_photo,product_name,product_id,colour_filter FROM products.promotions_2  WHERE product_name LIKE '%${req.body.search}%' OR sub_cat_1 LIKE '%${req.body.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,category,price1,product_photo,product_name,product_id,colour_filter FROM products.clothing  WHERE product_name LIKE '%${req.body.search}%' OR sub_cat_1 LIKE '%${req.body.search}%' OR category LIKE '%${req.query.search}%'
  union SELECT description,category,price1,product_photo,product_name,product_id,colour_filter FROM products.drinkware  WHERE product_name LIKE '%${req.body.search}%' OR sub_cat_1 LIKE '%${req.body.search}%' OR category LIKE '%${req.query.search}%' 
  union SELECT description,category,price1,product_photo,product_name,product_id,colour_filter FROM products.safety  WHERE product_name LIKE '%${req.body.search}%' OR sub_cat_1 LIKE '%${req.body.search}%' OR category LIKE '%${req.query.search}%' 
  `;

  db.query(query, function (err, total_products) {
    res.json({
      products: total_products,
    });
  });
};
const terms =
  ('/about',
  (req, res) => {
    res.render('about', { title: ' | About Us' });
  });
const about =
  ('/terms',
  (req, res) => {
    res.render('terms', { title: ' | Terms & Conditions' });
  });
const returns =
  ('/returns',
  (req, res) => {
    res.render('returns', { title: ' | Returns Policy' });
  });
const privacy =
  ('/privacy',
  (req, res) => {
    res.render('privacy', { title: ' | Privacy & Cookies' });
  });

module.exports = {
  product_category,
  product_subCategory,
  product_sub_subCategory,
  product_details,
  promo_details,
  index,
  suggestion_product_category,
  suggestion_product_subCategory,
  suggestion_product_sub_subCategory,
  searchAll,
  getAllProducts,
  terms,
  about,
  returns,
  privacy,
};

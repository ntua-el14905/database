
const { pool } = require('../utils/database');
exports.getAuthors5Books = (req, res, next) => {
    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];

    let sqlQuery = `select * FROM authors_comparison`;
                
    /* create the connection, execute query, render data */
    pool.getConnection((err, conn) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            return next(err);
          }
        conn.promise().query(sqlQuery)
        .then(([rows, author]) => {
            res.render('authorsbooks.ejs', {
                pageTitle: "Query 3.1.7",
                author: rows,
                messages: messages,
              });
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
   
}

exports.getAuthorsNoBook = (req, res, next) => {
    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];

    let sqlQuery = `select CONCAT(a.first_name, ' ', a.last_name) AS author_name
                    from book b 
                    join author a on a.author_id = b.author_id
                    left outer join borrow br on b.isbn = br.isbn
                    group by b.author_id
                    having count(borrow_id) = 0;`;
                
    /* create the connection, execute query, render data */
    pool.getConnection((err, conn) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            return next(err);
          }
        conn.promise().query(sqlQuery)
        .then(([rows, author]) => {
            res.render('authornoborrow.ejs', {
                pageTitle: "Query 3.1.4",
                author: rows,
                messages: messages,
              });
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
   
}
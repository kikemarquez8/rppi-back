SELECT qr.product, b.description, qr.total
        FROM
        (SELECT c.products as product, SUM(c.quantity_sold * d.price) as total
            FROM users a
                JOIN sales b ON a.users = b.purchaser
                 JOIN sales_products c ON b.sales = c.sales
                 JOIN products d ON c.products = d.products
                 WHERE a.email = ${email}
                 GROUP BY c.products
                )
        AS qr
        JOIN products b ON qr.product = b.products

let PRODUCTS;

$(function() {
    // GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: function(response) {
                let tbodyEl = $('tbody');
                
                tbodyEl.html('');
                PRODUCTS = response.products;
                response.products.forEach(function(product) {
                    
                    
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td><input type="text" class="name" value="' + product.name + '"></td>\
                            <td>\
                                <button class="update-button">UPDATE</button>\
                                <button class="delete-button">DELETE</button>\
                                <button class="raise-button">+</button>\
                                <button class="down-button">-</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        let createInput = $('#create-input');

        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
                
            }
            
        });
        //NAME = createInput.val();
    });

    //PLUS

    $('table').on('click', '.raise-button', function() {
        
        let rowEl = $(this).closest('tr');
        let id = rowEl.find('.id').text();
        

        $.ajax({
            url: '/products/quantity/' + id,
            method: 'POST',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    //MINUS

    $('table').on('click', '.down-button', function() {
        
        let rowEl = $(this).closest('tr');
        let id = rowEl.find('.id').text();
        

        $.ajax({
            url: '/products/down/' + id,
            method: 'POST',
            contentType: 'application/json',
            
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        let rowEl = $(this).closest('tr');
        let id = rowEl.find('.id').text();
        let newName = rowEl.find('.name').val();
        
        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
    
    
    // DELETE
    
   
    $('table').on('click', '.delete-button', function() {
        let rowEl = $(this).closest('tr');
        let id = rowEl.find('.id').text();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});



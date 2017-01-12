
// Document ready (on load)
  function documentReady() {
    fixPngs();
  	tableColors();
  	textClasses();
  	dropdowns();
  }

  // Dropdowns
  function dropdowns() {
    $(".dropdown").each(function() {
      var id = $(this).attr("id");
  		var part = id.split("_");
  		part = part[1];
  		
  		var id_menu = "menu_" + part;
  		
  		var offset = $(this).offset();
  		
  		$("#" + id_menu).css({"left": (offset.left - 20) + "px", "top": (offset.top + 12) + "px"});
  		
  		$(this).click(function() {
  		  return false;
  	  });
  		
  		$(this).mouseover(function() {
  			$("#" + id_menu).css("display", "block");
  		});
  		
  		$("#" + id_menu).mouseover(function() {
  			$("#" + id_menu).css("display", "block");
  		});
  		
  		$(this).mouseout(function() {
  			$("#" + id_menu).css("display", "none");
  		});
  		
  		$("#" + id_menu).mouseout(function() {
  			$("#" + id_menu).css("display", "none");
  		});
    });
  }

  // Is Numeric support
  function isNumeric(input) {
      return (input - 0) == input && input.length > 0;
  }

  // Shows loading box
  function showLoading() {
  	$('#loading').centerInClient();
  	$('#loading').css("display", "block");
  }

  // Hides loading box
  function hideLoading() {
  	$("#loading").fadeOut("fast");
  }

  // Shows or hides aa div
  function toggle(id) {
    if($("#" + id).css("display") == "none") {
      $("#" + id).css("display", "block");
    } else {
      $("#" + id).css("display", "none");
    }
  }

  // Arregla PNGs para IE6
  function fixPngs() {
  	$('body').supersleight();
  }

  // Alterna colores de rows de una tabla
  function tableColors() {
  	$("tr:even").css("background-color", "#dddddd");
  	$("tr:odd").css("background-color", "#ffffff");
  	$("table.portada tr").css("background-color", "#ffffff");
  	
  	$("tr:even").mouseover(function() {
  		$(this).css("background-color", "yellow");
  	});
  	
  	$("tr:even").mouseout(function() {
  		$(this).css("background-color", "#dddddd");
  	});
  	
  	$("tr:odd").mouseover(function() {
  		$(this).css("background-color", "yellow");
  	});
  	
  	$("tr:odd").mouseout(function() {
  		$(this).css("background-color", "#ffffff");
  	});
  }

  // Agrega clase de text a todos los textfields
  function textClasses() {
    $('input[type=submit]').addClass('button');
    $('input[type=button]').addClass('button');
    
  	$('input[type=text]').addClass('text');
  	$('input[type=password]').addClass('text');
    
    $('.small input[type=text]').addClass('small');
    $('.small select').addClass('small');
    $('.small input[type=submit]').addClass('small');
    $('.small input[type=button]').addClass('small');
  }

  // Shows the remote window
  function showRemote() {
    $("#remote").centerInClient();
    $("#remote").css("display", "block");
    documentReady();
  }

  // Hides the remote window
  function hideRemote() {
    $("#remote").css("display", "none");
  }

  // Displays html in remote window
  function displayRemote(html) {
    html = '<div class="fright"><a href="#" onclick="hideRemote(); return false;">X</a></div>' + html + '<div class="break"><!-- i --></div>';
    $("#remote").html(html);
  }

  // Add an item to a product kit
  function addItemToKit() {
    var item = $("#ac_item").val();
    
    if(item != "") {
      var company_id = $("#products_kit_company_id").val();
      var item_id = $("#ac_item_id").val();
      var quantity = $("#ac_item_quantity").val();
      var items_arr = $("#items").val().split(",");

      if(quantity == "" || !isNumeric(quantity)) {
        alert("Please enter a valid quantity");
      } else {
        if($.inArray(item_id, items_arr) == -1) {
          $("#items").val($("#items").val() + "," + item_id);
          $("#items_quantities").val($("#items_quantities").val() + "," + quantity);
          listItemsKit();
          
          $("#ac_item_id").val("");
          $("#ac_item").val("");
          $("#ac_item_quantity").val("1");
        } else {
          alert("The item already exists in the product kit.");
        }
      }
    } else {
      alert("Please find a product to add first.");
    }
  }

  // List items in a kit
  function listItemsKit() {
    var items = $("#items").val();
    var items_quantities = $("#items_quantities").val();
    var company_id = $("#products_kit_company_id").val();
    
    $.get('/products_kits/list_items/' + company_id, {
      items: items,
      items_quantities: items_quantities
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }

  // Removes an item from a kit
  function removeItemFromKit(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(items_arr[i] != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsKit();
  }

  // Update price total for invoice
  function updateItemTotal() {
    var quantity = $("#ac_item_quantity").val();
    var price = $("#ac_item_price").val();
    var discount = $("#ac_item_discount").val();
    
    if(isNumeric(quantity) && isNumeric(price) && isNumeric(discount)) {
      var total = quantity * price;
      total -= total * (discount / 100);

      $("#ac_item_total").html(total);
    } else {
      $("#ac_item_total").html("0.00");
    }
  }


  // Add an item to a product kit
  function addItemToInvoice() {
    var item = $("#ac_item").val();
    
    if(item != "") {
      var company_id = $("#invoice_company_id").val();
      var item_id = $("#ac_item_id").val();
      
      var quantity = $("#ac_item_quantity").val();
      var price = $("#ac_item_price").val();
      var discount = $("#ac_item_discount").val();    
      var items_arr = $("#items").val().split(",");

      if(quantity == "" || !isNumeric(quantity)) {
        alert("Please enter a valid quantity");
      } else if(price == "" || !isNumeric(price)) {
        alert("Please enter a valid price");
      } else if(discount == "" || !isNumeric(discount)) {
        alert("Please enter a valid discount");
      } else {
        var item_line = item_id + "|BRK|" + quantity + "|BRK|" + price + "|BRK|" + discount;
        
        $("#items").val($("#items").val() + "," + item_line);
        
        listItemsInvoice();
        
        $("#ac_item_id").val("");
        $("#ac_item").val("");
        $("#ac_item_quantity").val("1");
        $("#ac_item_price").val("");
        $("#ac_item_discount").val("0");
        updateItemTotal();
      }
    } else {
      alert("Please find a product to add first.");
    }
  }

  // List items in a kit
  function listItemsInvoice() {
    var items = $("#items").val();
    var company_id = $("#invoice_company_id").val();
    
    $.get('/invoices/list_items/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }

  // Update price total for invoice
  function updateItemTotal2() {
    var quantity = $("#ac_item_quantity").val();
    var price = $("#ac_item_price").val();
    var discount = $("#ac_item_discount").val();
    
    if(isNumeric(quantity) && isNumeric(price) && isNumeric(discount)) {
      var total = quantity * price;
      total -= total * (discount / 100);

      $("#ac_item_total").html(total);
    } else {
      $("#ac_item_total").html("0.00");
    }
  }

  // Add an item to a product kit
  function addItemToInvoice2() {
    var item = $("#ac_item").val();
    
    if(item != "") {
      var company_id = $("#factura_company_id").val();
      var item_id = $("#ac_item_id").val();
      
      var quantity = $("#ac_item_quantity").val();
      var price = $("#ac_item_price").val();
      var discount = $("#ac_item_discount").val();
      
      var items_arr = $("#items").val().split(",");

      if(quantity == "" || !isNumeric(quantity)) {
        alert("Please enter a valid quantity");
      } else if(price == "" || !isNumeric(price)) {
        alert("Please enter a valid price");
      } else if(discount == "" || !isNumeric(discount)) {
        alert("Please enter a valid discount");
      } else {
        var item_line = item_id + "|BRK|" + quantity + "|BRK|" + price + "|BRK|" + discount;
        
        $("#items").val($("#items").val() + "," + item_line);
        listItemsInvoice2();
        
        $("#ac_item_id").val("");
        $("#ac_item").val("");
        $("#ac_item_quantity").val("1");
        $("#ac_item_price").val("");
        $("#ac_item_discount").val("0");
        updateItemTotal2();
      }
    } else {
      alert("Please find a product to add first.");
    }
  }

  // List items in a kit
  function listItemsInvoice2() {
    var items = $("#items").val();
    var company_id = $("#factura_company_id").val();
    
    $.get('/facturas/list_items/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }


  // Update price total for invoice
  function updateItemdelivery() {
    var quantity = $("#ac_item_quantity").val();
    var price = $("#ac_item_price").val();
    var discount = $("#ac_item_discount").val();
    
    if(isNumeric(quantity) && isNumeric(price) && isNumeric(discount)) {
      var total = quantity * price;
      total -= total * (discount / 100);

      $("#ac_item_total").html(total);
    } else {
      $("#ac_item_total").html("$0.00");
    }
  }

  // Add an item to a product kit
  function addItemTodelivery() {
    var item = $("#ac_item_id").val();

   if(item != "") {
      var company_id = $("#delivery_company_id").val();
      var item_id = $("#ac_item_id").val();
          
      var quantity = $("#ac_item_quantity").val();
      var price    = $("#ac_item_price").val();    
      var discount = $("#ac_item_discount").val();
      var unidad   = $("#ac_item_unidad").val();
      var peso     = $("#ac_item_peso").val();

      var items_arr = $("#items").val().split(",");

      if(quantity == "" || !isNumeric(quantity)) {
        alert("Please enter a valid quantity");
      } else if(price == "" || !isNumeric(price)) {
        alert("Please enter a valid price");
      } else if(discount == "" || !isNumeric(discount)) {
        alert("Please enter a valid discount");
      } else if(peso == "" || !isNumeric(peso)) {
        alert("Please enter a valid discount");
      } else {


    var item_line = item_id + "|BRK|" + quantity + "|BRK|" + unidad+"|BRK|" + peso+"|BRK|" + price + "|BRK|" + discount;
        
        $("#items").val($("#items").val() + "," + item_line);

        listItemsdelivery();
        

        $("#ac_item_id").val("");
        $("#ac_item").val("");
        $("#ac_item_quantity").val("1");
        $("#ac_item_price").val("");
        $("#ac_item_discount").val("0");
        $("#ac_item2").val("");
        $("#ac_item_peso").val("0");
        updateItemdelivery();
        
      }
    } else {
      alert("Por favor primero ingrese un servicio .");
    }
  }

  // List items in a kit
  function listItemsdelivery() {
    var items = $("#items").val();
    var company_id = $("#delivery_company_id").val();
    
    $.get('/deliveries/list_items/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }

  // Add an item to a product kit
  function addItemTodelivery2() {
    var item = $("#ac_item3").val();
    
   if(item != "") {
      var company_id = $("#factura_company_id").val();
      var item_id = $("#ac_item_guia").val();        
      var items_arr = $("#items2").val().split(",");
      var item_line = item_id + "|BRK|" ;
        
        $("#items2").val($("#items2").val() + "," + item_line );

        listItemsdelivery2();
        
        $("#ac_item_guia").val("");
        $("#ac_item3").val("");      
      
    } else {
      alert("Please find a guia  to add first.");
    }
  }


  function listItemsdelivery2() {
    var items2 = $("#items2").val();
    var company_id = $("#factura_company_id").val();
    
    $.get('/facturas/list_items2/' + company_id, {
      items2: items2
    },
    function(data) {
      $("#list_items2").html(data);
      documentReady();
    });
  }



  // Add an item to orden de servicio 
  function addItemToOrden1() {
    var item = $("#ac_item3").val();
    
   if(item != "") {
      var company_id = $("#purchase_company_id").val();
      var item_id = $("#ac_item_os").val();        
      var items_arr = $("#items2").val().split(",");
      var item_line = item_id + "|BRK|" ;
        
        $("#items2").val($("#items2").val() + "," + item_line );

        listItemsOrden1();
        
        $("#ac_item_os").val("");
        $("#ac_item3").val("");      
      
    } else {
      alert("Por favor añadir Orden ");
    }
  }

  function listItemsOrden1() {
    var items2 = $("#items2").val();
    var company_id = $("#factura_company_id").val();
    
    $.get('/facturas/list_items2/' + company_id, {
      items2: items2
    },
    function(data) {
      $("#list_items2").html(data);
      documentReady();
    });
  }
  // Removes an item from an invoice
  function removeItemFromOrden1(id) {
    var items = $("#items2").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items2").val(items_final.join(","));
    listItemsOrden1();
  }

  // Removes an item from a kit
  function removeItemFromKit(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(items_arr[i] != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsKit();
  }

  // Removes an item from an invoice
  function removeItemFromInvoice(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsInvoice();
  }
  // Removes an item from an invoice
  function removeItemFromInvoice2(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsInvoice2();
  }
  // Removes an item from an invoice
  function removeItemFromdelivery(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsdelivery();
  }
  // Removes an item from an invoice
  function removeItemFromdelivery2(id) {
    var items = $("#items2").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items2").val(items_final.join(","));
    listItemsdelivery2();
  }

  // Removes an item from an invoice
  function removeItemFromPurchaseorder(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemspurchaseorder();
  }
  // Removes an item from an purchase
  function removeItemFromPurchase(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsPurchase();
  }

  // Shortcut to create new customer form
  function createCustomerInvoice() {
    var company_id = $("#invoice_company_id").val();
    
    $.get('/customers/new/' + company_id + '?ajax=1', {
    },
    function(data) {
      displayRemote(data);
      showRemote();
      
      $("#new_customer").bind("submit", function() {
        event.preventDefault();
        doCreateCustomerInvoice();
      });
    });
  }

  // Create new customer in the invoice via ajax
  function doCreateCustomerInvoice() {
    var company_id = $("#invoice_company_id").val();
    var name = $("#customer_name").val();
    var email = $("#customer_email").val();
    var account = $("#customer_account").val();
    var phone1 = $("#customer_phone1").val();
    var phone2 = $("#customer_phone2").val();
    var address1 = $("#customer_address1").val();
    var address2 = $("#customer_address2").val();
    var city = $("#customer_city").val();
    var state = $("#customer_state").val();
    var zip = $("#customer_zip").val();
    var country = $("#customer_country").val();
    var comments = $("#customer_comments").val();
    
    if($("#customer_taxable").attr("checked")) {
      var taxable = 1;
    } else {
      var taxable = 0;
    }
    
    if(name != "") {
      $.post('/customers/create_ajax/' + company_id, {
        name: name,
        email: email,
        account: account,
        phone1: phone1,
        phone2: phone2,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
        country: country,
        comments: comments,
        taxable: taxable
      },
      function(data) {
        if(data == "error_empty") {
          alert("Please enter a customer name");
        } else if(data == "error") {
          alert("Something went wrong when saving the customer, please try again");
        } else {
          var data_arr = data.split("|BRK|");
          
          $("#ac_customer").val(data_arr[1]);
          $("#ac_customer_id").val(data_arr[0]);
          $("#selected_customer").html(data_arr[1]);
          
          hideRemote();
          alert("The customer has been created");
        }
      });
    } else {
      alert("Please enter a customer name.");
    }
  }

  // Add product kit to invoice
  function addKitToInvoice() {
    var kit = $("#ac_kit").val();
    
    if(kit != "") {
      var company_id = $("#invoice_company_id").val();
      var kit_id = $("#ac_kit_id").val();
      var discount = $("#ac_kit_discount").val();
      
      var items_arr = $("#items").val().split(",");
      
      if(discount == "" || !isNumeric(discount)) {
        alert("Please enter a valid discount");
      } else {
        $.post('/invoice/add_kit/' + company_id, {
            kit_id: kit_id,
            items: $("#items").val(),
            discount: discount
          },
          function(data) {
            if(data == "no_kit") {
              alert("We couldn't find the product kit you were looking for.");
            } else {
              $("#items").val($("#items").val() + "," + data);
              listItemsInvoice();
            }

            $("#ac_kit_id").val("");
            $("#ac_kit").val("");
          }
        );
      }
    } else {
      alert("Please find a product to add first.");
    }
  }



  // Add an item to a product kit
  function addItemToserviceorder() {
    var item = $("#ac_item").val();
    
    if(item != "") {
      var company_id = $("#serviceorder_company_id").val();
      var item_id = $("#ac_item_id").val();
      
      var quantity = $("#ac_item_quantity").val();
      var price = $("#ac_item_price").val();
      var discount = $("#ac_item_discount").val();    
      var items_arr = $("#items").val().split(",");

      if(quantity == "" || !isNumeric(quantity)) {
        alert("Por favor ingrese una cantidad validad");
      } else if(price == "" || !isNumeric(price)) {
        alert("Por favor ingrese un precio valido");
      } else if(discount == "" || !isNumeric(discount)) {
        alert("Por favor ingrese un descuento valido");
      } else {
        var item_line = item_id + "|BRK|" + quantity + "|BRK|" + price + "|BRK|" + discount;
        
        $("#items").val($("#items").val() + "," + item_line);
        listItemsserviceorder();
        
        $("#ac_item_id").val("");
        $("#ac_item").val("");
        $("#ac_item_quantity").val("1");
        $("#ac_item_price").val("");
        $("#ac_item_discount").val("0");
        updateItemTotal4();
      }
    } else {
      alert("Por favor ingrese un servicio primero.");    
    }
  }

  // List items in a kit
  function listItemsserviceorder() {
    var items = $("#items").val();
    var company_id = $("#serviceorder_company_id").val();
    
    $.get('/serviceorders/list_items/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }


  // Update price total for invoice
  function updateItemTotal4() {
    var quantity = $("#ac_item_quantity").val();
    var price = $("#ac_item_price").val();
    var discount = $("#ac_item_discount").val();
    
    if(isNumeric(quantity) && isNumeric(price) && isNumeric(discount)) {
      var total = quantity * price;
      total -= total * (discount / 100);

      $("#ac_item_total").html(total);
    } else {
      $("#ac_item_total").html("0.00");
    }
  }

  // Removes an item from an invoice
  function removeItemFromserviceorder(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsserviceorder();
  }



  // Add an item to a purchase order
          
  function addItemTopurchaseorder() {
    var item = $("#ac_item").val();
    
    if(item != "") {
      var company_id = $("#purchaseorder_company_id").val();
      var item_id = $("#ac_item_id").val();
      
      var quantity = $("#ac_item_quantity").val();
      var price = $("#ac_item_price").val();
      var discount = $("#ac_item_discount").val();    
      var items_arr = $("#items").val().split(",");
        
      if(quantity == "" || !isNumeric(quantity)) {
        alert("Por favor ingrese una cantidad validad");
      } else if(price == "" || !isNumeric(price)) {
        alert("Por favor ingrese un precio valido");
      } else if(discount == "" || !isNumeric(discount)) {
        alert("Por favor ingrese un descuento valido");
      } else {
        var item_line = item_id + "|BRK|" + quantity + "|BRK|" + price + "|BRK|" + discount;
        
        $("#items").val($("#items").val() + "," + item_line);
        listItemspurchaseorder();
        
        $("#ac_item_id").val("");
        $("#ac_item").val("");
        $("#ac_item_quantity").val("1");
        $("#ac_item_price").val("");
        $("#ac_item_discount").val("0");
        updateItemTotal5();
      }
    } else {
      alert("Por favor ingrese un servicio primero.");
    }
  }

  function addItemToPurchase() {
    var item = $("#ac_item").val();
    
    if(item != "") {
      var company_id = $("#purchase_company_id").val();
      var item_id = $("#ac_item_id").val();
      
      var quantity = $("#ac_item_quantity").val();
      var price = $("#ac_item_price").val();
      var discount = $("#ac_item_discount").val();    
      var items_arr = $("#items").val().split(",");
        
      if(quantity == "" || !isNumeric(quantity)) {
        alert("Por favor ingrese una cantidad validad");
      } else if(price == "" || !isNumeric(price)) {
        alert("Por favor ingrese un precio valido");
      } else if(discount == "" || !isNumeric(discount)) {
        alert("Por favor ingrese un descuento valido");
      } else {
        var item_line = item_id + "|BRK|" + quantity + "|BRK|" + price + "|BRK|" + discount;
        
        $("#items").val($("#items").val() + "," + item_line);
        listItemsPurchase();
        
        $("#ac_item_id").val("");
        $("#ac_item").val("");
        $("#ac_item_quantity").val("1");
        $("#ac_item_price").val("");
        $("#ac_item_discount").val("0");
        updateItemTotal5();
      }
    } else {
      alert("Por favor ingrese un servicio primero.");
    }
  }

  // List items in a kit
  function listItemsPurchase() {
    var items = $("#items").val();
    var company_id = $("#purchase_company_id").val();
    
    $.get('/purchases/list_items/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }


  // List items in a kit
  function listItemspurchaseorder() {
    var items = $("#items").val();
    var company_id = $("#purchaseorder_company_id").val();
    
    $.get('/purchaseorders/list_items/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }


  // Update price total for invoice
  function updateItemTotal5() {
    var quantity = $("#ac_item_quantity").val();
    var price = $("#ac_item_price").val();
    var discount = $("#ac_item_discount").val();
    
    if(isNumeric(quantity) && isNumeric(price) && isNumeric(discount)) {
      var total = quantity * price;
      total -= total * (discount / 100);

      $("#ac_item_total").html( total);
    } else {
      $("#ac_item_total").html("0.00");
    }
  }


  // Add an item to a product kit
  function addItemToMovement() {
    var item = $("#ac_item").val();
    
    if(item != "") {
      var company_id = $("#movement_company_id").val();
      var item_id = $("#ac_item_id").val();
      
      var quantity = $("#ac_item_quantity").val();
      var items_arr = $("#items").val().split(",");

      if(quantity == "" || !isNumeric(quantity)) {
        alert("Por favor una cantidad ");
      } else {
        var item_line = item_id + "|BRK|" + quantity + "|BRK|";
        
        $("#items").val($("#items").val() + "," + item_line);
        listItemsMovement();
        
        $("#ac_item_id").val("");
        $("#ac_item").val("");
        $("#ac_item_quantity").val("1");
        
        updateItemTotalMov();
      }
    } else {
      alert("Please find a product to add first.");
    }
  }

  // List items in a kit
  function listItemsMovement() {
    var items = $("#items").val();
    var company_id = $("#movement_company_id").val();
    
    $.get('/movements/list_items/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }

  // Update price total for invoice
  function updateItemTotalMov() {
    var quantity = $("#ac_item_quantity").val();
    var price = $("#ac_item_price").val();
    var discount = $("#ac_item_discount").val();
    
    if(isNumeric(quantity) && isNumeric(price) && isNumeric(discount)) {
      var total = quantity * price;
      total -= total * (discount / 100);

      $("#ac_item_total").html("$" + total);
    } else {
      $("#ac_item_total").html("$0.00");
    }
  }
  // Removes an item from an invoice
  function removeItemFromMovement(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    
    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsMovement();
  }

  // Add an item to a 
  function addItemToSupplierPayment() {
    var item = $("#ac_item").val();
    
    if(item != "") {
      var company_id = $("#supplier_payment_company_id").val();

      var importe_cheque = $("#supplier_payment_total").val();
      var item_total = 0
      var item_id = $("#ac_item_id").val();      
      var price = $("#ac_item_total").val();   

      var items_arr = $("#items").val().split(",");

      if (price == "" || !isNumeric(price)) {
        alert("Por favor ingrese un precio valido  ");
      } 
      else if (importe_cheque == "" || !isNumeric(importe_cheque)) {
        alert("Por favor ingrese importe valido  ");
      }
      else {
        var item_line = item_id + "|BRK|" + price + "|BRK|";
        
        $("#items").val($("#items").val() + "," + item_line);
        
        listItemsSupplierPayment();
        
        $("#ac_item_id").val("");
        $("#ac_item").val("");
        $("#ac_item_total").val("");
    
        updateItemTotal6();
      }
    } else {
      alert("Por favor ingrese un documento.");
    }
  }


  // Update price total for invoice
  function updateItemTotal6() {
    
    var price = $("#ac_item_total").val();

    if( isNumeric(price)) {
      var total =  price *1;
      
      $("#ac_item_total").html(total);
      
    } else {
      
      $("#ac_item_total").html("0.00");
    }

  }


  // List items in a kit
  function listItemsSupplierPayment() {
    var items = $("#items").val();
    var company_id = $("#supplier_payment_company_id").val();
    
    $.get('/supplier_payments/list_items/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }


  function removeItemFromSupplierPayment(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    

    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsSupplierPayment();
  }

// agregar item guias  
  function addItemToGuias() {

    alert("Buscando... ");
    var item = $("#ac_item").val();
    var company_id = $("#delivery_company_id").val();

    if(item != "") {
      var company_id = $("#delivery_company_id").val();
      var item_guia = $("#ac_item_guia").val();      
      var items_arr = $("#items").val().split(",");

      if (item_guia == "" ) {
        alert("Por favor ingrese una documento valido  ");
      }     
      else {
        var item_line = item_guia + "|BRK|";        
        $("#items").val($("#items").val() + "," + item_line);        
        listItemsGuias();        
        $("#ac_item_guia").val("");
        $("#ac_item").val("");          
      }
    } else {
      alert("Por favor ingrese un documento.");
    }
  }

  // List items in a kit
  function listItemsGuias() {
    var items = $("#items").val();
    
    $.get('/deliveries/list_items2/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items2").html(data);
      documentReady();
    });
  }


  function removeItemFromGuias(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
    

    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsGuias();
  }

  //............................................................................
  // agrega items customer payments
  //............................................................................

  function addItemToCustomerPayment() {
    var item = $("#ac_item").val();
    
    if(item != "") {
      var company_id = $("#customer_payment_company_id").val();

      var importe_cheque = $("#customer_payment_total").val();
      var item_total = 0
      var item_id = $("#ac_item_id").val();      
      var factory = $("#ac_item_factory").val();      
      var price = $("#ac_item_total").val();   

      var items_arr = $("#items").val().split(",");

      if(factory == "" || !isNumeric(factory)) {
        alert("Por favor ingrese una cantidad validad");
      }     
      else if  (price == "" || !isNumeric(price)) {
        alert("Por favor ingrese un precio valido  ");
      } 
      else {
        var item_line = item_id + "|BRK|" + factory + "|BRK|"+ price + "|BRK|";
        
        $("#items").val($("#items").val() + "," + item_line);
        
        listItemsCustomerPayment();
        
        $("#ac_item_id").val("");
        $("#ac_item").val("");
        $("#ac_item_total").val("");
        $("#ac_item_factory").val("");

        updateItemTotalCP();
      }
    } else {
      alert("Por favor ingrese un documento.");
    }
  }


  // Update price total for invoice
  function updateItemTotalCP() {
    
    var price = $("#ac_item_total").val();

    if( isNumeric(price)) {
      var total =  price *1;
      
      $("#ac_item_total").html(total);
      
    } else {
      
      $("#ac_item_total").html("0.00");
    }

  }


  // List items in a kit
  function listItemsCustomerPayment() {
    var items = $("#items").val();
    var company_id = $("#customer_payment_company_id").val();
    
    $.get('/customer_payments/list_items/' + company_id, {
      items: items
    },
    function(data) {
      $("#list_items").html(data);
      documentReady();
    });
  }


  function removeItemFromCustomerPayment(id) {
    var items = $("#items").val();
    var items_arr = items.split(",");
    var items_final = Array();
    var i = 0;
  
    while(i < items_arr.length) {
      if(i != id) {
        items_final[i] = items_arr[i];
      }
      i++;
    }
    
    $("#items").val(items_final.join(","));
    listItemsCustomerPayment();
  }

 //............................................................................  


  // On ready
  $(document).ready(function() {
    documentReady();
    
    $("#loading")
      .hide()
      .ajaxStart(function() {
        showLoading();
      })
      .ajaxStop(function() {
        hideLoading();
      })
    ;
  });





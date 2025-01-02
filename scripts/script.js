'use strict';

window.onload = function () {

    let loader = $('.loader');

    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove("open");
        }
    });


    $('.validate').validate({

        rules: {
            inputProduct: "required",
            inputName: "required",
            inputTel: {
                required: true,
                digits: true
            }
        },
        messages: {
            inputProduct: "<br> Необходимо ввести, что хотите заказать...",
            inputName: "<br> Необходимо ввести Имя.",
            inputTel: "<br> Необходимо ввести Телефон.",

        },

        submitHandler: function (form, event) {
            event.preventDefault();

            let product = $('#inputProduct');
            let name = $('#inputName');
            let phone = $('#inputTel');
            loader.css('display', 'flex');
            $.ajax({
                method: "post",
                url: " https://testologia.ru/checkout ",
                data: {
                    product: product.val(),
                    name: name.val(),
                    phone: phone.val(),
                }
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        $('#form').html("<div class='order-form message'></div>");
                        $('.message').html(" <h2 class='form-title'>Спасибо за заказ.</h2> <p class='form-text'>Мы свяжемся с вами в ближайшее время!  </p>")
                            .append("<img id='checkmark' src='../images/13.png'>")
                            .hide()
                            .fadeIn(2000, function () {
                            });
                        return false;

                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                        product.val('');
                        name.val('');
                        phone.val('');
                    }
                });
        }
    });

}
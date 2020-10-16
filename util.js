        $('#addressCEP').keyup(function() {
              $(this).val(this.value.replace(/\D/g, ''));
              if(this.value.length >=8) {
                findAddress('#addressCEP');
              }
        });	
        
        $('#addressCEP').blur(function(e) {
            findAddress('#addressCEP');
        })
 
        function findAddress(el) {
            var cep = $(el).val();

            if (cep != "") {
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;
            //Valida o formato do CEP.
            if(validacep.test(cep)) {
                //Preenche os campos com "..." enquanto consulta webservice.
                $('.addressEl').val('...');
                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#addressStreet").val(dados.logradouro);
                        $("#addressZone").val(dados.bairro);
                        $("#addressCity").val(dados.localidade);
                        $("#addressState").val(dados.uf);
                        $("#addressNumber").focus();
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpaFormCep();
                        $('#fileHandlerMessageCEP').html('<p class="error"> CEP Inválido. <i class="far fa-sad-cry"></i></p>').show('fast');
                        setTimeout(function(){ $('#fileHandlerMessageCEP').hide('fast').html('');}, 2000);
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpaFormCep();
                $('#fileHandlerMessageCEP').html('<p class="error"> CEP Inválido. <i class="far fa-sad-cry"></i></p>').show('fast');
                setTimeout(function(){ $('#fileHandlerMessageCEP').hide('fast').html('');}, 2000);
            }
            } //end if.
        }

        function limpaFormCep() {
            $('.addressEl').val('');
        }

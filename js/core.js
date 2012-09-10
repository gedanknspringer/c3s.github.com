/**
 * Created with JetBrains PhpStorm.
 * User: G. Jahn
 * Date: 06.09.12
 * Time: 01:01
 * To change this template use File | Settings | File Templates.
 */

var tsst = new Date();

$(document).ready(function(){

    $.fn.resetModal = function(){
        if(!this.hasClass('modal') || this == undefined)
            return $(this);

        $.each($(this).find('input'),function(){
            $(this).val('');
            $(this).removeAttr('checked');
        });

        window.document.srollTop = 0;
        document.getElementById("modalbody").parentElement.scrollTop = 1;

        return this.removeErr();

    };

    $.fn.removeErr = function(){
        if(!this.hasClass('modal') || this == undefined)
            return $(this);

        $.each($(this).find('.control-group'),function(){
            $(this).removeClass('error warning success');
            $(this).children('.help-block').addClass('hide');
        });

        return $(this);
    };

    $.fn.validateModal = function(){
        var char_regex = /^[\w\-\säüößéè]{1,50}/i;
        var mail_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
        var street_regex = /^[\w\s\-äüößéè]{1,50}\.{0,1}$/i;
        var house_regex = /^\d{1,5}\w{0,1}$/i;
        var zip_regex = /\d{1,6}/;
        var add2_regex = /[\w\-\.\s\däüößéè]{0,50}/;

        var valid = false;
        if(!this.hasClass('modal') || this == undefined)
            return valid;

        var i = 0;
        $.each($('#activity input'),function(){
            if($(this).is(':checked'))
                i++;
        });
        if(i > 0)
            valid = true;
        else {
            valid = false;
            $('#activity').addClass('error');
            $('#activity .help-block').removeClass('hide');
        }

        if($('#creativity input:checked').val() == undefined){
            valid = false;
            $('#creativity').addClass('error');
            $('#creativity .help-block').removeClass('hide');
        } else
            valid = true;

        if($('#memberof input:checked').val() == undefined){
            valid = false;
            $('#memberof').addClass('error');
            $('#memberof .help-block').removeClass('hide');
        } else
            valid = true;

        //only check if something is in the input
        var j = 0;
        $.each($('.contactinfos'),function(){
            var cgroup = this;
            $.each($(cgroup).find('input'),function(){
                if($(this).val() == '' && $(this).attr('id') != 'address2'){
                    j++;
                    $(cgroup).addClass('error');
                }
            });
        });
        j > 0 ? valid = false : valid = true;

        //check contact details
        if(char_regex.test($('#lastname').val()))
            valid = true;
        else {
            valid = false;
            $('#lastname').closest('.contactinfos').addClass('error');
        }
        if(char_regex.test($('#firstname').val()))
            valid = true;
        else {
            valid = false;
            $('#firstname').closest('.contactinfos').addClass('error');
        }
        if(mail_regex.test($('#mail').val()))
            valid = true;
        else {
            valid = false;
            $('#mail').closest('.contactinfos').addClass('error');
        }
        if(street_regex.test($('#street').val()) && house_regex.test($('#hnumber').val()))
            valid = true;
        else {
            valid = false;
            $('#street').closest('.contactinfos').addClass('error');
        }
        if(add2_regex.test($('#address2').val()) || $('#address2').val() == '')
            valid = true;
        else {
            valid = false;
            $('#address2').closest('.contactinfos').addClass('error');
        }
        if(zip_regex.test($('#postcode').val()) && street_regex.test($('#city').val()))
            valid = true;
        else {
            valid = false;
            $('#postcode').closest('.contactinfos').addClass('error');
        }
        if(street_regex.test($('#country').val()))
            valid = true;
        else {
            valid = false;
            $('#country').closest('.contactinfos').addClass('error');
        }

        //check attentions
        if($('#underst_loi').is(':checked'))
            valid = true;
        else {
            valid = false;
            $('#underst_loi').closest('.attentions')
                .addClass('error')
                .children('help-block').removeClass('hide');
        }
        if($('#willb_memb').is(':checked'))
            valid = true;
        else {
            valid = false;
            $('#willb_memb').closest('.attentions')
                .addClass('error')
                .children('help-block').removeClass('hide');
        }
        if($('#noti_dataProt').is(':checked'))
            valid = true;
        else {
            valid = false;
            $('#noti_dataProt').closest('.attentions')
                .addClass('error')
                .children('help-block').removeClass('hide');
        }

        return valid;
    };



    $('#decOfIntent').on('hidden',function(){
        $(this).resetModal();
    });
    $('#openform').click(function(){

        $('#decOfIntent').modal('show');

        $('#decOfIntentsubmit').click(function(){
            var tsen = new Date();

            if($('#decOfIntent').removeErr().validateModal()){

                var acti = new Array();
                $.each($('#activity input'),function(){
                    if($(this).is(':checked'))
                        acti.push(this.id)
                });
                var arr = {
                    activity: acti,
                    creativity: $("input[name='activity']:checked").val(),
                    member: $("input[name='ismember']:checked").val(),
                    lastname: $('#lastname').val(),
                    firstname: $('#firstname').val(),
                    mail: $('#mail').val(),
                    street: $('#street').val(),
                    hnumber: $('#hnumber').val(),
                    add2: $('#address2').val(),
                    postcode: $('#postcode').val(),
                    city: $('#city').val(),
                    country: $('#country').val(),
                    underst_loi: $('#underst_loi').is(':checked'),
                    willb_memb: $('#willb_memb').is(':checked'),
                    noti_dataProt: $('#noti_dataProt').is(':checked')
                };
            }

            if(arr != undefined && tsen.getTime() - tsst.getTime() > 10000){

                //TODO remove, only to demonstrate
                $('#decOfIntent').modal('hide');


                /*$.ajax({
                    type: 'POST',
                    url: '',
                    data: {
                            lofi: JSON.stringify(arr)
                        },
                    dataType: 'json',
                    success: function(re){
                        console.log(re);
                        if(re.status == true){

                            $('#decOfIntent').modal('hide');
                        }
                    }
                });*/

            }


            /*var inputs = $('#decOfIntent').find('input');
            $.each(inputs,function(){
                arr[this.id] = $(this).val();
            });*/

        });

    });

});

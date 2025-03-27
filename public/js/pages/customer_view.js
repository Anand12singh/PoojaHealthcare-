
$(function(){
    let customer_id = $('#customer_id').val();
    calltabinfo(customer_id,'overview',$('.nav-link[data-value="overview"]'))
})

$('.nav-stretch').on('click', '.nav-link', function () {
    let $this = $(this);
    let tab = $this.attr('data-value');
    let customer_id = $('#customer_id').val();
    let loadapistatus = $this.attr('data-src');

    if (loadapistatus === '0') {  // Only call the API if data-src is '0'
        calltabinfo(customer_id, tab, $this);
    }
});

function calltabinfo(customer_id,tab,$element){
    var actionUrl = baseUrl + '/api/customer_view/' + customer_id + '/tabwise/' + tab;
    var method = "POST";
    $.ajax({
        url: actionUrl,
        method: method,
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            toastr.remove();
            if (response.status) {
                if(response.tab_name == 'overview'){
                    $('#full_name').text(response.customer.full_name)
                    $('#email').text(response.customer.email)
                    $('#phone_no').text(response.customer.phone_no)
                    $('#status').append(response.customer.status)
                    $('#country').append(response.customer.country)

                }else if(response.tab_name == 'setting'){
                    $('#fname').val(response.customer.first_name)
                    $('#lname').val(response.customer.last_name)
                    $('#emailId').val(response.customer.email)
                    $('#mobile_no').val(response.customer.phone_no)
                    $('#country_name').append(response.customer.country)
                } else if(response.tab_name == 'logs'){

                    const options = {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false
                      };

                    $.each(response.customer,function(key,val){

                          const LogintTimelocalDate = (val.login_time) ? new Intl.DateTimeFormat("en-GB", options).format(new Date(val.login_time)) : '';
                          const LogoutTimelocalDate = (val.logout_time) ? new Intl.DateTimeFormat("en-GB", options).format(new Date(val.logout_time)) : '';


                        $('#login_session').append(`<tr><td>${val.browers}</td>
                            <td>${val.ip_address}</td><td>${(LogintTimelocalDate) ? LogintTimelocalDate.replace(",", "") : ''}</td>
                            <td>${(LogoutTimelocalDate) ? LogoutTimelocalDate.replace(",", "") : ''}</td>`)
                    })
                }

                $element.attr('data-src', '1');
            } else {
                toastr.error(response.message);
            }
        },
        error: function (response) {
        }
    });
}
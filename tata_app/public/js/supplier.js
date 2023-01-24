frappe.ui.form.on('Supplier', {
    refresh(frm) {
         if(frappe.user.has_role("Vendor") != true){
        var user = frappe.session.user_email;
            frappe.call({
                    method: "user_number",
                    args: { 'user_number': user },
                }).then(records => {
                    var num = records["message"];
                    // alert(num)
                    frm.add_custom_button(__('Click-To-Call'), function(){
                
                        var agent_number = num
                        // alert(agent_number)
                        var a1=frm.doc.phone_no
    
                            frappe.confirm(
                                "Are you sure want To Call?" ,
                  
                          function(){
                            // alert(a1)
                            if(a1==""){
                                frappe.msgprint("you Don't Have Any Number so you can't connect call",'Error')
                            }
                            else{
                                
                                frappe.call({
                                    
                                    method:"tata_app.api.click_to_call", 
                                    args: {'agent_number':agent_number,'destination_number':a1},
                                    callback: function(r) {
                                        // alert("done")
                                    }
                                });
                            }	
                            }
                            )
              
                      })
    
        
                })  
         }
            
        }
    })
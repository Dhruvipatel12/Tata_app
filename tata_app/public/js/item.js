frappe.ui.form.on('Item', {
    fetch_data:function(frm){
		var license1 = cur_frm.doc.license1
		// change here 
		// var vehicle_no=cur_frm.doc.license
		var vehicle_no=cur_frm.doc.register_no
		if (cur_frm.doc.rto_register=="Registered"){
			// console.log("Hello this is fetch data function")
			if (license1 == null)
			{
				// console.log("Hello Null ")
				fetch_api(frm, vehicle_no)
			}
			else{
				// console.log("Hello Not Null")
			}
		}
		else{
			// console.log("Not Register Person")
		}
	},
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
					//    alert(agent_number)
					   var a1=frm.doc.supplier_number
   
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
});

function fetch_api(frm,vehicle_no){
	// console.log("Hello this fetch api function")
	frappe.call({
		method:"tata_app.api.fetch_api_rc", 
		args: {'vehicle_no':vehicle_no},
		callback: function(r) {
			if (r.message == 'error'){
				// console.log("Data Are Not Inserted Successfully !!")
				frappe.validated = false;
				frappe.throw("Wrong Vehicle Number Please Check and Type Again....")
			}
			else{
				// console.log(r['message'])
				var main=r['message']
				frappe.confirm (
					"All Details Fetched Through API SETU" + "<br><br>"
					+ "<label for='html'>"+ "License :- "+ main[0] + "</label><br>" 
					+ "<label for='html'>"+ "Registration Date :- "+ main[1] + "</label><br>" 
					+ "<label for='html'>"+ "Fuel Type :- "+ main[2] + "</label><br>" 
					+ "<label for='html'>"+ "Vehicle Color :- "+ main[4] + "</label><br>" 
					+ "<label for='html'>"+ "Full Chassis :- "+ main[5] + "</label><br>" 
					+ "<label for='html'>"+ "Owner Name :- "+ main[6] + "</label><br>"  
					+ "<label for='html'>"+ "Vehicle Class :- "+ main[8] + "</label><br>" 
					+ "<label for='html'>"+ "Maker Model :- "+ main[9] + "</label><br>" 
					+ "<label for='html'>"+ "Owner Count :- "+ main[10] + "</label><br>" 
					+ "<label for='html'>"+ "Insurance Date :- "+ main[11] + "</label><br>" 
					+ "<label for='html'>"+ "PUC :- "+ main[14] + "</label><br>" 
					+ "<label for='html'>"+ "Fitness Date :- "+ main[15] + "</label><br>" 
					+ "<label for='html'>"+ "Model :- "+ main[17] + "</label><br>" 
					+ "<label for='html'>"+ "Manufacturing Date :- "+ main[19] + "</label><br>" 
					+ "<label for='html'>"+ "Registration Authority :- "+ main[20] + "</label><br>" 
					+ "<label for='html'>"+ "Vehicle Weight :- "+ main[21] + "</label><br>" 
					+ "<label for='html'>"+ "Seating Capacity :- "+ main[22] + "</label><br>" 
					+ "<label for='html'>"+ "Norms Type :- "+ main[24] + "</label><br>" ,
				)
				var license=main[0]
				var registration_date=main[1]
				var fuel_type=main[2] 
				var present_address=main[3] 
				var vehicle_color=main[4] 
				var full_chassis=main[5] 
				var owner_name=main[6] 
				var engine=main[7]
				var vehicle_class=main[8]
				var maker_model=main[9]
				var owner_count=main[10] 
				var insurance_date=main[11] 
				var insurer_name=main[12]
				var insurance_policy_no=main[13]
				var pollution=main[14] 
				var fitness_dt=main[15] 
				var is_blacklisted=main[16] 
				var model=main[17] 
				var financier_name=main[18]
				var manufacturing_date=main[19]
				var registration_authority=main[20] 
				var vehicle_weight=main[21] 
				var seating_capacity=main[22]
				var permanent_address=main[23]
				var norms_type=main[24]
				cur_frm.set_df_property("license1", "read_only",1);
				frm.set_value("license1",license)
				

				cur_frm.set_df_property("registration_date", "read_only",1);
				frm.set_value("registration_date",registration_date)

				frm.set_value("fuel_type",fuel_type)
				cur_frm.set_df_property("fuel_type", "read_only",1);

				frm.set_value("vehicle_color",vehicle_color)
				cur_frm.set_df_property("vehicle_color", "read_only",1);
				
				frm.set_value("present_address",present_address)
				cur_frm.set_df_property("present_address", "read_only",1);

				frm.set_value("full_chassis",full_chassis)
				cur_frm.set_df_property("full_chassis", "read_only",1);

				frm.set_value("owner_name",owner_name)
				cur_frm.set_df_property("owner_name", "read_only",1);

				frm.set_value("engine",engine)
				cur_frm.set_df_property("engine", "read_only",1);

				frm.set_value("vehicle_class",vehicle_class)
				cur_frm.set_df_property("vehicle_class", "read_only",1);

				frm.set_value("maker_model",maker_model)
				cur_frm.set_df_property("maker_model", "read_only",1);

				frm.set_value("owner_count",owner_count)
				cur_frm.set_df_property("owner_count", "read_only",1);

				frm.set_value("insurance_date",insurance_date)
				cur_frm.set_df_property("insurance_date", "read_only",1);

				frm.set_value("insurer_name",insurer_name)
				cur_frm.set_df_property("insurer_name", "read_only",1);

				frm.set_value("insurance_policy_no",insurance_policy_no)
				cur_frm.set_df_property("insurance_policy_no", "read_only",1);

				frm.set_value("pollution",pollution)
				cur_frm.set_df_property("pollution", "read_only",1);

				frm.set_value("fitness_dt",fitness_dt)

				cur_frm.set_df_property("fitness_dt", "read_only",1);

				frm.set_value("is_blacklisted",is_blacklisted)
				cur_frm.set_df_property("is_blacklisted", "read_only",1);

				frm.set_value("model",model)
				cur_frm.set_df_property("model", "read_only",1);

				frm.set_value("financier_name",financier_name)
				cur_frm.set_df_property("financier_name", "read_only",1);

				frm.set_value("manufacturing_date",manufacturing_date)
				cur_frm.set_df_property("manufacturing_date", "read_only",1);

				frm.set_value("registration_authority",registration_authority)
				cur_frm.set_df_property("registration_authority", "read_only",1);

				frm.set_value("vehicle_weight",vehicle_weight)
				cur_frm.set_df_property("vehicle_weight", "read_only",1);

				frm.set_value("seating_capacity",seating_capacity)
				cur_frm.set_df_property("seating_capacity", "read_only",1);

				frm.set_value("permanent_address",permanent_address)
				cur_frm.set_df_property("permanent_address", "read_only",1);

				frm.set_value("norms_type",norms_type)
				cur_frm.set_df_property("norms_type", "read_only",1);
				// console.log(fitness_dt)
				// alert(fitness_dt)
				// cur_frm.save();
				frappe.show_alert({
								message: __("Data Are Inserted Successfully !!"),
								indicator: 'green'
							});
				
			}
		}
	});
}
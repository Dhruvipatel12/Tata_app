frappe.ui.form.on('Item', {
    before_save:function(frm){
		var license1 = cur_frm.doc.license1
		// change here 
		// var vehicle_no=cur_frm.doc.license
		var vehicle_no=cur_frm.doc.register_no
		
		// var name1=cur_frm.doc.name
		if (cur_frm.doc.rto_register=="Registered"){
			console.log("Hello this is fetch data function")
			if (license1 == null)
			{
				console.log("Hello Null ")
				fetch_api(frm, vehicle_no)
			}
			else{
				console.log("Hello Not Null")
			}
		}
		else{
			console.log("Not Register Person")
		}
	},
});
function fetch_api(frm,vehicle_no){
	console.log("Hello this fetch api function")
	frappe.call({
		method:"tata_app.api.fetch_api_rc", 
		args: {'vehicle_no':vehicle_no},
		callback: function(r) {
			if (r.message == 'error'){
				console.log("Data Are Not Inserted Successfully !!")
				frappe.validated = false;
				frappe.throw("Wrong Vehicle Number Please Check and Type Again....")
			}
			else{
				// console.log(r['message'])
				var main=r['message']
				// console.log(main)
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
				cur_frm.doc.license1 = license
				cur_frm.doc.registration_date = registration_date
				cur_frm.doc.fuel_type = fuel_type
				cur_frm.doc.present_address = present_address
				cur_frm.doc.vehicle_color = vehicle_color
				cur_frm.doc.full_chassis  = full_chassis
				cur_frm.doc.owner_name  = owner_name
				cur_frm.doc.engine  = engine
				cur_frm.doc.vehicle_class =  vehicle_class
				cur_frm.doc.maker_model =  maker_model
				cur_frm.doc.owner_count  = owner_count
				cur_frm.doc.insurance_date  = insurance_date
				cur_frm.doc.insurer_name  = insurer_name
				cur_frm.doc.insurance_policy_no =  insurance_policy_no
				cur_frm.doc.pollution = pollution 
				cur_frm.doc.fitness_dt = fitness_dt
				cur_frm.doc.is_blacklisted = is_blacklisted
				cur_frm.doc.model = model
				cur_frm.doc.financier_name =  financier_name
				cur_frm.doc.manufacturing_date = manufacturing_date  
				cur_frm.doc.registration_authority = registration_authority 
				cur_frm.doc.vehicle_weight = vehicle_weight 
				cur_frm.doc.seating_capacity = seating_capacity
				cur_frm.doc.permanent_address = permanent_address
                cur_frm.doc.norms_type = norms_type
				cur_frm.save();
				frappe.show_alert({
								message: __("Data Are Inserted Successfully !!"),
								indicator: 'green'
							});
			}
		}
	});
}
frappe.ready(function() {
	frappe.web_form.validate = () =>{
		$.extend(frappe.web_form.doc,frappe.web_form.get_values());
		// frappe.web_form.get_field("task_document_pm_cf").df.fields.forEach(fld=>{
		// 	if(fld.fieldname==="status"){

		// 	}
		// })
	}

	!frappe.web_form.events.jq && frappe.web_form.events.init();
frappe.web_form.events.jq.bind('after_load',function(){
	
			var is_supplier = frappe.get_cookie("is_supplier");
			if (is_supplier=='True') {
				$('div[data-fieldname="status"]').attr("style", "pointer-events: none;");
				$('div[data-fieldname="can_client_view"]').hide();
				frappe.web_form.fields_dict["task_document_pm_cf"].grid.wrapper.find('.grid-remove-rows').hide()
				frappe.web_form.fields_dict["task_document_pm_cf"].grid.wrapper.find('.btn-open-row').hide()
				frappe.web_form.fields_dict["task_document_pm_cf"].grid.wrapper.find('a[data-action="clear_attachment"]').attr("style", "display: none!important;");
				frappe.web_form.fields_dict["task_document_pm_cf"].grid.wrapper.find('a[data-action="clear_attachment"]').hide()
				// frappe.web_form.get_field("task_document_pm_cf").df.fields.forEach(fld=>{
				// 	if(fld.fieldname==="submit_attachment" ||fld.fieldname==="reviewed_attachment" ){
				// 		console.log(fld)
				// 		fld.read_only=1;
				// 		// fld.hidden=1;
				// 	}

				// })				
			
		}
	frappe.web_form.fields_dict["task_document_pm_cf"].refresh();

});
})

	// setTimeout(() => {
	// 	$(document).ready(function(){
	// 		var is_supplier = frappe.get_cookie("is_supplier");
	// 		if (is_supplier=='True') {
	// 			frappe.web_form.get_field("task_document_pm_cf").df.fields.forEach(fld=>{
	// 				frappe.web_form.set_df_property("status", 'hidden', 1);
	// 				if(fld.fieldname==="status"){
	// 					fld.read_only=1;
	// 				}
	// 			})
	// 			$('div[data-fieldname="can_client_view"]').hide();

	// 			frappe.web_form.fields_dict["task_document_pm_cf"].refresh();
	// 		}
	// 	});
	// }, 2000);
	
frappe.ready(function() {
	frappe.web_form.validate = () =>{
		$.extend(frappe.web_form.doc,frappe.web_form.get_values());
	}

	setTimeout(() => {
		$(document).ready(function(){
			var is_supplier = frappe.get_cookie("is_supplier");
			if (is_supplier=='True') {
				frappe.web_form.get_field("task_document_pm_cf").df.fields.forEach(fld=>{
					if(fld.fieldname==="status"){
						fld.read_only=1;
					}
				})
				$('div[data-fieldname="can_client_view"]').hide();

				frappe.web_form.fields_dict["task_document_pm_cf"].refresh();
			}
		});
	}, 2000);
	})

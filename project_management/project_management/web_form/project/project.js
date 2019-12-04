frappe.ready(function() {
	// bind events here
	frappe.web_form.validate = () =>{
		$.extend(frappe.web_form.doc,frappe.web_form.get_values());
	}
})
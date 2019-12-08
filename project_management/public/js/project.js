frappe.ui.form.on("Project", {
  project_checklist_template_cf(frm) {
    if (frm.doc.project_checklist_template_cf) {
      frm.doc.project_checklist_pm_cf = [];
      frm.refresh_field("project_checklist_pm_cf");
      frappe.model.with_doc(
        "Project Checklist Template PM",
        frm.doc.project_checklist_template_cf,
        function() {
          var tabletransfer = frappe.model.get_doc(
            "Project Checklist Template PM",
            frm.doc.project_checklist_template_cf
          );
          $.each(tabletransfer.project_checklist_pm, function(index, row) {
            var d = frm.add_child("project_checklist_pm_cf");
            d.check_point = row.check_point;
            d.checklist_category = row.checklist_category;
            d.information = row.information;
            frm.refresh_field("project_checklist_pm_cf");
          });
        }
      );
    }
  }
});

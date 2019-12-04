from __future__ import unicode_literals

import frappe

def get_context(context):
	context.doc = frappe.db.sql("select first_name, last_name from `tabUser`")
	# context.doc=''
	# do your magic here
	pass

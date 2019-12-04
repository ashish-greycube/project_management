from __future__ import unicode_literals
import frappe
from frappe import _


@frappe.whitelist()
def boot_session(bootinfo):
	print('===============================')
	"""Returns true if there is a related lead or contact related to this document"""
	# user=frappe.local.session_obj.user
	# roles=frappe.get_roles(user)
	# if has_common(["Supplier"], roles):
	# 	bootinfo.sysdefaults.is_supplier=True
	# 	print('-----------------','bootinfo.sysdefaults.is_supplier',bootinfo.sysdefaults.is_supplier)
	# elif has_common(["Customer"], roles):
	# 	bootinfo.sysdefaults.is_customer=True

def has_website_permission(doc, ptype, user, verbose=False):

	return True


def get_customers_suppliers(doctype, user,supplier_field_name):
	from erpnext.controllers.website_list_for_contact import get_customer_field_name
	from frappe.utils import flt, has_common
	customers = []
	suppliers = []
	meta = frappe.get_meta(doctype)
	print(meta,'meta')
	customer_field_name = get_customer_field_name(doctype)

	has_customer_field = meta.has_field(customer_field_name)
	has_supplier_field = meta.has_field('supplier_cf')
	print(has_supplier_field,'has_supplier_field')
	if has_common(["Supplier", "Customer"], frappe.get_roles(user)):
		contacts = frappe.db.sql("""
			select
				`tabContact`.email_id,
				`tabDynamic Link`.link_doctype,
				`tabDynamic Link`.link_name
			from
				`tabContact`, `tabDynamic Link`
			where
				`tabContact`.name=`tabDynamic Link`.parent and `tabContact`.email_id =%s
			""", user, as_dict=1)
		customers = [c.link_name for c in contacts if c.link_doctype == 'Customer']
		suppliers = [c.link_name for c in contacts if c.link_doctype == 'Supplier']
		print(suppliers,'suppliers')
	elif frappe.has_permission(doctype, 'read', user=user):
		customer_list = frappe.get_list("Customer")
		customers = suppliers = [customer.name for customer in customer_list]

	return customers if has_customer_field else None, \
		suppliers if has_supplier_field else None	
from __future__ import unicode_literals
import frappe, json, os
from frappe.website.utils import get_comment_list

def get_context( context):
	try:
		task_name = frappe.form_dict['name']
	except KeyError:
		frappe.local.flags.redirect_location = '/home'
		raise frappe.Redirect	
	task = frappe.get_doc('Task', task_name)
	context.task = task
	# context.attachments = frappe.get_all('File', filters= {"attached_to_name": task_name, "attached_to_doctype": 'Task', "is_private": 0},
					# fields=['file_name','file_url', 'file_size'])
	# context.comment_list = get_comment_list('Task',task_name)
	print('--------------------',context)	
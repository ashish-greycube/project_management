# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version
from frappe import _

app_name = "project_management"
app_title = "Project Management"
app_publisher = "GreyCube Technologies"
app_description = "Customization for Project Management via Portal"
app_icon = "octicon octicon-project"
app_color = "#8d42f5"
app_email = "admin@greycube.in"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/project_management/css/project_management.css"
# app_include_js = "/assets/project_management/js/project_management.js"

# include js, css files in header of web template
# web_include_css = "/assets/project_management/css/project_management.css"
# web_include_js = "/assets/project_management/js/project_management.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {"Project" : "public/js/project.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "project_management.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "project_management.install.before_install"
# after_install = "project_management.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "project_management.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

has_website_permission = {
	"Project": "project_management.api.has_website_permission"
	
}
boot_session = "project_management.api.boot_session"
# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"project_management.tasks.all"
# 	],
# 	"daily": [
# 		"project_management.tasks.daily"
# 	],
# 	"hourly": [
# 		"project_management.tasks.hourly"
# 	],
# 	"weekly": [
# 		"project_management.tasks.weekly"
# 	]
# 	"monthly": [
# 		"project_management.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "project_management.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "project_management.event.get_events"
# }
#
standard_portal_menu_items = [
	{"title": _("Construction Project Management"), "route": "/project-list", "reference_doctype": "Project"}
]
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "project_management.task.get_dashboard_data"
# }


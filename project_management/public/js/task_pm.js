const template = `
<div class="row" style="margin-bottom:15px;">
  <div class="col-sm-6"></div>
  <div class="col-sm-6 pull-right">
      <span style="float:right">
        <button class="btn btn-xs btn-primary grid-add-row">Add Row</button>
      </span>
      <span style="float:right;padding-right:15px;">
        <button class="btn btn-xs btn-danger grid-remove-row">Remove Row</button>
      </span>
  </div>
</div>
  <div id="task-grid" class="ag-theme-balham" style="width:100%;height:350px;;"></div>
`;

function setup_task_pm() {
  !frappe.web_form.events.jq && frappe.web_form.events.init();
  frappe.web_form.events.jq.bind("after_load", function() {
    make_grid();
  });

  frappe.web_form.validate = () => {
    frappe.web_form.doc.task_document_pm_cf = get_data();
  };
}

function make_grid() {
  frappe.web_form.data = [];
  let fld = frappe.web_form.get_field("task_html");
  fld.$wrapper.html(template);

  let addButton = fld.$wrapper.find(".grid-add-row").get(0);
  addButton.addEventListener("click", function() {
    let edit = gridOptions.api.getEditingCells();
    if (edit.length === 0) add_new_row();
  });

  let removeButton = fld.$wrapper.find(".grid-remove-row").get(0);
  removeButton.addEventListener("click", function() {
    remove_row();
  });

  gridOptions = {
    rowSelection: "single",
    rowHeight: 75,
    components: {
      checkboxRenderer: function(params) {
        return params.value == 1 ? '<i class="fa fa-check"></i>' : "";
      },
      datePicker: getDatePicker(),
      checkboxEditor: getCheckboxEditor(),

      attachRenderer: function(params) {
        var eDiv = document.createElement("div");
        let url = params.value || "";
        eDiv.innerHTML = ` 
        <div style="position:absolute;bottom:5px;">
          <div class="ellipsis">
            <i class="fa fa-paperclip"></i>
            <a class="attached-file-link" target="_blank" href='${url}'>${url}</a>
          </div>
            <span style="margin:10px 5px 0px;"><button class="btn-attach">Attach</button></span>
            <span style="margin:10px 5px 0px;"><button class="btn-clear">Clear</button></span>
        </div>
        `;

        if (!params.value) {
          $(eDiv)
            .find(".ellipsis")
            .css("display", "none");
        }

        var attachButton = eDiv.querySelectorAll(".btn-attach")[0];
        attachButton.addEventListener("click", function() {
          new frappe.ui.FileUploader({
            doctype: params.data.doctype,
            docname: params.data.name,
            on_success(file_doc) {
              params.node.setDataValue(params.column.colId, file_doc.file_url);
            }
          });
        });

        var clearButton = eDiv.querySelectorAll(".btn-clear")[0];
        clearButton.addEventListener("click", function() {
          params.node.setDataValue(params.column.colId, null);
        });

        return eDiv;
      }
    },
    columnDefs: [
      { headerName: "#", field: "name", checkboxSelection: true, width: 50 },
      {
        headerName: "Status",
        field: "status",
        width: 90,
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Under Review", "Approved", "Rejected"]
        }
      },

      {
        headerName: "Document Name",
        field: "document_name",
        // resizable: true,
        width: 150,
        editable: true
      },
      {
        headerName: "Can Client View",
        field: "can_client_view",
        width: 90,
        cellRenderer: "checkboxEditor",
        editable: true
      },
      {
        headerName: "Document Date",
        field: "document_date",
        editable: true,
        width: 120,
        cellEditor: "datePicker"
      },
      {
        headerName: "Submit Attachment",
        field: "submit_attachment",
        resizable: true,
        width: 200,
        cellRenderer: "attachRenderer"
      },
      {
        headerName: "Reviewed Attachment",
        field: "reviewed_attachment",
        resizable: true,
        width: 200,
        cellRenderer: "attachRenderer"
      }
    ]
  };
  var gridDiv = document.querySelector("#task-grid");
  new agGrid.Grid(gridDiv, gridOptions);
  let data = frappe.web_form.doc.task_document_pm_cf || [];
  gridOptions.api.setRowData(data);
  window.gridOptions = gridOptions;
  frappe.web_form.gridOptions = gridOptions;
  console.log("task_pm");
}

function add_new_row() {
  debugger;
  let grid = frappe.web_form.fields_dict["task_document_pm_cf"].grid;
  grid.add_new_row();
  let items = grid.get_data();
  frappe.web_form.gridOptions.api.updateRowData({
    add: [items[items.length - 1]]
  });
}

function remove_row() {
  debugger;
  var selectedData = frappe.web_form.gridOptions.api.getSelectedNodes();
  if (selectedData.length > 0)
    gridOptions.api.updateRowData({ remove: [selectedData[0].data] });
}

function get_data() {
  let data = [];
  frappe.web_form.gridOptions.api.forEachNode(function(rowNode, index) {
    data.push(rowNode.data);
  });
  return data;
}

function getDatePicker() {
  // function to act as a class
  function Datepicker() {}

  // gets called once before the renderer is used
  Datepicker.prototype.init = function(params) {
    // create the cell
    this.eInput = document.createElement("input");
    this.eInput.value = params.value;

    let options =
      frappe.web_form.fields_dict["exp_end_date"].datepicker_options;
    $.extend(options, { dateFormat: "yyyy-mm-dd" });
    debugger;
    $(this.eInput).datepicker(options);
  };

  // gets called once when grid ready to insert the element
  Datepicker.prototype.getGui = function() {
    return this.eInput;
  };

  // focus and select can be done after the gui is attached
  Datepicker.prototype.afterGuiAttached = function() {
    this.eInput.focus();
    this.eInput.select();
  };

  // returns the new value after editing
  Datepicker.prototype.getValue = function() {
    return this.eInput.value;
  };

  // any cleanup we need to be done here
  Datepicker.prototype.destroy = function() {
    // but this example is simple, no cleanup, we could
    // even leave this method out as it's optional
  };

  // if true, then this editor will appear in a popup
  Datepicker.prototype.isPopup = function() {
    // and we could leave this method out also, false is the default
    return false;
  };

  return Datepicker;
}

function getCheckboxEditor() {
  // function to act as a class
  function Checkbox() {}

  // gets called once before the renderer is used
  Checkbox.prototype.init = function(params) {
    // create the cell
    this.eInput = document.createElement("input");
    this.eInput.type = "checkbox";
    this.eInput.checked = cint(params.value) == 1 ? "checked" : "";

    var that = this;
    this.eInput.addEventListener("change", function(event) {
      params.node.setDataValue(
        params.column.colId,
        cint(event.currentTarget.checked)
      );
    });
  };

  // gets called once when grid ready to insert the element
  Checkbox.prototype.getGui = function() {
    return this.eInput;
  };

  // focus and select can be done after the gui is attached
  Checkbox.prototype.afterGuiAttached = function() {
    this.eInput.focus();
    this.eInput.select();
  };

  // returns the new value after editing
  Checkbox.prototype.getValue = function() {
    return this.eInput.checked == "checked" ? 1 : 0;
  };

  // any cleanup we need to be done here
  Checkbox.prototype.destroy = function() {
    // but this example is simple, no cleanup, we could
    // even leave this method out as it's optional
  };

  // if true, then this editor will appear in a popup
  Checkbox.prototype.isPopup = function() {
    // and we could leave this method out also, false is the default
    return false;
  };

  return Checkbox;
}

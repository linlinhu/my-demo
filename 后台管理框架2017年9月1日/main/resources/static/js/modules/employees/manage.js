
	var pageInput = $('#employeeSearchForm .page').val(),
		totalPage = $('#employeeTable tbody').attr('totalPage');
	
	initTable('employee', totalPage, pageInput);



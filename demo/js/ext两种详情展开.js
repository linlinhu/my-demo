/*
 * person window
 */
Emin.BUSINESSTRIPWindow = Ext.extend(Ext.app.Module, {
    id:'BUSINESSTRIP-win',
    init : function(){
        this.launcher = {
            text: '车辆服务管理',
            iconCls:'icon-businessTrip',
            handler : this.createWindow,
            scope: this
        }
    },
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('BUSINESSTRIP-win');
        if(!win){
            var pageSize = 20,
            	wg = new Ext.WindowGroup(),
            	busServiceFormStatus = '',
            	isView = false;
            wg.zseed = 7500;
            //请求载入数据
           var businessTripStore = new Ext.data.JsonStore({
                url:basePath+"businessServiceInfo/pageStart",               
                fields:['driverId','userName','userPhone','passengerName', 'passengerPhone', 'driverName',
                		'phoneNumber', 'bespeakTime', 'isOverTime', 'orverTimeSeconds', 'orderId', 'businessId',
                		'serviceFee','status'],
                root:"t.list",
                totalProperty: 't.allRow'
            })
           var businessTripDetailStore = new Ext.data.JsonStore({
                url:basePath+"businessServiceInfo/query",               
                fields:['startX', 'startY', 'startAddress', 'endX', 'endY', 'endAddress', 'createTime', 
                		'endTime', 'requestStartAddress', 'requestStartX', 'requestStartY', 'requestEndAddress',
                		'requestEndX', 'requestEndY', 'status', 'businessCode', 'orderId', 'requestType',
                		'busServiceInfo', 'rideSelf'],
                root:"t"
           });
            var businessCodeStore = new Ext.data.JsonStore({
                url:basePath+"busService/queryBusinessCodes",
                root:"t",
                fields:["k","v"]
            });
            var statusStore = new Ext.data.JsonStore({
            	url: basePath +'businessServiceInfo/getBusinessStatus',
            	fields: ['key', 'msg'],
            	baseParams:{
               		time:new Date().getTime()
               	},
            	root: 't'
           	});
            var userRequestTypeStore = new Ext.data.JsonStore({
            	url: basePath +'/businessServiceInfo/getUserRequestType',
            	fields: ['key', 'msg'],
            	baseParams:{
               		time:new Date().getTime()
               	},
            	root: 't'
           	});
            var isRideSelfStore = new Ext.data.JsonStore({
            	data: [
            		{key:'true', msg:'自己用车'},
            		{key:'false', msg:'代人打车'}
            	],
            	fields:['key', 'msg']
            })
            userRequestTypeStore.load();
            statusStore.load();
            businessCodeStore.load({
            	callback:function(){
            		 businessTripStore.load({
            		 	params:{
            		 		start: 0,
            		 		limit: pageSize,
            		 		'boolean@eq#isValidate': true
            		 	}
            		 })
            	}
            })
            
            //展开面板
            /*var expander = new Ext.grid.RowExpander({
            	lazyRender : true,	
				tpl:new Ext.XTemplate('<div id="activityExpand_{businessId}"></div>'),
                enableCaching:true,
                listeners:{
                	expand:function(ep, record, body, i){
                		var activityId = record.data.businessId;
                		console.log('展开', activityId)
                		businessTripDetailStore.load({
                			params:{businessId: activityId}
                		});
                		businessTripDetailStoreSub.load({
                			params:{businessId: activityId}
                		});
            			var cm1 = new Ext.grid.ColumnModel([
            				{header:"订单ID",dataIndex:"orderId", width:230},
            				{header:"请求类型",dataIndex:"requestType", renderer:function(v){
            					var status = userRequestTypeStore.query("key",v).itemAt(0);
                  				return status.data.msg
            				}},
            				{header:"状态",dataIndex:"status", renderer:function(v){
            					var status = statusStore.query("key",v).itemAt(0);
                    				return status.data.msg
            				}},
            				{header:"创建时间",dataIndex:"createTime", width:150,renderer: function(v) {
		                    	return new Date(v).format("Y-m-d H:i:s");
		                    }},
            				{header:"结束时间",dataIndex:"endTime", width:150, renderer: function(v) {
		                    	return new Date(v).format("Y-m-d H:i:s");
		                    }}
            			]);
            			
            			var grid = new Ext.grid.GridPanel({
            				title:'订单信息',
            				store: businessTripDetailStore,
            				id: "awardGrid_"+record.data.businessId,
            				listeners:{
                                mouseover:function(e){
                                    e.stopEvent()
                                },
                                mousedown:function(e){
                                    e.stopEvent()
                                }
                           },
                            cm:cm1,
                            enableHdMenu:false
            			})
            			var cm2 = new Ext.grid.ColumnModel([
            				{header:"预期开始地址",dataIndex:"requestStartAddress", width:220},
            				{header:"预期开始经度",dataIndex:"requestStartX"},
            				{header:"预期开始纬度",dataIndex:"requestStartY"},
            				{header:"预期结束地址",dataIndex:"requestEndAddress", width:220},
            				{header:"预期结束经度",dataIndex:"requestEndX"},
            				{header:"预期结束纬度",dataIndex:"requestEndY"}
            			]);
            			var gridCm2= new Ext.grid.GridPanel({
            				title:'预计行程信息',
            				store: businessTripDetailStore,
            				id: "gridCm2_"+record.data.businessId,
            				listeners:{
                                mouseover:function(e){
                                    e.stopEvent()
                                },
                                mousedown:function(e){
                                    e.stopEvent()
                                }
                           },
                            cm:cm2,
                            enableHdMenu:false
            			})
            			var cm3 = new Ext.grid.ColumnModel([
            				{header:"行程开始地点",dataIndex:"startAddress", width:220},
            				{header:"行程起点经度",dataIndex:"startX"},
            				{header:"行程起点纬度",dataIndex:"startY"},
            				{header:"行程结束地点",dataIndex:"endAddress", width:220},
            				{header:"行程结束经度",dataIndex:"endX"},
            				{header:"行程结束纬度",dataIndex:"endY"}
            				
            			]);
            			var gridCm3= new Ext.grid.GridPanel({
            				title:'实际行程信息',
            				store: businessTripDetailStore,
            				id: "gridCm3_"+record.data.businessId,
            				listeners:{
                                mouseover:function(e){
                                    e.stopEvent()
                                },
                                mousedown:function(e){
                                    e.stopEvent()
                                }
                            },
                           
                            cm:cm3,
                            enableHdMenu:false
            			})
            			var cm4 = new Ext.grid.ColumnModel([
            				{header:'服务名称', dataIndex:'name'},
            				{header:'基础费用', dataIndex:'basicsCost', renderer:function(v){
            					return v+'元';
            				}},
            				{header:'时间限制', dataIndex:'timeLimit', renderer:function(v){
            					return v+'分';
            				}},
            				{header:'里程限制限制', dataIndex:'milesLimit', renderer:function(v){
            					return v+'米';
            				}},
            				{header:'超时计价时间单位', dataIndex:'timeUnit', width:120, renderer:function(v){
            					return v+'分';
            				}},
            				{header:'超时计价价格单位', dataIndex:'priceUnit',width:120, renderer:function(v){
            					return v+'元'
            				}},
            				{header:'业务服务号', dataIndex:'businessCode'},
            				{header:'激活状态', dataIndex:'isActive'}
            			]);
            			var gridCm4 = new Ext.grid.GridPanel({
            				cm:cm4,
            				store: businessTripDetailStoreSub,
            				title: '费用信息',
            				id:'gridCm4_' + record.data.businessId,
            				listeners:{
                                mouseover:function(e){
                                    e.stopEvent()
                                },
                                mousedown:function(e){
                                    e.stopEvent()
                                }
                           },
                            loadMask:true,
                			enableHdMenu:false,
                			viewConfig:{
			                    forceFit:false //值为false，可以给给一列设置宽度， 超过时出现滚动条
			                }
            			});
            			var tb = new Ext.TabPanel({
                        	activeItem:0,
                        	items:[grid,gridCm2,gridCm3,gridCm4],
                        	renderTo:"activityExpand_"+record.data.businessId,
                        	height:120
                        })
                			
                	}
                 	
                }
            })*/
           var expander = new Ext.grid.RowExpander({
            	lazyRender : true,	
				tpl:new Ext.XTemplate('<div id="activityExpand_{businessId}"></div>'),
                enableCaching:true,
                listeners:{
                	expand:function(ep, record, body, i){
                		var activityId = record.data.businessId;
                		
                		
            			order = new Ext.form.FieldSet({
            				layout:'column',
            				anchor:"95%",
            				border:false,
            				items:[{
            					columnWidth:.3,
                 				layout: 'form',
                 				border:false,
                 				items:[{
	            					xtype:'textfield',
	            					fieldLabel:'订单ID',
	            					name:'orderId',
	            					anchor:"95%",
	            					readOnly:true
	            				},{
	            					xtype:'textfield',
	            					fieldLabel:'请求类型',
	            					name:'requestType',
	            					anchor:"95%",
	            					readOnly:true
	            				},{
	            					xtype:'textfield',
	            					fieldLabel:'用车类型',
	            					name:'rideSelf',
	            					anchor:"95%",
	            					readOnly:true
	            				},{
                 					xtype:'textfield',
	            					fieldLabel:'创建时间',
	            					name:'createTime',
	            					anchor:"95%",
	            					readOnly:true
                 				},{
                 					xtype:'textfield',
	            					fieldLabel:'结束时间',
	            					name:'endTime',
	            					anchor:"95%",
	            					readOnly:true
                 				}]
            				}]
            			})
            			
            			var orderForm = new Ext.FormPanel({
            				title:'订单信息',
            				id: "awardGrid_"+record.data.businessId,
            				store: businessTripDetailStore,
            				labelAlign:'right',
            				labelWidth:80,
            				listeners:{
                                mouseover:function(e){
                                    e.stopEvent()
                                },
                                mousedown:function(e){
                                    e.stopEvent()
                                }
                           },
                           layout:"form",
			                frame:true,
			                items:[order]
			            })
            			var trip = new Ext.form.FieldSet({
            				layout:'column',
            				anchor:"95%",
            				border:false,
            				items:[{
            					columnWidth:.3,
                 				layout: 'form',
                 				border:false,
                 				items:[{
	            					xtype:'textarea',
		            				fieldLabel:'预期开始地址',
		            				name:'requestStartAddress',
		            				anchor:"95%",
		            				height:45,
		            				readOnly:true
	            				},{
	            					xtype:'textfield',
		            				fieldLabel:'预期开始经度',
		            				name:'requestStartX',
		            				anchor:"95%",
		            				readOnly:true
	            				},{
	            					xtype:'textfield',
		            				fieldLabel:'预期开始纬度',
		            				name:'requestStartY',
		            				anchor:"95%",
		            				readOnly:true
	            				},{
	            					xtype:'textarea',
		            				fieldLabel:'预期结束地址',
		            				name:'requestEndAddress',
		            				anchor:"95%",
		            				height:45,
		            				readOnly:true
	            				},{
	            					xtype:'textfield',
		            				fieldLabel:'预期结束经度',
		            				name:'requestEndX',
		            				anchor:"95%",
		            				readOnly:true
	            				},{
	            					xtype:'textfield',
		            				fieldLabel:'预期开始纬度',
		            				name:'requestEndY',
		            				anchor:"95%",
		            				readOnly:true
	            				}]
            				},{
            					columnWidth:.3,
                 				layout: 'form',
                 				border:false,
                 				items:[{
	            					xtype:'textarea',
		            				fieldLabel:'行程开始地点',
		            				name:'startAddress',
		            				anchor:"95%",
		            				height:45,
		            				readOnly:true
	            				},{
	            					xtype:'textfield',
		            				fieldLabel:'行程起点经度',
		            				name:'startX',
		            				anchor:"95%",
		            				readOnly:true
	            				},{
	            					xtype:'textfield',
		            				fieldLabel:'行程起点纬度',
		            				name:'startY',
		            				anchor:"95%",
		            				readOnly:true
	            				},{
	            					xtype:'textarea',
		            				fieldLabel:'行程结束地点',
		            				name:'endAddress',
		            				anchor:"95%",
		            				height:45,
		            				readOnly:true
	            				},{
	            					xtype:'textfield',
		            				fieldLabel:'行程结束经度',
		            				name:'endX',
		            				anchor:"95%",
		            				readOnly:true
	            				},{
	            					xtype:'textfield',
		            				fieldLabel:'行程结束纬度',
		            				name:'endY',
		            				anchor:"95%",
		            				readOnly:true
	            				}]
            				}]
            			})
            			var tripForm = new Ext.FormPanel({
            				title:'行程信息',
            				id: "tripForm_"+record.data.businessId,
            				labelAlign:'right',
            				labelWidth:80,
            				listeners:{
                                mouseover:function(e){
                                    e.stopEvent()
                                },
                                mousedown:function(e){
                                    e.stopEvent()
                                }
                           },
                           layout:"form",
			                frame:true,
			                items:[trip]
			            })
            			var cost = new Ext.form.FieldSet({
            				layout:'column',
            				anchor:"95%",
            				border:false,
            				items:[{
            					columnWidth:.3,
                 				layout: 'form',
                 				border:false,
                 				items:[{
                 					xtype:'textfield',
		            				fieldLabel:'服务名称',
		            				name:'name',
		            				anchor:"95%",
		            				readOnly:true
                 				},{
                 					xtype:'textfield',
		            				fieldLabel:'服务类型',
		            				name:'businessCode',
		            				anchor:"95%",
		            				readOnly:true
                 				},{
                 					xtype:'textfield',
		            				fieldLabel:'激活状态',
		            				name:'isActive',
		            				anchor:"95%",
		            				readOnly:true
                 				},{
                 					xtype:'textfield',
		            				fieldLabel:'基础费用',
		            				name:'basicsCost',
		            				anchor:"95%",
		            				readOnly:true
                 				},{
                 					xtype:'textfield',
		            				fieldLabel:'时间限制',
		            				name:'timeLimit',
		            				anchor:"95%",
		            				readOnly:true
                 				},{
                 					xtype:'textfield',
		            				fieldLabel:'里程限制',
		            				name:'milesLimit',
		            				anchor:"95%",
		            				readOnly:true
                 				},{
                 					xtype:'textfield',
		            				fieldLabel:'超时计价时间单位',
		            				name:'timeUnit',
		            				anchor:"95%",
		            				readOnly:true
                 				},{
                 					xtype:'textfield',
		            				fieldLabel:'超时计价价格单位',
		            				name:'priceUnit',
		            				anchor:"95%",
		            				readOnly:true
                 				}]
                 			}]
            			})
            			var costForm = new Ext.FormPanel({
            				title:'费用信息',
            				id: "costForm_"+record.data.businessId,
            				//store: businessTripDetailStore,
            				labelAlign:'right',
            				labelWidth:100,
            				listeners:{
                                mouseover:function(e){
                                    e.stopEvent()
                                },
                                mousedown:function(e){
                                    e.stopEvent()
                                }
                           },
                           layout:"form",
			                frame:true,
			                items:[cost]
			            })
            			var tb = new Ext.TabPanel({
                        	activeItem:0,
                        	items:[orderForm, tripForm, costForm],
                        	renderTo:"activityExpand_"+record.data.businessId,
                        	height:270
                        })
                		businessTripDetailStore.load({
                			params:{businessId: activityId},
                			callback:function(){
                				if(businessTripDetailStore.getCount()>0){
                					var record = businessTripDetailStore.getAt(0);
                					record.data.requestType = userRequestTypeStore.query("key",record.data.requestType).itemAt(0).data.msg;
                					record.data.status = statusStore.query("key",record.data.status).itemAt(0).data.msg;
                					record.data.rideSelf = isRideSelfStore.query("key",record.data.rideSelf).itemAt(0).data.msg;
                					record.data.createTime = new Date(record.data.createTime).format("Y-m-d H:i:s");
                					record.data.endTime = new Date(record.data.endTime).format("Y-m-d H:i:s")
                					record.data.busServiceInfo.basicsCost = record.data.busServiceInfo.basicsCost + '元';
                					record.data.busServiceInfo.timeLimit = record.data.busServiceInfo.timeLimit + '分';
                					record.data.busServiceInfo.milesLimit = record.data.busServiceInfo.milesLimit + '米';
                					record.data.busServiceInfo.timeUnit = record.data.busServiceInfo.timeUnit + '分';
                					record.data.busServiceInfo.priceUnit = record.data.busServiceInfo.priceUnit + '元';
                					record.data.busServiceInfo.businessCode =businessCodeStore.query("k",record.data.busServiceInfo.businessCode).itemAt(0).data.v;
                					orderForm.getForm().loadRecord(record);
                					tripForm.getForm().loadRecord(record);
                					costForm.getForm().setValues(record.data.busServiceInfo);
			                		
                				}
                			}
                		});
                		
                		
                	}
                 	
                }
            })
            //列模型
            var columnModel = new Ext.grid.ColumnModel([
          		expander,
                new Ext.grid.RowNumberer(),
                {header:"业务流水号", dataIndex:"businessId", width:200},
                {header:"订单ID", dataIndex:"orderId", width:230},
                {header:"订单状态", dataIndex:"status", renderer:function(v){
                	var status = statusStore.query('key', v).itemAt(0);
                	return status.data.msg;
                }},
                {header:"司机姓名", dataIndex:'driverName'},
                {header:"司机手机号", dataIndex:'phoneNumber'},
                {header:"下单人姓名", dataIndex:'userName'},
                {header:"下单人手机号", dataIndex:'userPhone'},
                {header:"乘客姓名", dataIndex:'passengerName'},
                {header:"乘客手机号", dataIndex:'passengerPhone'},
                {header:"乘客手机号", dataIndex:'passengerPhone'},
                {header:"是否超时", dataIndex:'isOverTime'},
                {header:"订单费用", dataIndex:'serviceFee',renderer:function(v){
                	return v+'元'
                }},
                {
                    header: '操作', dataIndex: 'operations', xtype: 'uxactioncolumn', items: [{
                        text: '取消',
                        iconCls: 'icon-remove',
                        tooltip: '取消行程',
                        handler: function (grid, rowIndex, columnIndex) {
                            var record = grid.getStore().getAt(rowIndex),
                            	status = record.data.status;
                            	if (status == 20) {
                            		Ext.Msg.confirm('提示', '确认取消订单？', function (btn) {
		                                if (btn == 'yes') {
		                                    Ext.Msg.wait('正在取消行程...', '请稍候')
		                                    Ext.Ajax.request({
		                                        url: basePath + 'businessServiceInfo/cancel',
		                                        params: {
		                                            driverId: record.data.driverId,
		                                            businessId:record.data.businessId
		                                        },
		                                        success: function (response, request) {
		                                            Ext.Msg.hide()
		                                            var data = Ext.decode(response.responseText)
		                                            if (data.success == false||data.t == false) {
		                                                messageWindow({
		                                                    message: '取消行程失败 '+data.errorMsg
		                                                })
		                                            } else {
		                                            	messageWindow({
		                                            		message: "行程已取消"
		                                            	})
		                                                grid.getStore().reload()
		                                            }
		                                        },
		                                        failure: function () {
		                                            Ext.Msg.hide()
		                                            messageWindow({
		                                                message: '取消行程失败'
		                                            })
		                                        }
		                                    })
		                                }
		                            })
                            	} else {
                            		var msg = statusStore.query('key', status).itemAt(0).data.msg;
                            		messageWindow({
                                        message: '该订单处于'+msg+'状态，不能取消'
                                    })
                            	}
                        },
		                getClass:function(v, obj, r){
		                	if(r.data.status==20){
		                		//console.log('有取消按钮');
		                	}else{
		                		//console.log('隐藏取消按钮');
		                		//return 'x-hidden';
		                	}
		                }
                    }]
                } 
            ])
            
            //search 面板
            var searchPanel = new Ext.form.FormPanel({
                region:"west",
                width:250,
                bodyStyle:"padding-top:20px",
                layout:"form",
                collapsible:true,
                frame:true,
                defaults:{
                    anchor:"95%"
                },
                labelAlign:'right',
                labelWidth:85,
                items:[{
                    xtype:"textfield",
                    name:"like#driverName",
                    fieldLabel:"司机姓名"
                 },{
                    xtype:"textfield",
                    name:"like#phoneNumber",
                    fieldLabel:"司机手机号"
                 },{
                    xtype:"textfield",
                    name:"like#userName",
                    fieldLabel:"下单人姓名"
                 },{
                    xtype:"textfield",
                    name:"like#userPhone",
                    fieldLabel:"下单人手机号"
                 },{
                    xtype:"textfield",
                    name:"like#passengerName",
                    fieldLabel:"乘客姓名"
                 },{
                    xtype:"textfield",
                    name:"like#passengerPhone",
                    fieldLabel:"乘客手机号"
                 },{
                    xtype:"combo",
                    hiddenName:"int@eq#bs.businessCode",
                    fieldLabel:"服务类型",                
                    store:businessCodeStore,
                    displayField:"v",
                    valueField:"k",
                    triggerAction:"all",
                    mode:"local",
                    editable:false
                 },{
                    xtype:"combo",
                    hiddenName:"int@eq#bs.requestType",
                    fieldLabel:"请求类型",                
                    store:userRequestTypeStore,
                    displayField:"msg",
                    valueField:"key",
                    triggerAction:"all",
                    mode:"local",
                    editable:false
                 },{
                    xtype:"combo",
                    hiddenName:"boolean@eq#bs.isRideSelf",
                    fieldLabel:"用车类型",                
                    store:isRideSelfStore,
                    displayField:"msg",
                    valueField:"key",
                    triggerAction:"all",
                    mode:"local",
                    editable:false
                 },{
                    xtype:"combo",
                    hiddenName:"int@eq#bs.status",
                    fieldLabel:"订单状态",                
                    store:statusStore,
                    displayField:"msg",
                    valueField:"key",
                    triggerAction:"all",
                    mode:"local",
                    editable:false
                 },{
                    xtype:"textfield",
                    name:"like#businessId",
                    fieldLabel:"业务流水号"
                 },{
                    xtype:"textfield",
                    name:"like#bs.orderId",
                    fieldLabel:"订单ID"
                 }],
                 buttonAlign:"center",
                 buttons:[{
                    text:"查询",
                    iconCls:"icon-search",
                    handler:function(){
                        if(searchPanel.getForm().isValid()){
                            var data = searchPanel.getForm().getValues(false)
                            businessTripStore.baseParams = data;
                            businessTripStore.load({
				    		 	params:{
				    		 		start: 0,
				    		 		limit: pageSize,
				    		 		'boolean@eq#isValidate': true
				    		 	}
				    		})  
                        }
                    }
                 },{
                    text:"重置",
                    iconCls:"icon-reset",
                    handler:function(){
                        searchPanel.getForm().reset();
                        businessTripStore.baseParams = {};
                        businessTripStore.load({
			    		 	params:{
			    		 		start: 0,
			    		 		limit: pageSize,
			    		 		'boolean@eq#isValidate': true
			    		 	}
			    		}) 
                    }
                 }]
            })
            
            
            //可编辑列表
            var grid = new Ext.grid.EditorGridPanel({
                store:businessTripStore,
                cm:columnModel,
                loadMask:true,
                enableHdMenu:false,
                sm:new Ext.grid.RowSelectionModel(),
                plugins:[expander],
                region:"center",
                listeners:{
                    afteredit:function(e){
                        var record = e.record
                        if(record.isValid()){
                            var data = record.data
                            Ext.Ajax.request({
                                url:basePath+"busService/update",
                                params:data,
                                success:function(response,request){
                                    var data = Ext.decode(response.responseText)
                                    if(data.success){
                                        record.commit()
                                    }else{
                                        record.reject()
                                        messageWindow({
                                            message:data.errorMsg
                                        })
                                    }
                                },failure:function(){
                                    record.reject()
                                }
                            })
                        }
                    }
                },
                sm:new Ext.grid.RowSelectionModel(),
                viewConfig:{
                    forceFit:false, //值为false，可以给给一列设置宽度， 超过时出现滚动条
                    emptyText:"没有数据"
                },
               	bbar: new Ext.PagingToolbar({
                    pageSize: pageSize,
                    store: businessTripStore,
                    beforePageText: '第',
                    afterPageText: '页,共{0}页',
                    lastText: '尾页',
                    nextText: '下一页',
                    prevText: '上一页',
                    firstText: '首页',
                    refreshText: '刷新页面',
                    displayInfo: true,
                    displayMsg: '显示第{0}条到{1}条记录,一共{2}条',
                    emptyMsg: '没有记录'
                })
            })
            
            //窗口
            win = desktop.createWindow({
                    id: 'BUSINESSTRIP-win',
                    listeners:{
                        close:function(){
                           
                        }
                    },
                    title:'业务行程查看',
                    height:500,
                    items:[grid,searchPanel],
                    iconCls: 'icon-businessTrip',
                    shim:false,
                    animCollapse:false,
                    constrainHeader:true,
                    layout: 'border'
                });
            }
            win.show();
    }
});
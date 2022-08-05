; (function ($, window, document, undefined) {
    "use strict";
    /**
     * Default treeview  options.
     */
    let treeName = "treeview",
        defaults = {
            expandIcon: 'fa fa-angle-down',
            collapseIcon: 'fa fa-angle-right',
            indent: 1.25
        };
    /**
     * treeview HTML templates.
     */
    let templates = {
        treeview: '<div class="treeviewTest"></div>',
        treeviewItem: '<div href="#itemid" class="list-group-item" data-toggle="collapse"></div>',
        treeviewSpan: '<span contenteditable="true" class="text-nowrap"></span>',
        treeviewAddButton: '<button type="button" popup-name="popup-add" class="btn btn-default border float-right addItem">'
        + '<i class="fa fa-plus"></i></button>',
        treeviewDeleteButton: '<button type="button" popup-name="popup-delete" class="btn btn-default border float-right mr-2 deleteItem">'
        + '<i class="fa fa-minus"></i></button>',
        treeviewGroupItem: '<div class="list-group collapse" id="itemid"></div>',
        treeviewItemStateIcon: '<i class="state-icon"></i>',
        treeviewItemIcon: '<i class="item-icon"></i>'
    };
    

    /**
     *  constructor.
     * @param {*} element 
     * @param {*} options 
     */
    function treeview(element, options) {
        this.element = element;
        this.itemIdPrefix = element.id + "-item-";
        this.settings = $.extend({}, defaults, options);
        this.contentOld = {};
        this.init();
    }


    /**
     * Tree View
     */
    $.extend(treeview.prototype, {
        /**
         * treeview intialize.
         */
        init: function () {
            this.tree = [];
            this.nodes = [];
            // Retrieve treeview Json Data.
            if (this.settings.data) {
//                this.settings.data = $.parseJSON(this.settings.data);
                this.tree = $.extend(true, [], this.settings.data);
                delete this.settings.data;
            }
            // Set main treeview class to element.
            $(this.element).html('');
            $(this.element).addClass('treeviewTest');

            this.initData({nodes: this.tree});
            let _this = this;
            this.build($(this.element), this.tree, 0);
            // Update angle icon on collapse
            $('.treeviewTest').on('click', '.list-group-item .state-icon', function () {
                console.log();
                $(this)
                    .toggleClass(_this.settings.expandIcon)
                    .toggleClass(_this.settings.collapseIcon);
                $(this).parent().next()
                    .toggleClass('list-group')
                    .toggleClass('list-group collapse');
            });
            $('.treeviewTest .list-group-item').on('click', '.deleteItem, .addItem', function () {
                let popupName = $(this).attr('popup-name');
                $('[popup-name="' + popupName + '"], [popup-name="' + popupName + '"] .modal-dialog').css('display', 'block');
                if ($(this).hasClass('deleteItem')) {
                    $("#rmv-btn").attr('data-itm-id' , $(this).attr('data-itm-id'));  
                    $("#rmv-btn").attr('data-itm-pid' , $(this).attr('data-itm-pid')); 
                    $('#counter').each(function() {
                        $(this).prop('Counter', 0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 20000,
                            easing: 'swing',
                            step: function(now) {
                                $(this).text(20 - Math.ceil(now));
                            },
                            complete: function() {
                                $('[popup-name="' + popupName + '"]').find('.cancel').click();
                            } 
                        });
                    }); 
                } else {
                    $("#parent_item").val($(this).attr('data-itm-id'));    
                }
            });

            $('[contenteditable="true"]').on('mousedown, focus',(function (e) {
                e.stopPropagation();           
                let elementId = $(this).parent().attr('href');
                _this.contentOld[elementId] = $(this).html();       
                $(this).bind('keydown', function(e) {  
                    let itemName = $(this).html();           
                    if(e.keyCode == 27) {
                        e.preventDefault();
                        $(this).html(_this.contentOld[elementId]);	
                    }
                    if(e.keyCode == 13 && itemName != '') {
                        $(this).blur();
                    }
                });
            }))
            .blur(function (e) {
                let itemId = $(this).parent().attr('href');                       
                let itemName = $(this).html();       
                e.stopImmediatePropagation();
                if (itemName != '' && itemName != _this.contentOld[itemId]) {    
                    _this.savedata(itemId, itemName, e); 
                }
             });
        
        },
        /**
         * Initialize treeview Data.
         * @param {*} node 
         */
        initData: function (node) {
            if (!node.nodes) return;
            let parent = node;
            let _this = this;
            $.each(node.nodes, function checkStates(index, node) {

                node.nodeId = _this.nodes.length;
                node.parentId = parent.nodeId;
                _this.nodes.push(node);

                if (node.nodes) {
                    _this.initData(node);
                }
            });
        },

        /**
         * Build treeview.
         * @param {*} parentElement 
         * @param {*} nodes 
         * @param {*} depth 
         */
        build: function (parentElement, nodes, depth) {
            let _this = this;
            // Calculate item padding.
            let leftPadding = "1.25rem;";
            if (depth > 0) {
                leftPadding = (_this.settings.indent + depth * _this.settings.indent).toString() + "rem;";
            }
            depth += 1;
            // Add each node and sub-nodes.
            $.each(nodes, function addNodes(id, node) {
                // Main node element.
                let treeItem = $(templates.treeviewItem)
                    .attr('href', node.id)
                    .attr('style', 'padding-left:' + leftPadding);
                // Set Expand and Collapse icones.
                if (node.nodes.length > 0) {
                    let treeItemStateIcon = $(templates.treeviewItemStateIcon)
                        .addClass(_this.settings.collapseIcon);
                    treeItem.append(treeItemStateIcon);
                }
                // Set node Text.

                let treeviewSpan = templates.treeviewSpan;
                if (parseInt(node.id) === 0) {
                    treeviewSpan = treeviewSpan.replace('contenteditable="true"', '');
                }    
                let treeviewSpanText = $(treeviewSpan).append(node.text);
                treeItem.append(treeviewSpanText);
                // set node buttons add and delete
                let treeItemAddButton = $(templates.treeviewAddButton)
                    .attr('data-itm-id', node.id)
                    .attr('data-itm-pid', node.pid);
                treeItem.append(treeItemAddButton);
                if (node.id > 0) {
                    let treeItemDeleteButton = $(templates.treeviewDeleteButton)
                    .attr('data-itm-id', node.id);
                    treeItem.append(treeItemDeleteButton);
                }    

                // Attach node to parent.
                parentElement.append(treeItem);
                // Build child nodes.
                if (node.nodes.length > 0) {
                    // Node group item.
                    let treeGroup = $(templates.treeviewGroupItem);
                    parentElement.append(treeGroup);
                    _this.build(treeGroup, node.nodes, depth);
                }
            });
        },

        savedata: function (itemId, itemName, event) {   
            $.ajax({
                url: 'edit.php',                           
                type: 'POST',
                data: {
                    item_name: itemName, 
                    item_id: itemId
                },				
                success:function (data) { 
                    if (data == itemName) {                                                                      
                        $('#' + itemId).html(data);
                        event.stopPropagation();
                        alert('Данные успешно сохранены:' + data); 
                    }
                }
            });
        } 

    });

    $.fn[treeName] = function (options) {
        return this.each(function () {
            console.log($(this).html());
            //if (!$.data(this, treeName)) {
                $.data(this, treeName, new treeview(this, options));
            //}
        });
    };
})(jQuery, window, document);

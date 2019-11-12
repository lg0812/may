/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('csslineheight', function(K) {
	var self = this, name = 'csslineheight';
	self.clickToolbar(name, function() {
		var curVal = '', commonNode = self.cmd.commonNode({'*' : '.line-height'});
		if (commonNode) {
			curVal = commonNode.css('line-height');
		}
		var menu = self.createMenu({
			name : name,
			width : 150
		});
		K.each([
			{'1' : '单倍行高'},
			{'1.5' : '1.5倍行高'},
			{'2' : '2倍行高'},
			{'2.5' : '2.5倍行高'},
			{'3' : '3倍行高'}
		], function(i, row) {
			K.each(row, function(key, val) {
				menu.addItem({
					title : val,
					checked : curVal === key,
					click : function() {
						self.cmd.toggle('<span style="display: inline-block; line-height:' + key * 16 + 'px;"></span>', {
							p : '.line-height=' + key * 16 + 'px'
						});
						self.updateState();
						self.addBookmark();
						self.hideMenu();
					}
				});
			});
		});
	});
});

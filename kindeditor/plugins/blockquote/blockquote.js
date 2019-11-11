KindEditor.plugin('blockquote', function (K) {
  var self = this, name = 'blockquote';
  self.clickToolbar(name, function () {
    var html = '<div style="padding:20px;">' +
        '<div class="ke-dialog-row"">' +
          '<label for="keType" style="width:60px;">' + '颜色' + '</label>' +
          '<select id="keType" class="ke-code-type" name="type">' +
            '<option value="64, 158, 255">Primary</option>'+
            '<option value="103, 194, 58">Success</option>'+
            '<option value="230, 162, 60">Warning</option>'+
            '<option value="245, 108, 108">Danger</option>'+
            '<option value="144, 147, 153">Info</option>'+
          '</select>' +
        '</div>' +
        '<div class="ke-dialog-row">' +
          '<label for="keTextarea" style="width:60px;">' + '文本' + '</label>' +
          '<textarea id="keTextarea" style="width: 408px; height: 200px;" class="ke-blockquote"></textarea>' +
        '</div>' +
      '</div>',

      dialog = self.createDialog({
        name: name,
        width: 450,
        title: self.lang(name),
        body: html,
        yesBtn: {
          name: self.lang('yes'),
          click: function (e) {
            var type = K('.ke-code-type', dialog.div).val();
            var code = textarea.val();
            code = code.replace(/\r\n|\n/g, '<br />')
            var html = '<div style="padding: 5px 10px; border-radius: 5px; border-left: 4px solid rgb(' + type + '); background: rgba(' + type + ', .2)" >' + code + '</div>';

            if (K.trim(code) === '') {
              alert('不能为空');
              textarea[0].focus();
              return;
            }

            self.insertHtml(html).hideDialog().focus();
          }
        }
      }),

    textarea = K('.ke-blockquote', dialog.div);
    textarea[0].focus();
  });
});
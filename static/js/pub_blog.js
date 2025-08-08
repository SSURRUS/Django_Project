window.onload = function () {
    const {createEditor, createToolbar} = window.wangEditor

    const editorConfig = {
        placeholder: 'Type here...',
        onChange(editor) {
            const html = editor.getHtml()
            console.log('editor content', html)
            // 也可以同步到 <textarea>
        },
    }

    const editor = createEditor({
        selector: '#editor-container',
        html: '<p><br></p>',
        config: editorConfig,
        mode: 'default', // or 'simple'
    })

    const toolbarConfig = {}

    const toolbar = createToolbar({
        editor,
        selector: '#toolbar-container',
        config: toolbarConfig,
        mode: 'default', // or 'simple'
    })

    $("#submit-btn").click(function (event) {
       event.preventDefault();//阻止默认的行为

        let title=$("input[name=title]").val();
        let category=$("#category-select").val();
        let content=editor.getHtml();
        let csrftoken=$("input[name=csrfmiddlewaretoken]").val();
        $.ajax('/blog/blog', {
            method: 'POST',
            data: {title,category,content,csrfmiddlewaretoken},
            success: function (result) {
                if (result['code'==200]) {
                    //获取博客id
                    let blog_id=result['data']['blog_id']
                    window.location='/blog/detail/'+blog_id
                }
                else {
                    alert(result['message']);
                }
            }
        })

    });

}
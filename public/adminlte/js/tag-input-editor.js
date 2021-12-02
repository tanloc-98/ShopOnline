$(document).ready(function () {
    tagInputColor()
    tagInputSize()
});
function tagInputColor() { 
    $('input[name="color"]').tagEditor({
        initialTags: [],
        placeholder: "Enter Product Color...",
        beforeTagDelete: function(field, editor, tags, val) {
            var q = confirm('Remove color "' + val + '"?');
            return q;
        }
    });
}

function tagInputSize() { 
    $('input[name="size"]').tagEditor({
        initialTags: [],
        placeholder: "Enter Product Size...",
        beforeTagDelete: function(field, editor, tags, val) {
            var q = confirm('Remove color "' + val + '"?');
            return q;
        }
    });
}
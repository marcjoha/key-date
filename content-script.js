function insertAtCaret(element, text) {
	if (element.tagName == "IFRAME") {
		element = element.contentDocument.activeElement;
	}

  if (document.selection) {
    element.focus();
    var sel = document.selection.createRange();
    sel.text = text;
    element.focus();
  } else if (element.selectionStart || element.selectionStart === 0) {
    var startPos = element.selectionStart;
    var endPos = element.selectionEnd;
    var scrollTop = element.scrollTop;
    element.value = element.value.substring(0, startPos) + text + element.value.substring(endPos, element.value.length);
    element.focus();
    element.selectionStart = startPos + text.length;
    element.selectionEnd = startPos + text.length;
    element.scrollTop = scrollTop;
  } else {
    element.value += text;
    element.focus();
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) { 
    insertAtCaret(document.activeElement, request.content);
});
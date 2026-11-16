function checkMaxLength(taText, l)
{
	if (taText.value.length > l)
	{
		//alert('Comments must be under ' + l + ' characters');
		var len = taText.value.length;
		taText.value = taText.value.substr(0, l);
                return false;
		// taText.blur();
	}
	return true;
}

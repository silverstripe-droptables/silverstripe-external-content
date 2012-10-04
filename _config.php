<?php

Director::addRules(100, array(
	'extadmin' => 'ExternalContentAdmin',
	'extcon' => 'ExternalContentPage_Controller',
));

Object::add_extension('HtmlEditorField_Toolbar', 'ExternalContentHtmlEditorExtension');

set_include_path(dirname(__FILE__).'/thirdparty'.PATH_SEPARATOR.get_include_path());
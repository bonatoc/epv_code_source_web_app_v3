/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config



	config.toolbar = [
		// { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
		// { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		/*
		{ name: 'editing', 
		groups: [ 
		'find', 
		'selection', 
		// 'spellchecker' 
		], 
		items: 
		[ 
		'Find', 
		'Replace', 
		// '-', 'SelectAll', '-', 'Scayt' 
		] },
		*/
		// { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
		// '/',
		{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
		
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
		
		'/',
		
		{ name: 'paragraph', groups: [ 
		'list', 
		'indent', 
		'blocks', 
		'align', 
		'bidi' 
		], 
		items: [ 
		// 'NumberedList', 
		'BulletedList',
		/*
		'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' 
		*/
		] },
		
		
		
		// '/',
		{ 
			name: 'links', items: [ 
			'Link', 'Unlink', 
			// 'Anchor' 
			] 
		},
			
		// { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
		// { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
		{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
		{ name: 'others', items: [ '-' ] },
		{ name: 'editing', 
		groups: [ 
		'find', 
		'selection', 
		// 'spellchecker' 
		], 
		items: 
		[ 
		'Find', 
		'Replace', 
		// '-', 'SelectAll', '-', 'Scayt' 
		] },
		
		// { name: 'about', items: [ 'About' ] }
	];



	// Toolbar groups configuration.
	config.toolbarGroups = [
		// { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		// { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 
		'find', 
		// 'selection', 
		// 'spellchecker' 
		] },
		// { name: 'forms' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'links' },
		{ name: 'insert' },
		'/',
		{ name: 'styles' },
		// { name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		// { name: 'about' }
	];



	// The toolbar groups arrangement, optimized for two toolbar rows.
	
	
	
	// config.toolbarGroups = [
	// 		// { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
	// 		// { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
	// 	
	// 	// { name: 'insert' },
	// 	
	// 		// { name: 'forms' },
	// 		// { name: 'tools' },
	// 		
	// 	// SOURCE CODE, ONLY FOR INTRANET LOGGED ADMINS
	// 	// { name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
	// 	// - EOF - SOURCE CODE, ONLY FOR INTRANET LOGGED ADMINS
	// 	
	// 	{ name: 'styles' },
	// 	
	// 	'/',
	// 	
	// 	{ 
	// 		name: 'basicstyles', 
	// 		groups: [ 'basicstyles', 'cleanup' ], 
	// 		// items: [ 'Bold', 'Italic', '-', 'RemoveFormat' ] 
	// 	},
	// 	
	// 	{ 
	// 		name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ]
	// 	},
	// 	
	// 	// { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
	// 	
	// 	
	// 	{ name: 'others' },
	// 	
	// 	{ name: 'links' },
	// 	
	// 	
	// 	// { name: 'colors' },
	// 	
	// 		// { name: 'about' }
	// ];
	
	
	
	
	
	

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript,Strike,Styles,Font,FontSize,Anchor'; //'Styles', 'Format', 'Font', 'FontSize' ]

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;h4;h5;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};

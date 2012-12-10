# Formwin - form styles for IE8+

Formwin styles form elements in IE8+ mainly via CSS and spiced up with a little jQuery.<br>
Contrary to [Uniform](https://github.com/pixelmatrix/uniform) - which was used as a starting point - Formwin requires a clean HTML structure and only adds interactivity features via JS.<br> 
Usually this means wrapping inputs and selects in a &lt;label&gt; and prepending them with a &lt;span&gt; like this:

	<label for="yourinput">
		<span>Label Text</span>
		<input type="text" name="yourinput" id="yourinput">
	</label>

## Demo

For a demo check out the [project page on GitHub](http://rocco.github.com/formwin/).

## Main Features

- markup-driven, CSS heavy
- JS does not change DOM
- semantically correct HTML (required)
- accessible
- IE8+ round corners on input[type=text] and textareas with just one image per state
- IE8+ placeholder attribute support on input[type=text] and textarea
- uniform sprite image compatible (but Formwin uses a bigger one for buttons)
- positive/negative styles on text inputs and buttons
- 4 default label positions: above, right, below and left

## Usage

- make sure you are using jQuery on your site (1.7+ recommended)
- output your HTML accordingly, see below
- link Formwin's CSS files and JS file in &lt;head&gt; of your page
- execute Formwin's init() to activate form element's class changes when document ready
- if you use predefined label positions (above, right, below, left), also execute fixlabels()

### HTML Head Section
Example &lt;head&gt; section (you should combine/compress those css files):

	<link rel="stylesheet" type="text/css" href="formwin/css/formwin-base.css">
	<link rel="stylesheet" type="text/css" href="formwin/css/formwin-sprite.css">
	<link rel="stylesheet" type="text/css" href="formwin/css/formwin-theme.css">
	
	<script src="formwin/js/jquery.formwin.js"></script>

### Library Execution

Call Formwin's init() function:

	$.formwin.init();

If you use Formwin's label positions (above, right, below, left) then you want to fix label positions too:

	$.formwin.fixlabels();

Example &lt;head&gt; section

	<script>
		$(document).ready(function(){
			$.formwin.init();
			$.formwin.fixlabels();
		});
	</script>
### Parameters

You can pass in the following parameters to Formwin's init() function:

	$.formwin.init({
		
		// default is all labels, can be something like '.formwin' to get a jQuery selector like 'label.formwin'
		formWinClassSel: '',
			
		// elements within labels that are matched
		formWinSelector: 'select, textarea, input[type=text], input[type=checkbox], input[type=radio], input[type=button]',
			
		// CSS class for active elements
		activeClass: 'active',
			
		// CSS class for elements with focus
		focusClass: 'focus',
			
		// CSS class for hovered elements
		hoverClass: 'hover',
			
		// CSS class for disabled elements
		disabledClass: 'disabled',
			
		// CSS class for checked elements
		checkedClass: 'checked',
			
		// color of placeholder text
		placeholderColor: 'gray',
			
		// theme-dependent value to calculate widths of div.selectedvalue
		// = width of :before + width of padding-right, both of .selectedvalue divs
		selectedvalueBorders: 10 + 36,
			
		// path to formwin img folder
		imagePath: ''
		
	});

You might alternatively specify global defaults by using the "defaults" property.

	$.formwin.defaults.disabledClass = 'myDisabledClass';

_This needs to be set before $.formwin.init();_

## HTML Markup Structure

&lt;input type="text"&gt;

	<label class="formwintexts">
		<span>Label Text</span>
		<input type="text" name="yourinput">
	</label>

&lt;textarea&gt;

	<label for="textarea1" class="formwintexts">
		<span>Label Text</span>
		<textarea id="textarea1" name="textarea1">textarea text</textarea>
	</label>

&lt;select&gt;

	<label for="select1">
		<div class="selectedvalue"></div>
		<select id="select1" name="select1">
			<option value="0">One</option>
			<option value="1">Two</option>
			<option value="2">Three</option>
		</select>
	</label>

&lt;input[type=checkbox]&gt;

	<label for="check1">
		<div class="checkedvalue"></div>
		<input type="checkbox" id="check1" name="check1" value="check1">
	</label>

&lt;input[type=radio]&gt;

	<label for="radio1">
		<div class="radiovalue"></div>
		<input type="radio" name="radiogroup" id="radio1" value="radio1">
	</label>
	<label for="radio2">
		<div class="radiovalue"></div>
		<input type="radio" name="radiogroup" id="radio2" value="radio2">
	</label>

&lt;input[type=button]&gt;

	<div class="formwinbutton">
		<input type="button" id="button1" value="Input Button">
	</div>
	
&lt;input[type=submit]&gt;

	<div class="formwinbutton">
		<input type="submit" id="submit1" value="Submit Button">
	</div>
	

# Customization

Formwin's CSS is separated into three files to encapsulate different concerns. 
You probably need to change formwin-sprite.css when you change the sprite image and it's sizes (img/formwin-sprite-default.png) and formwin-theme.css to change colors, fonts etc. _Those CSS files should be combined/compressed in production systems, usually along with other CSS files._

Please set form element sizes via CSS directly on the elements as you would normally do. Dynamic resizing after $.formwin.init() works too. The only exception is &lt;select&gt;s where you would have to resize the div.selectedvalue instead of the &lt;select&gt; tag after $.formwin.init().

# Tips & Tricks

When generating your output, you can directly output Formwin action classes on either the &lt;label&gt;s or &lt;div&gt;s around your form elements to help faster rendering. If you for example output a disabled checkbox, then add the "disabled" class like this:

	<label for="checkone" class="disabled">
		<span>Disabled Checkbox</span>
		<div class="checkedvalue"></div>
		<input type="checkbox" id="checkone" name="checkone" value="checkone" disabled="disabled">
	</label>

For a disabled button this looks like this:

	<div class="formwinbutton disabled">
		<input type="button" id="buttonone" value="Disabled Input Button" disabled="disabled">
	</div>

Use your browser's inspector tools to see what is going on under the hood.

## Q&A

Q: Why did you build yet another yada yada lib...?<br>
A: Nothing else did what I needed, namely:

- I control my markup, don't mess with it
- CSS only/-heavy styling and fast rendering
- positive/negative/custom colors on text inputs and buttons
- no IE7 support needed
- everything mentioned under Main Features above

Q: Why do you not contribute this back to Uniform?<br>
A: This was initially planned, but meanwhile Formwin follows a fundamentally different approach/concept/structure. I practically rebuilt the whole thing from scratch using some CSS rules and JS functions from [Uniform](https://github.com/pixelmatrix/uniform).

Q: Why do you _erroneously_ write "function(){ ... }" instead of "function () { ... }" in JS?<br>
A: I hate useless whitespace and use syntax coloring, please try to deal with it.

Q: Why do you indent with TABS instead of SPACES?<br>
A: ...

## License

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)

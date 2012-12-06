# Formwin - form styles for IE8+

Formwin styles form elements in IE8+ mainly via CSS and spiced up with a little jQuery.<br>
Contrary to [Uniform](https://github.com/pixelmatrix/uniform) (which was used as a starting point) this lib requires a certain HTML structure and only adds interactivity features via JS.<br> 
Usually this means wrapping inputs and selects in a &lt;label&gt; and prepending them with a &lt;span&gt; like this:

	<label>
		<span>Label Text</span>
		<input type="text" name="yourinput">
	</label>

## Main Features

- markup- and CSS driven, JS does not change DOM
- semantically correct HTML is required
- input[type=text] and textarea styling for IE8+ with just one image per state
- input[type=text] and textarea placeholder text support for IE8+
- uniform sprite image compatible (but Formwin uses a bigger one for buttons)
- positive/negative styles on text inputs and buttons
- 4 default label positions: above, right, below and left

## Q&A

Q: Why did you build yet another yadda yadda ...?<br>
A: Nothing else did what I needed, namely:

- IE8+ round corners on input[type=text] and textareas
- IE8+ placeholder attribute support
- CSS only styling and fast rendering
- accessible, clean markup, possibly not changed via JS
- positive/negative styles on text inputs and buttons
- no IE7 support needed

Q: Why do you not contribute this back to Uniform?<br>
A: This was initially planned, but meanwhile Formwin follows a fundamentally different approach/concept/structure. I practically rebuilt the whole thing from scratch using CSS rules and JS functions from [Uniform](https://github.com/pixelmatrix/uniform).



## Installation

- make sure you are using jQuery on your site (1.8.2+ recommended)
- link Formwin stylesheet and main script in head of your page

Like this:

    <link rel="stylesheet" href="css/formwin.css" type="text/css" />
	<script src="js/jquery.formwin.js"></script>

## Usage

Structure your HTML as follows.

&lt;input type="text"&gt;:

	<label>
		<span>Label Text</span>
		<input type="text" name="yourinput">
	</label>

&lt;textarea&gt;:

	<label>
		<span>Label Text</span>
		<input type="text" name="yourinput">
	</label>

Call Formwin's init() function:

	$formwin.init();

If you use Formwin's label positions (above, right, below, left) then you want to fix label positions too:

	$formwin.fixlabels();

## Extra parameters

You can pass in extra parameters to Formwin:

	$formwin.init({
		param1: value,
	});

Alternately, you can specify global defaults by using the `defaults` property.

	$.formwin.defaults.checkedClass = "uniformCheckedClass";


# Customization

To edit the CSS of Uniform it is highly recommended to not edit the theme files, but to override them using CSS. Make sure your CSS file comes after the uniform theme css file in the HEAD section.

It's common to want to resize the selects or other elements. The best way is to set the width property on the div element, span element and the form element itself. Look through the theme CSS in the `PRESENTATION` section to see where the width property is currently set.

# Tips & Tricks



## License

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)

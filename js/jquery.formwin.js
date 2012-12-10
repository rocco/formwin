/*
Formwin - form styling ftw
Copyright © 2012 Rocco Georgi, PavingWays Ltd.
http://www.pavingways.com

Formwin is based on the awesome Uniform v1.8.0+f 
https://github.com/pixelmatrix/uniform (e590270767)
Copyright © 2009 Josh Pyles / Pixelmatrix Design LLC
http://pixelmatrixdesign.com

MIT License - http://www.opensource.org/licenses/mit-license.php
*/
/*jslint browser: true */
/*global jQuery */
(function($){
	"use strict";
	
	// globals
	$.formwin = {
		// Default options that can be overridden globally or when calling $.formwin.init()
		// globally: $.formwin.defaults.formWinClassSel = '.formwin';
		// on init : $.formwin.init({formWinClassSel: '.formwin'});
		defaults: {
			
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
			selectedvalueBorders: 10 + 36
		}
	};
	
	// privates
	var thisIsIE8 = false,
		imagesPreloaded = false,
		formwinHandlers = {
			
			// <select>
			select: function($el, options){
				// selected option value is displayed in a <div> above the element
				var 
					// here we put the selected option's html()
					$valueDiv = $('div.selectedvalue', $el.parent()),
					
					// updates value div's html() to html() of selected option
					valueUpdate = function(){
						$valueDiv.html(($el.find(":selected:first") || $el.find("option:first")).html());
						$el.parent().removeClass(options.activeClass);
					};
				
				// set width of valueDiv to that of the select minus options.selectedvalueBorders
				// result is that valueDiv is exactly as wide as the select before
				// problem here: widest option text is almost always cut off
				// solution: set select widths in CSS
				$valueDiv.width($el.width() - options.selectedvalueBorders);
				
				// set select width and height to 100% to fill entire valueDiv
				$el.width('100%').height('100%');
				
				// update to initially selected value
				valueUpdate();
				
				// bind update function to $el's change' event
				bindMany($el, {
					change: valueUpdate
				});
				
				// prevent text selection
				noSelect($valueDiv);
				
				return $el;
			},
			
			// <textarea>
			textarea: function(){
				preloadTextImages();
			},
			
			// <input type="check">
			checkbox: function($el, options){
				// selected option value is displayed in a <div> above the element
				var 
					$labelObj = $el.parent(),
					// updates value div's html() to html() of selected option
					valueUpdate = function(){
						if($el.is(':checked') === true){
							$labelObj.addClass(options.checkedClass);
						} else {
							$labelObj.removeClass(options.checkedClass);
						}
					};
				
				// update to initially selected value
				valueUpdate();
				
				// bind update function to $el's change' event
				bindMany($el, {
					"click touchend": valueUpdate
				});
			},
			
			// <input type="check">
			radio: function($el, options){
				// selected option value is displayed in a <div> above the element
				var 
					$labelObj = $el.parent(),
					
					// updates value div's html() to html() of selected option
					valueUpdate = function(){
						
						// only do this for the checked radio button out of the set with the same name
						if($el.is(':checked') === true){
							// deselect all radio buttons with $el's name (the whole set)
							$('input[name=' + $el.attr("name") + ']:radio').each(function(){
								$(this).parent().removeClass(options.checkedClass);
							});
							
							// check this radio button
							$labelObj.addClass(options.checkedClass);
						}
					};
				
				// update to initially selected value
				valueUpdate();
				
				bindMany($el, {
					"click touchend": function(){
						valueUpdate();
					}
				});
			}
		},
		
		// bind events
		bindMany = function($el, events){
			for(var name in events){
				if(events.hasOwnProperty(name)){
					$el.bind(name, events[name]);
				}
			}
		},
		
		// IE placeholder management
		showPlaceholder = function (elem, options){
			var pH = $(elem).attr('placeholder');
			
			if(typeof pH !== 'undefined' && pH !== ''){
				if(pH === $(elem).val()){
					$(elem).val('');
				}
				if($(elem).val() === ''){
					$(elem)
						.val(pH)
						.css('color', options.placeholderColor)
						.addClass('formwin-showplaceholder');
				}
			}
		},
		
		// image preloader
		preloadTextImages = function(){
			// return early on dejavu
			if(imagesPreloaded !== false){
				return true;
			}
			// preload images
			var preloadTextImages = [
				$('<img src="../img/formwin-input-active.png">'),
				$('<img src="../img/formwin-input-disabled.png">'),
				$('<img src="../img/formwin-input-focus.png">'),
				$('<img src="../img/formwin-input-hover.png">'),
				$('<img src="../img/formwin-input-negative-focus.png">'),
				$('<img src="../img/formwin-input-negative-hover.png">'),
				$('<img src="../img/formwin-input-negative.png">'),
				$('<img src="../img/formwin-input-normal.png">'),
				$('<img src="../img/formwin-input-positive-focus.png">'),
				$('<img src="../img/formwin-input-positive-hover.png">'),
				$('<img src="../img/formwin-input-positive.png">')
			];
			imagesPreloaded = true;
			
			return preloadTextImages;
		},
		
		// noSelect v1.0
		// avoids selection of text (esp. on touch devices)
		noSelect = function(elem){
			var f = function(){
				return false;
			};
			
			$(elem).each(function(){
				this.onselectstart = this.ondragstart = f; // Webkit & IE
				// .mousedown() for Webkit and Opera
				// .css for Firefox
				$(this).mousedown(f).css({
					MozUserSelect: "none"
				});
			});
		};
	
	
	// globals again
	
	/*
	 * adds action/state classes to divs/labels around buttons/inputs
	 * executes the formwinHandlers for matched elements
	 */
	$.formwin.init = function(options){
		options = $.extend({}, $.formwin.defaults, options);
		
		// IE6/7 can't/won't be styled, only IE8+ is taken care of
		if($.browser.msie){
			if($.browser.version < 8){
				// do nothing for IE < 8
				return false;
			} else if($.browser.version < 9){
				thisIsIE8 = true;
			}
		}
		
		// apply Formwin to all divs with class button
		$('div.formwinbutton').each(function(){
			var elDiv = this;
			
			// set disabled class
			if($('input, button', this).is(':disabled') === true){
				$(elDiv).addClass(options.disabledClass);
			} else {
				$(elDiv).removeClass(options.disabledClass);
			}
			
			// trigger classes on contained inputs and buttons
			$('input, button', this).focus(function(){
				// add focus class
				$(elDiv).addClass(options.focusClass);
			}).blur(function(){
				// remove focus class
				$(elDiv).removeClass(options.focusClass);
				$(elDiv).removeClass(options.activeClass);
			}).on('mouseenter', function(){
				$(elDiv).addClass(options.hoverClass);
			}).on('mouseleave', function(){
				$(elDiv).removeClass(options.hoverClass);
				$(elDiv).removeClass(options.activeClass);
			}).on('keydown mousedown touchbegin', function(){
				$(elDiv).addClass(options.activeClass);
			}).on('keyup mouseup touchend', function(){
				$(elDiv).removeClass(options.activeClass);
			});
		});
		
		// also apply Formwin to all form elements with a label matching the options.formWinClassSel(ector)
		$('label' + options.formWinClassSel).each(function(){
			var 
				tagName = '',
				handlerName = '',
				elLabel = this;
			
			// for each possible match in options.formWinSelector
			$(this).children(options.formWinSelector).each(function(){
				
				// get actual tag name of $(this) ... we use a multi-selector
				tagName = $(this)[0].outerHTML.match(/[^<][^ ]*/)[0].toLowerCase();
				// initialize all placeholders in IE8
				if(thisIsIE8 === true && (tagName === 'textarea' || tagName === 'input') && typeof $(this).attr('placeholder') !== 'undefined'){
					// memorize original input color
					$(this).data('formwinOriginalColor', $(this).css('color'));
					showPlaceholder(this, options);
				}
				
				// trigger focus class on labels whenever contained form elements get focus
				$(this).focus(function(){
					// add focus class
					$(elLabel).addClass(options.focusClass);
					
					// placeholders in IE8: remove when it's currently shown
					if(thisIsIE8 === true && typeof $(this).attr('placeholder') !== 'undefined' && $(this).hasClass('formwin-showplaceholder')){
						$(this)
							.val('')
							.css('color', $(this).data('formwinOriginalColor'));
					}
				}).blur(function(){
					// remove focus class
					$(elLabel).removeClass(options.focusClass);
					$(elLabel).removeClass(options.activeClass);
					// placeholders in IE8: show placeholder when value is empty
					if(thisIsIE8 === true && typeof $(this).attr('placeholder') !== 'undefined'){
						if($(this).val() === ''){
							showPlaceholder(this, options);
						} else {
							$(this).removeClass('formwin-showplaceholder');
						}
					}
				}).on('mouseenter', function(){
					$(elLabel).addClass(options.hoverClass);
				}).on('mouseleave', function(){
					$(elLabel).removeClass(options.hoverClass);
					$(elLabel).removeClass(options.activeClass);
				}).on('keydown mousedown touchbegin', function(){
					$(elLabel).addClass(options.activeClass);
				}).on('keyup mouseup touchend', function(){
					$(elLabel).removeClass(options.activeClass);
				});
				
				// set disabled class
				if($(this).is(':disabled') === true){
					$(elLabel).addClass(options.disabledClass);
				} else {
					$(elLabel).removeClass(options.disabledClass);
				}
				
				if(tagName === 'input'){
					// allowed = " color date datetime datetime-local email month number password search tel text time url week ";
					handlerName = $(this).attr("type").toLowerCase();
				} else {
					handlerName = tagName;
				}
				
				// execute the formwinHandler matching this handlerName if there is one
				if(typeof formwinHandlers[handlerName] !== 'undefined'){
					formwinHandlers[handlerName]($(this), options);
				}
			});
		});
	};

	/* 
	 * fixes label positions and input element margins depending on actual label width 
	 */
	$.formwin.fixlabels = function(options){
		options = $.extend({}, $.formwin.defaults, options);
		
		// labels above and below
		$('label' + options.formWinClassSel + '.above, label' + options.formWinClassSel + '.below').each(function(){
			var 
				$elSpan = $('span', this),
				wsVal = $elSpan.css('white-space'),
				labelWidth = 0;
			
			$elSpan.css('white-space', 'nowrap');
			labelWidth = $elSpan.width();
			$elSpan.css('white-space', wsVal);
			
			if(labelWidth > $('textarea, input, select', this).width()){
				$elSpan.parent().css('width', labelWidth + 'px');
			}
		});
		
		// labels to the right and left
		$('label' + options.formWinClassSel + '.left, label' + options.formWinClassSel +'.right').each(function(){
			var 
				$elSpan = $('span', this).css('white-space', 'nowrap'),
				labelWidth = $elSpan.width(),
				propName = 'right';
			
			if($(this).hasClass('left')){
				propName = 'left';
			}
			$(this).css('margin-' + propName, (labelWidth + 10) + 'px');
			$elSpan.css(propName, ((labelWidth + 10) * -1) + 'px');
		});
	};

}(jQuery));

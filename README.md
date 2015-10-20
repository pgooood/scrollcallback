# scrollcallback
ScrollCallback is easy way to watch specific DOM-elements scrolling into and out of view and fires a callback for them.

[Demo page](http://pgood.ru/userfiles/file/scrollcallback/demo/)

```js
$('.first-element').scrollcallback(function(e, direction){
	alert('You have scrolled to a first element');
});
```
```js
$('.second-element').scrollcallback({
	inHandler: function(e, direction){
		alert('You have scrolled to a second element');
	},
	outHandler: function(e, direction){
		alert('You have scrolled from a second element');
	}
});
```
```js
$('.third-element').scrollcallback({
	inHandler: function(e, direction){
		alert('You have scrolled to a third element');
	},
	outHandler: function(e, direction){
		alert('You have scrolled from a third element');
	},
	context: '#context'
});
```

## License

Copyright (c) 2015 Pavel Khoroshkov. Licensed under the [MIT license](https://github.com/pgooood/scrollcallback/blob/master/LICENSE).
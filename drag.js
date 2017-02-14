class drag {
/**
 * 拖拽函数
 * @param  {string} obj  要拖拽的对象
 * @param  {string} father  父容器
 */
	constructor(obj, father) {
		this.box = obj;
		this.father = father || document;
		this.animateobj = {};
		this.animate = this.animateobj.animate == undefined ? true : this.animateobj.animate;
		this.x = this.animateobj.x == undefined ? true : this.animateobj.x;
		this.y = this.animateobj.y == undefined ? true : this.animateobj.y;
		this.ox = 0;
		this.oy = 0;
		this.cx = 0;
		this.cy = 0;
		if (this.father.nodeType == 9) {
			this.cw = document.documentElement.clientWidth;
			this.ch = document.documentElement.clientHeight;
		} else {
			this.cw = this.father.offsetWidth;
			this.ch = this.father.offsetHeight;
		}
		this.oh = box.offsetHeight;
		this.ow = box.offsetWidth;
		this.startx = 0;
		this.starty = 0;
		this.endx = 0;
		this.endy = 0;
		this.lenx = 0;
		this.leny = 0;
	}
	drags() {
		this.down();
	}
	down() {
		var that = this;
		this.box.onmousedown = function(e) {
			var eve = e || window.event;
			if (eve.preventDefault) {
				eve.preventDefault();
			} else {
				eve.returnValue = false;
			};
			that.ox = eve.clientX - that.box.offsetLeft;
			that.oy = eve.clientY - that.box.offsetTop;
			that.startx = that.ox;
			that.starty = that.oy;
			that.move();
			that.up();
		}
	}
	move() {
		var that = this;
		document.onmousemove = function(e) {
			var eve = e || window.event;
			if (eve.preventDefault) {
				eve.preventDefault();
			} else {
				eve.returnValue = false;
			};
			that.cx = eve.clientX;
			that.cy = eve.clientY;
			var x = that.cx - that.ox;
			var y = that.cy - that.oy;
			that.endx = x;
			that.endy = y;
			that.lenx = that.endx - that.startx;
			that.leny = that.endy - that.starty;
			that.startx = that.endx;
			that.starty = that.endy;
			if (x <= 0) {
				x = 0
			};
			if (x >= (that.cw - that.ow)) {
				x = that.cw - that.ow
			};
			if (y <= 0) {
				y = 0
			};
			if (y >= (that.ch - that.oh)) {
				y = that.ch - that.oh
			};
			if (that.x) {
				that.box.style.left = x + "px";
			};
			if (that.y) {
				that.box.style.top = y + "px";
			};
		}
	}
	up() {
		var that = this;
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
			var xishu = 0.9;
			if (that.animate) {
				var t = setInterval(function() {
					that.lenx *= xishu;
					that.leny *= xishu;
					var x = that.lenx + that.box.offsetLeft;
					var y = that.leny + that.box.offsetTop;
					if (x <= 0) {
						x = 0
					};
					if (x >= (that.cw - that.ow)) {
						x = that.cw - that.ow
					};
					if (y <= 0) {
						y = 0
					};
					if (y >= (that.ch - that.oh)) {
						y = that.ch - that.oh
					};
					if (Math.abs(that.lenx) > Math.abs(that.leny)) {
						if (Math.abs(that.lenx) < 1) {
							clearInterval(t);
						}
					} else {
						if (Math.abs(that.leny) < 1) {
							clearInterval(t);
						}
					}
					box.style.left = x + "px";
					box.style.top = y + "px";
				}, 20)
			}
		}
	}
}